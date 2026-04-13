import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export async function getPlans(_req: Request, res: Response) {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .order('sort_order');

  if (error) {
    res.status(500).json({ success: false, error: error.message });
    return;
  }

  const plans = (data || []).map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    price: p.price_display,
    period: p.period,
    billing: p.billing,
    features: p.features || [],
    highlighted: p.highlighted,
    programSlug: p.program_slug,
  }));

  res.json({ success: true, data: plans });
}
