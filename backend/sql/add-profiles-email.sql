-- Run once on existing databases that already have `profiles` without `email`.
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email text;
