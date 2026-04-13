import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase credentials not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
}

if (!supabaseAnonKey) {
  console.warn('SUPABASE_ANON_KEY is not set — email/OAuth sign-in routes will fail until it is configured.');
}

/** Service role: database reads/writes (bypasses RLS). */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Anon key: password/OAuth/refresh on the server (Auth API).
 * Do not use for privileged table access — use `supabase` (service role) for that.
 */
export const supabaseAuth: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey || supabaseServiceKey
);
