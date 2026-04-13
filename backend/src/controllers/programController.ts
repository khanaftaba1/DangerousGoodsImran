import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export async function getPrograms(_req: Request, res: Response) {
  const { data: programs, error } = await supabase
    .from('programs')
    .select('id, slug, title, description, price_label, original_price, button_label, badge, hero_image, sort_order')
    .order('sort_order');

  if (error) {
    res.status(500).json({ success: false, error: error.message });
    return;
  }

  const programIds = (programs || []).map((p) => p.id);

  const { data: pcRows } = await supabase
    .from('program_courses')
    .select('program_id, course_id, sort_order, courses(slug, title, thumbnail)')
    .in('program_id', programIds)
    .order('sort_order');

  const coursesByProgram: Record<string, { slug: string; title: string; thumbnail: string }[]> = {};
  for (const row of pcRows || []) {
    const pid = row.program_id;
    if (!coursesByProgram[pid]) coursesByProgram[pid] = [];
    const c = row.courses as unknown as { slug: string; title: string; thumbnail: string };
    if (c) coursesByProgram[pid].push({ slug: c.slug, title: c.title, thumbnail: c.thumbnail });
  }

  const result = (programs || []).map((p) => {
    const courses = coursesByProgram[p.id] || [];
    return {
      slug: p.slug,
      title: p.title,
      description: p.description,
      heroImage: p.hero_image,
      courseCount: courses.length,
      price: p.price_label,
      originalPrice: p.original_price,
      buttonLabel: p.button_label,
      badge: p.badge,
      courses,
    };
  });

  res.json({ success: true, data: result });
}

export async function getProgramBySlug(req: Request, res: Response) {
  const { slug } = req.params;

  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    res.status(404).json({ success: false, error: 'Program not found' });
    return;
  }

  const { data: pcRows } = await supabase
    .from('program_courses')
    .select('course_id, sort_order, courses(slug, title, thumbnail)')
    .eq('program_id', data.id)
    .order('sort_order');

  const courses = (pcRows || []).map((row) => {
    const c = row.courses as unknown as { slug: string; title: string; thumbnail: string };
    return { slug: c.slug, title: c.title, thumbnail: c.thumbnail };
  });

  const program = {
    slug: data.slug,
    title: data.title,
    pageTitle: data.page_title,
    description: data.description,
    extendedDescription: data.extended_description,
    price: data.price_label,
    priceNumeric: data.price,
    originalPrice: data.original_price,
    period: data.period,
    buttonLabel: data.button_label,
    badge: data.badge,
    heroImage: data.hero_image,
    useCases: data.use_cases || [],
    faq: data.faq || [],
    courses,
  };

  res.json({ success: true, data: program });
}
