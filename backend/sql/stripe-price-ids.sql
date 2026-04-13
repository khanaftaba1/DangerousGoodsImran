-- ============================================================
-- Run AFTER creating products in Stripe Dashboard (Test Mode)
-- Replace the price_xxx placeholders with actual Stripe price IDs
-- ============================================================

-- Courses (one-time prices)
UPDATE courses SET stripe_price_id = 'price_REPLACE_lithium_battery'        WHERE slug = 'lithium-battery';
UPDATE courses SET stripe_price_id = 'price_REPLACE_dry_ice'                WHERE slug = 'dry-ice-air-transport-iata';
UPDATE courses SET stripe_price_id = 'price_REPLACE_biologicals'            WHERE slug = 'biologicals';
UPDATE courses SET stripe_price_id = 'price_REPLACE_hidden_dg'              WHERE slug = 'understanding-dangerous-goods';
UPDATE courses SET stripe_price_id = 'price_REPLACE_overpack'               WHERE slug = 'understanding-overpack';
UPDATE courses SET stripe_price_id = 'price_REPLACE_basics'                 WHERE slug = 'understanding-the-basics-of-dangerous-goods';
UPDATE courses SET stripe_price_id = 'price_REPLACE_excepted_qty'           WHERE slug = 'shipping-excepted-quantities';
UPDATE courses SET stripe_price_id = 'price_REPLACE_identification'         WHERE slug = 'identification';
-- lithium-battery-tool is free, no Stripe product needed

-- Programs (one-time bundle price)
UPDATE programs SET stripe_price_id = 'price_REPLACE_bio_dryice_bundle'     WHERE slug = 'biologicals-dry-ice';
-- Subscription programs don't need their own stripe_price_id; the plans table holds that

-- Plans (recurring monthly prices)
UPDATE plans SET stripe_price_id = 'price_REPLACE_essentials_monthly'       WHERE slug = 'essentials';
UPDATE plans SET stripe_price_id = 'price_REPLACE_premium_monthly'          WHERE slug = 'premium';
