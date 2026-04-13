import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export async function getCourses(_req: Request, res: Response) {
  const { data, error } = await supabase
    .from('courses')
    .select('slug, title, description, thumbnail, price, price_display, level, sort_order')
    .eq('published', true)
    .order('sort_order');

  if (error) {
    res.status(500).json({ success: false, error: error.message });
    return;
  }

  const courses = (data || []).map((c) => ({
    slug: c.slug,
    title: c.title,
    description: c.description,
    thumbnail: c.thumbnail,
    price: c.price_display,
    level: c.level,
    badge: c.price === 0 ? 'Free' : null,
  }));

  res.json({ success: true, data: courses });
}

export async function getCourseBySlug(req: Request, res: Response) {
  const { slug } = req.params;

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) {
    res.status(404).json({ success: false, error: 'Course not found' });
    return;
  }

  const course = {
    slug: data.slug,
    title: data.title,
    pageTitle: data.page_title,
    subtitle: data.subtitle,
    description: data.description,
    thumbnail: data.thumbnail,
    price: data.price_display,
    priceNumeric: data.price,
    priceVat: data.price_vat,
    netPrice: data.net_price,
    level: data.level,
    studyTime: data.study_time,
    exams: data.exams,
    author: data.author,
    certificate: data.certificate,
    overview: data.overview,
    certNote: data.cert_note,
    layout: data.layout,
    faq: data.faq || [],
    objectives: data.objectives || [],
    contentBullets: data.content_bullets || null,
  };

  res.json({ success: true, data: course });
}
