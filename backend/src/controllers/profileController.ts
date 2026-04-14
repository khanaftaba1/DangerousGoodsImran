import { Response } from 'express';
import { supabase } from '../config/supabase';
import type { AuthRequest } from '../middleware/authMiddleware';

/** Partial updates: accept JSON keys matching DB columns (snake_case). */
export async function getProfile(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user!.id;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    res.status(500).json({ success: false, error: error.message });
    return;
  }

  res.json({ success: true, data: data ?? null });
}

export async function updateProfile(req: AuthRequest, res: Response): Promise<void> {
  const userId = req.user!.id;
  const body = req.body as Record<string, unknown>;

  const allowed = new Set([
    'full_name',
    'avatar_url',
    'phone',
    'address',
    'country',
    'birthday',
    'company_name',
    'company_size',
    'profession',
    'website',
    'university',
    'graduation_year',
    'marketing_opt_in',
  ]);

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      updates[key] = body[key];
    }
  }

  if (Object.keys(updates).length === 1) {
    res.status(400).json({ success: false, error: 'No valid fields to update' });
    return;
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    res.status(500).json({ success: false, error: error.message });
    return;
  }

  res.json({ success: true, data });
}
