-- ============================================================
-- DangerousGoods.online Clone — Schema + Seed Data
-- Run this in Supabase SQL Editor (single execution)
-- ============================================================

-- Drop existing tables (safe for re-runs)
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS program_courses CASCADE;
DROP TABLE IF EXISTS plans CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS courses CASCADE;

-- ============================================================
-- 1. COURSES
-- ============================================================
CREATE TABLE courses (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  title         text NOT NULL,
  page_title    text NOT NULL,
  subtitle      text NOT NULL,
  description   text NOT NULL,
  thumbnail     text NOT NULL,
  price         numeric NOT NULL DEFAULT 0,
  price_display text NOT NULL DEFAULT 'Free',
  price_vat     text NOT NULL DEFAULT 'Free',
  net_price     text NOT NULL DEFAULT 'Free',
  currency      text NOT NULL DEFAULT 'EUR',
  stripe_price_id text,
  level         text NOT NULL DEFAULT 'Introductory',
  study_time    text NOT NULL,
  exams         text NOT NULL,
  author        text NOT NULL,
  certificate   text NOT NULL DEFAULT 'No',
  overview      text NOT NULL,
  cert_note     text NOT NULL DEFAULT '',
  layout        text NOT NULL DEFAULT 'sidebar' CHECK (layout IN ('sidebar', 'meta_bar')),
  faq           jsonb NOT NULL DEFAULT '[]',
  objectives    text[] NOT NULL DEFAULT '{}',
  content_bullets text[],
  sort_order    int NOT NULL DEFAULT 0,
  published     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. PROGRAMS
-- ============================================================
CREATE TABLE programs (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                  text UNIQUE NOT NULL,
  title                 text NOT NULL,
  page_title            text NOT NULL,
  description           text NOT NULL,
  extended_description  text,
  price                 numeric NOT NULL,
  price_label           text NOT NULL,
  original_price        text,
  period                text,
  button_label          text NOT NULL DEFAULT 'Enroll',
  badge                 text,
  hero_image            text NOT NULL,
  stripe_price_id       text,
  use_cases             text[] NOT NULL DEFAULT '{}',
  faq                   jsonb NOT NULL DEFAULT '[]',
  sort_order            int NOT NULL DEFAULT 0,
  created_at            timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. PROGRAM_COURSES (join table)
-- ============================================================
CREATE TABLE program_courses (
  program_id  uuid NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  course_id   uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  sort_order  int NOT NULL DEFAULT 0,
  PRIMARY KEY (program_id, course_id)
);

-- ============================================================
-- 4. PLANS
-- ============================================================
CREATE TABLE plans (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  name            text NOT NULL,
  tagline         text NOT NULL,
  price           numeric NOT NULL,
  price_display   text NOT NULL,
  currency        text NOT NULL DEFAULT 'EUR',
  period          text NOT NULL DEFAULT 'month',
  billing         text NOT NULL DEFAULT 'Billed monthly',
  stripe_price_id text,
  program_slug    text REFERENCES programs(slug),
  features        text[] NOT NULL DEFAULT '{}',
  highlighted     boolean NOT NULL DEFAULT false,
  sort_order      int NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 5. PROFILES
-- ============================================================
CREATE TABLE profiles (
  id                  uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email               text,
  full_name           text,
  avatar_url          text,
  phone               text,
  address             text,
  country             text,
  birthday            date,
  company_name        text,
  company_size        text,
  profession          text,
  website             text,
  university          text,
  graduation_year     text,
  marketing_opt_in    boolean NOT NULL DEFAULT false,
  stripe_customer_id  text,
  subscription_plan   text,
  subscription_status text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 6. ENROLLMENTS
-- ============================================================
CREATE TABLE enrollments (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id         uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  stripe_session_id text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);

-- ============================================================
-- 7. CONTACT_MESSAGES
-- ============================================================
CREATE TABLE contact_messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name  text NOT NULL,
  last_name   text NOT NULL,
  email       text NOT NULL,
  message     text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- Enable Row Level Security (service_role key bypasses RLS)
-- ============================================================
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- SEED: COURSES (9 courses)
-- ============================================================
INSERT INTO courses (slug, title, page_title, subtitle, description, thumbnail, price, price_display, price_vat, net_price, level, study_time, exams, author, certificate, overview, cert_note, layout, faq, objectives, content_bullets, sort_order) VALUES

-- 1. Lithium Battery
(
  'lithium-battery',
  'Shipping Lithium Batteries by Air',
  'Shipping Lithium Batteries by Air | IATA DGR Training (Section II)',
  'Learn how to ship lithium batteries safely by air in under 2 hours.',
  'This course is designed for shippers of Section II lithium batteries and other professionals involved in air transport who require a clear understanding of the IATA Dangerous Goods Regulations applicable to lithium batteries. The training provides practical regulatory knowledge on the classification of lithium batteries, associated hazards, and key requirements for packaging, marking, labelling, and documentation under the IATA DGR.',
  '/images/courses/lithium-battery.jpg',
  65.00, '€65', '€65 (VAT included)', '€53.72 (excl. VAT)',
  'Introductory', '2 hours', 'Assessment test', 'Veerle Melis', 'Yes',
  'This course is designed for shippers of Section II lithium batteries and other professionals involved in air transport who require a clear understanding of the IATA Dangerous Goods Regulations applicable to lithium batteries. The training provides practical regulatory knowledge on the classification of lithium batteries, associated hazards, and key requirements for packaging, marking, labelling, and documentation under the IATA DGR. The course focuses on regulatory awareness and understanding. It is a knowledge-based training and does not replace employer-specific instructions or compliance responsibilities.',
  'Upon successfully completing the final assessment test, you will receive a certificate that is valid for two years.',
  'sidebar',
  '[{"question":"How are lithium batteries classified for air transport?","answer":"Lithium batteries are classified as Class 9 dangerous goods. Depending on the type (lithium ion or lithium metal) and watt-hour rating or lithium content, specific packing and labeling requirements apply."},{"question":"Do I need training to ship lithium batteries by air?","answer":"According to the IATA Dangerous Goods Regulations, anyone involved in preparing lithium battery shipments must receive appropriate training or instruction. For fully regulated shipments, formal training is required. For Section II lithium batteries, adequate instructions must be provided by the employer."},{"question":"What happens if I ship lithium batteries incorrectly?","answer":"Improper shipping may result in penalties, shipment delays, or safety risks such as fire or thermal runaway. A clear understanding of regulatory requirements helps reduce the risk of errors."},{"question":"Is this course a compliance or advisory service?","answer":"No. This course provides regulatory knowledge and awareness only. It does not replace employer-specific instructions, procedures, or compliance responsibilities."}]'::jsonb,
  ARRAY['Understand the provisions for shipping lithium batteries and their associated hazards','Understand the classification and identification of lithium batteries','Understand hazard communication','Recognise the marking and labelling requirements','Identify the required documentation','Demonstrate knowledge of the IATA Dangerous Goods Regulations applicable to lithium batteries and their relevance to handling and transport'],
  NULL, 1
),

-- 2. Dry Ice
(
  'dry-ice-air-transport-iata',
  'Shipping Dry Ice (UN 1845) by Air',
  'Shipping Dry Ice (UN 1845) by Air | IATA Compliance Training',
  'Learn how to prepare, package and declare dry ice (UN 1845) in compliance with IATA Dangerous Goods Regulations for air transport.',
  'This short online course provides practical regulatory knowledge for safely shipping dry ice by air in compliance with current IATA requirements.',
  '/images/courses/dry-ice-air-transport-iata.jpg',
  47.50, '€47', '€47.50 (VAT included)', '€39.26 (excl. VAT)',
  'Introductory', '1 hour', 'Assessment test', 'Veerle Melis', 'Yes',
  'This online dry ice training explains how to classify, pack, mark, label, and document UN 1845 shipments for air transport under IATA regulations. The course focuses on understanding the specific hazards of dry ice and the applicable air transport requirements for its preparation, handling, and shipment. Participants gain the essential knowledge needed to correctly package, mark, label, document, and handle dry ice shipments in accordance with applicable IATA and ICAO air transport requirements.',
  'Upon successfully completing the final assessment test, you will receive a certificate that is valid for two years.',
  'sidebar',
  '[{"question":"What is dry ice?","answer":"Dry ice is the solid form of carbon dioxide (CO₂). It doesn''t melt into liquid but turns straight into gas, which makes it great for keeping shipments cold."},{"question":"Why is dry ice considered dangerous goods?","answer":"Dry ice (UN 1845) is classified as dangerous goods for air transport because it releases carbon dioxide gas, which can cause pressure build-up in packaging. It must be properly packed, marked, and documented according to IATA Dangerous Goods Regulations."},{"question":"Do I need training to ship dry ice?","answer":"Yes. Personnel preparing or handling dry ice (UN 1845) shipments by air must receive adequate training according to IATA Dangerous Goods Regulations."},{"question":"Are there any risks when handling dry ice?","answer":"Incorrect handling of dry ice can cause frostbite, pressure build-up, or carbon dioxide exposure in confined spaces. Proper training ensures safe and compliant air transport."}]'::jsonb,
  ARRAY['Understand the properties and common applications of carbon dioxide, solid (dry ice)','Identify the hazards associated with dry ice and the required personal protective equipment (PPE)','Apply the correct packing requirements for shipping dry ice','Understand the marking and labelling requirements for dry ice shipments','Understand the transport document requirements for road transport of dry ice','Apply essential safety measures for the safe handling and transport of dry ice'],
  NULL, 2
),

-- 3. Biologicals
(
  'biologicals',
  'Shipping Infectious Substances (IATA DGR)',
  'Shipping Infectious Substances (IATA DGR) | Online Training',
  'Learn how to prepare and ship infectious and biological substances safely and compliantly in under 2 hours.',
  'This training is for staff preparing shipments of biological substances, including Category B, exempt patient specimens, GMOs, GMMOs. You''ll learn how to classify and pack them correctly for air transport.',
  '/images/courses/biologicals.jpg',
  65.00, '€65', '€65 (VAT included)', '€53.72 (excl. VAT)',
  'Introductory', '2 hours', 'Assessment test', 'Veerle Melis', 'Yes',
  'This training is for staff preparing shipments of biological substances, including Category B, exempt patient specimens, GMOs, GMMOs. You''ll learn how to classify and pack them correctly for air transport.',
  'Upon successfully completing the final assessment test, you will receive a certificate that is valid for two years.',
  'sidebar',
  '[{"question":"What are infectious substances?","answer":"Infectious substances are materials known or reasonably expected to contain pathogens, microorganisms such as bacteria, viruses, or parasites, that can cause disease in humans or animals. They are classified under UN numbers and divided into Category A (high risk) and Category B (lower risk)."},{"question":"Do I need training to ship Category B biological substances?","answer":"Yes. While the IATA Dangerous Goods Regulations allow for simplified requirements under Packing Instruction 650, anyone preparing or offering Category B shipments must understand how to classify, pack, mark, and document them correctly."},{"question":"What is Packing Instruction 650?","answer":"Packing Instruction 650 outlines the specific packaging requirements for Category B infectious substances (UN 3373). It ensures that the substances are packed in triple-layer packaging, properly marked, and able to withstand normal transport conditions without leaking."}]'::jsonb,
  ARRAY['Understand the Dangerous Goods provisions for shipping biological materials','Classify biological and related material','Assess DG packing options and quantity limitations','Apply DG packing requirements','Apply DG marks and labels','Comply with the applicable DG documentation requirements'],
  NULL, 3
),

-- 4. Hidden Dangerous Goods
(
  'understanding-dangerous-goods',
  'Hidden Dangerous Goods Awareness Training',
  'Hidden Dangerous Goods Awareness Training | IATA Air Transport',
  'Everyday items like batteries, perfumes, hand sanitizers and cleaning products can be hidden dangerous goods. This short 30-minute course teaches you how to quickly recognize them.',
  'Ideal for e-commerce sellers, warehouse staff and logistics teams.',
  '/images/courses/understanding-dangerous-goods.jpg',
  25.00, '€25', '€25 (VAT included)', '€20.66 (excl. VAT)',
  'Introductory', '30 minutes', 'No', 'Veerle Melis', 'Yes',
  'Everyday items like batteries, perfumes, hand sanitizers and cleaning products can be hidden dangerous goods. This short 30-minute course teaches you how to quickly recognize them, understand the basic risks, and ship safely by air. Ideal for e-commerce sellers, warehouse staff and logistics teams.',
  'You will receive a certificate after completing the course.',
  'meta_bar',
  '[{"question":"What are \"Hidden\" Dangerous Goods?","answer":"Hidden dangerous goods are items that contain undeclared dangerous goods, such as lithium batteries in electronics or flammable aerosols in cosmetics, that may be offered for air transport without proper hazard communication or documentation."},{"question":"Why do I need DG training if I don''t ship dangerous goods?","answer":"Because many companies unknowingly ship regulated materials. IATA requires shippers to be aware of how to recognize and declare these items properly."}]'::jsonb,
  ARRAY[]::text[],
  ARRAY['Recognize hidden dangerous goods in everyday shipments','Understand the 9 hazard classes','Read and interpret CLP danger symbols','Know what UN numbers and shipping names mean','Find key safety information in documents','Apply basic safe shipping rules for air transport'],
  4
),

-- 5. Overpack
(
  'understanding-overpack',
  'Understanding Overpack Requirements for Air Transport',
  'Overpack Requirements for Air Transport | DG-online',
  'Learn how to prepare, mark, and document overpacks correctly under IATA regulations in under 1 hour.',
  'Requirements for overpacking dangerous goods shipments.',
  '/images/courses/understanding-overpack.jpg',
  25.00, '€25', '€25 (VAT included)', '€20.66 (excl. VAT)',
  'Introductory', '0.5 hour', 'Assessment test', 'Veerle Melis', 'Yes',
  'This course provides a clear understanding of overpack requirements for the air transport of dangerous goods in accordance with the IATA Dangerous Goods Regulations. Participants will learn what an overpack is, when it is used, and the applicable marking and labelling requirements. The course focuses on regulatory awareness and correct terminology related to overpacks in air transport. This training is suitable for shippers and other professionals involved in the preparation of dangerous goods shipments who require specific knowledge of overpack requirements.',
  'You will receive a certificate after completing the course.',
  'sidebar',
  '[{"question":"What is an overpack?","answer":"An overpack is an enclosure used by a single shipper to contain one or more packages. It''s used for easier handling or to consolidate multiple packages into one unit. Common examples include shrink-wrapped pallets or boxes containing smaller packages."},{"question":"Do overpacks need to be marked and labeled?","answer":"Yes. Overpacks must display all markings and labels of the packages inside, unless these are clearly visible from the outside. In addition, the word \"OVERPACK\" must be clearly marked if required."},{"question":"Are airlines allowed to break down an overpack?","answer":"No. Overpacks must remain sealed and intact. Airlines are not permitted to dismantle or open an overpack."}]'::jsonb,
  ARRAY['Understand what an overpack is under the IATA Dangerous Goods Regulations','Recognise the regulatory requirements applicable to overpacks','Identify the marking and labelling requirements for overpacks','Understand how overpacks are declared on air transport documentation'],
  NULL, 5
),

-- 6. Basics
(
  'understanding-the-basics-of-dangerous-goods',
  'Dangerous Goods Basics for Air Transport',
  'Dangerous Goods Basics for Air Transport | IATA Training',
  'Learn the basics of the IATA Dangerous Goods Regulations in under 2 hours.',
  'Comprehensive introductory IATA DGR training.',
  '/images/courses/understanding-the-basics-of-dangerous-goods.jpg',
  72.00, '€72', '€72 (VAT included)', '€59.50 (excl. VAT)',
  'Introductory', '2 hours', 'Assessment test', 'Veerle Melis', 'Yes',
  'This introductory course is designed for shippers and other professionals involved in air transport who require a foundational understanding of dangerous goods. The training provides an overview of what dangerous goods are, how they are classified, and the general structure and application of the IATA Dangerous Goods Regulations. It focuses on regulatory awareness and understanding at an entry level. The course is suitable for logistics professionals, shipping and warehouse teams, and anyone involved in air cargo operations who needs basic dangerous goods knowledge.',
  'Upon successfully completing the final assessment test, you will receive a certificate that is valid for two years.',
  'sidebar',
  '[{"question":"What are \"Dangerous Goods\"?","answer":"Dangerous goods are items or substances that pose a risk to health, safety, property, or the environment when transported. Examples include lithium batteries, aerosols, flammable liquids, and chemicals."},{"question":"How long is the course and is there a test?","answer":"The course takes about 2 hours and includes an assessment test. You''ll receive a certificate upon completion."},{"question":"What''s the difference between this course and the \"Hidden Dangerous Goods\" training?","answer":"This course explains the full basics of DG, including classes, documentation, and safety. The \"Hidden DG\" course is focused on non-DG shippers and recognizing items that might be dangerous without realizing it."}]'::jsonb,
  ARRAY['Understand what dangerous goods are and why they are regulated in air transport','Recognise the general limitations applicable to dangerous goods by air','Identify dangerous goods using the IATA Dangerous Goods Regulations','Understand the basic principles of hazard classification','Understand hazard communication, including marking, labelling, and documentation','Recognise the purpose of emergency response information related to dangerous goods'],
  NULL, 6
),

-- 7. Excepted Quantities
(
  'shipping-excepted-quantities',
  'Shipping Excepted Quantities (IATA)',
  'IATA Excepted Quantities Training | Online DG Course',
  'Learn how to prepare Small and Excepted Quantities safely and compliantly under IATA regulations in under 1 hour.',
  'Online DG course for excepted quantity shipments.',
  '/images/courses/shipping-excepted-quantities.jpg',
  47.50, '€47', '€47.50 (VAT included)', '€39.26 (excl. VAT)',
  'Introductory', '1 hour', 'Assessment test', 'Veerle Melis', 'Yes',
  'In this online training, you will learn how to safely and effectively prepare and ship Excepted Quantities (EQ) under IATA regulations. By the end of this training, you''ll have the skills and knowledge necessary to confidently pack, mark, and document EQ shipments in full compliance.',
  'Upon successfully completing the final assessment test, you will receive a certificate that is valid for two years.',
  'sidebar',
  '[{"question":"What are excepted quantities?","answer":"Excepted Quantities are small amounts of dangerous goods that can be shipped under simplified packaging, labeling, and documentation rules, but they are still regulated and must be handled correctly."},{"question":"Do I need training to ship excepted quantities?","answer":"Yes, you do. Even small shipments are regulated. This training shows you step by step how to pack, mark, and document everything correctly."},{"question":"Is it cheaper to ship Excepted Quantities?","answer":"Yes, it usually is. No dangerous goods acceptance check is required, so there are no additional charges from the carrier."}]'::jsonb,
  ARRAY['Criteria for Excepted and De Minimis Quantities','Understand the packing requirements','Understand the marking and labelling requirements','Understand the transport documents requirements','Limitations and exclusions'],
  NULL, 7
),

-- 8. Identification
(
  'identification',
  'Understanding Dangerous Goods Identification',
  'Understanding Dangerous Goods Identification | IATA DGR Training',
  'Learn how to identify dangerous goods by selecting the correct UN or ID number and Proper Shipping Name.',
  'IATA DGR training on DG identification fundamentals.',
  '/images/courses/identification.jpg',
  30.00, '€30', '€30 (VAT included)', '€24.79 (excl. VAT)',
  'Introductory', '1 hour', 'Assessment test', 'Veerle Melis', 'Yes',
  'Learn how to correctly identify dangerous goods for air transport by selecting the appropriate UN or ID number and Proper Shipping Name from the List of Dangerous Goods. This focused online module explains the key columns of the IATA Dangerous Goods List and how they are used to determine classification, packing, marking and documentation requirements. The training is designed for professionals involved in shipping, handling or preparing dangerous goods who need a clear and practical understanding of identification in accordance with the IATA Dangerous Goods Regulations.',
  'Upon successfully completing the final assessment test, you will receive a certificate that is valid for two years.',
  'sidebar',
  '[{"question":"What is Identification?","answer":"Identification is the process of selecting the correct UN or ID number and Proper Shipping Name for a dangerous goods shipment in air transport."},{"question":"What is a UN number?","answer":"A UN number is a four-digit number assigned to dangerous goods to identify a substance or article during transport worldwide."},{"question":"Why is correct Identification important?","answer":"Correct identification is the first safety level when shipping dangerous goods. It ensures the correct packaging, marks, labels, and documentation requirements are applied."}]'::jsonb,
  ARRAY['Collecting the information needed for identification','Finding the correct UN or ID number and the Proper Shipping Name','Understanding the key columns in the List of Dangerous Goods','Selecting the correct entry for your shipment'],
  NULL, 8
),

-- 9. Free Lithium Battery Tool
(
  'lithium-battery-tool',
  'Free Lithium Battery Classification Tool',
  'Free Lithium Battery Classification Tool – IATA Compliant',
  'Use this free tool to determine the classification of your lithium battery shipment under IATA regulations.',
  'IATA-compliant lithium battery classification helper.',
  '/images/courses/lithium-battery-tool.jpg',
  0, 'Free', 'Free', 'Free',
  'Introductory', '15 minutes', 'No', 'Veerle Melis', 'No',
  'This free classification tool helps you determine whether your lithium battery shipment falls under Section I, Section II, or is fully exempt under IATA Dangerous Goods Regulations. Answer a series of guided questions to get the right classification for your battery type.',
  '',
  'sidebar',
  '[]'::jsonb,
  ARRAY[]::text[],
  NULL, 9
);

-- ============================================================
-- SEED: PROGRAMS (3 programs)
-- ============================================================
INSERT INTO programs (slug, title, page_title, description, extended_description, price, price_label, original_price, period, button_label, badge, hero_image, use_cases, faq, sort_order) VALUES

-- 1. Biologicals + Dry Ice bundle
(
  'biologicals-dry-ice',
  'Biologicals - Dry Ice',
  'Biologicals - Dry Ice Bundle',
  'Bundle offer – Biologicals and Dry Ice by air transport. Get both courses at a reduced price.',
  NULL,
  101.25, '€101.25', '€112.50', NULL, 'Enroll', 'special offer',
  '/images/programs/biologicals-dry-ice.jpg',
  ARRAY[
    'Shipping infectious substances (Category A and B) and biologicals by air',
    'Shipping dry ice (UN 1845) as a refrigerant or standalone cargo by air',
    'Understanding IATA DGR packing, marking and documentation requirements for both shipment types',
    'Professionals who handle both biologicals and dry ice shipments and want a combined training package'
  ],
  '[{"question":"What is included in this bundle?","answer":"This bundle includes two complete online training courses: Shipping Infectious Substances and Biologicals by Air Transport, and Shipping Dry Ice (UN 1845) by Air. Both courses are based on the IATA Dangerous Goods Regulations."},{"question":"How much do I save with the bundle?","answer":"The bundle is offered at €101.25 instead of €112.50 when purchasing both courses individually, saving you €11.25."},{"question":"How long do I have access?","answer":"Once enrolled, you have access to both courses for the standard access period as defined at the time of purchase."}]'::jsonb,
  1
),

-- 2. DG Essentials subscription
(
  'dg-essentials-subscription',
  'DG Essentials',
  'DG Essentials Subscription',
  'DG Essentials helps shippers and DG professionals stay compliant in daily operations.',
  'You get practical understanding-level Dangerous Goods training plus direct access to expert advisory support, so you can interpret IATA and ICAO requirements correctly and with confidence.',
  75.00, '€75/month', NULL, 'month', 'Subscribe', NULL,
  '/images/programs/dg-essentials.png',
  ARRAY[
    'Verifying whether a shipment is correctly classified, packed and documented',
    'Interpreting IATA DGR requirements for day-to-day shipping decisions',
    'Clarifying regulatory questions before tendering or booking air cargo',
    'Supporting internal discussions with operations, QA or management'
  ],
  '[{"question":"What is included in the DG Essentials subscription?","answer":"DG Essentials includes access to selected understanding-level Dangerous Goods training, unlimited email-based advisory support with a defined response time, and one scheduled 1-to-1 online advisory session per quarter."},{"question":"What level of training is included in DG Essentials?","answer":"DG Essentials provides understanding-level Dangerous Goods training focused on correct interpretation of IATA Dangerous Goods Regulations and ICAO Technical Instructions for air transport operations."},{"question":"How does the advisory support work?","answer":"Subscribers can submit DG-related questions by email and receive expert guidance within the defined response time, supporting correct regulatory interpretation in daily operations."},{"question":"How often can I schedule a 1-to-1 session?","answer":"DG Essentials includes one scheduled 1-to-1 online advisory session per quarter, conducted via Teams, Zoom, or a comparable platform."}]'::jsonb,
  2
),

-- 3. DG Premium subscription
(
  'dg-premium-subscription',
  'DG Premium',
  'DG Premium Subscription',
  'DG Premium provides full access to all Dangerous Goods training, including advanced and role-specific courses, combined with priority expert advisory support.',
  'Training is aligned with applicable IATA Dangerous Goods Regulations and ICAO Technical Instructions for air transport. Subscribers receive unlimited priority email-based expert guidance and regular 1-to-1 advisory sessions, supporting DG responsible persons and management in interpreting and applying complex regulatory requirements within their operational environment.',
  149.00, '€149/month', NULL, 'month', 'Subscribe', NULL,
  '/images/programs/dg-premium.jpg',
  ARRAY[
    'Supporting internal DG responsible persons with regulatory interpretation questions',
    'Discussing non-routine or complex DG cases during scheduled monthly 1-to-1 advisory sessions',
    'Clarifying IATA and ICAO requirements to support internal decision-making',
    'Providing expert input to operational or compliance discussions without assuming responsibility',
    'Assisting professionals who require faster access to DG expertise'
  ],
  '[{"question":"What is included in the DG Premium subscription?","answer":"DG Premium includes full access to all Dangerous Goods training courses, unlimited priority email-based advisory support with faster response times, and one scheduled 1-to-1 online advisory session per month."},{"question":"How does DG Premium differ from DG Essentials?","answer":"DG Premium includes full access to all Dangerous Goods training courses, unlimited priority email-based advisory support with faster response times, and one scheduled 1-to-1 online advisory session per month. Essentials includes selected courses and quarterly 1-to-1 sessions."},{"question":"What level of training is included in DG Premium?","answer":"DG Premium includes understanding, advanced, and role-specific Dangerous Goods training aligned with IATA and ICAO requirements for air transport."},{"question":"Can DG Premium replace an internal DG responsible person?","answer":"No. DG Premium provides advisory support and expert input but does not replace or assume the role or legal responsibility of an internal DG responsible person."},{"question":"Can I cancel my subscription at any time?","answer":"Yes. The subscription can be cancelled at any time, with access remaining active until the end of the current billing period."}]'::jsonb,
  3
);

-- ============================================================
-- SEED: PROGRAM_COURSES (link courses to programs)
-- ============================================================
INSERT INTO program_courses (program_id, course_id, sort_order) VALUES
  ((SELECT id FROM programs WHERE slug = 'biologicals-dry-ice'), (SELECT id FROM courses WHERE slug = 'biologicals'), 1),
  ((SELECT id FROM programs WHERE slug = 'biologicals-dry-ice'), (SELECT id FROM courses WHERE slug = 'dry-ice-air-transport-iata'), 2),
  ((SELECT id FROM programs WHERE slug = 'dg-essentials-subscription'), (SELECT id FROM courses WHERE slug = 'understanding-the-basics-of-dangerous-goods'), 1),
  ((SELECT id FROM programs WHERE slug = 'dg-essentials-subscription'), (SELECT id FROM courses WHERE slug = 'understanding-overpack'), 2),
  ((SELECT id FROM programs WHERE slug = 'dg-essentials-subscription'), (SELECT id FROM courses WHERE slug = 'identification'), 3),
  ((SELECT id FROM programs WHERE slug = 'dg-premium-subscription'), (SELECT id FROM courses WHERE slug = 'identification'), 1),
  ((SELECT id FROM programs WHERE slug = 'dg-premium-subscription'), (SELECT id FROM courses WHERE slug = 'lithium-battery'), 2),
  ((SELECT id FROM programs WHERE slug = 'dg-premium-subscription'), (SELECT id FROM courses WHERE slug = 'shipping-excepted-quantities'), 3),
  ((SELECT id FROM programs WHERE slug = 'dg-premium-subscription'), (SELECT id FROM courses WHERE slug = 'understanding-the-basics-of-dangerous-goods'), 4),
  ((SELECT id FROM programs WHERE slug = 'dg-premium-subscription'), (SELECT id FROM courses WHERE slug = 'understanding-overpack'), 5),
  ((SELECT id FROM programs WHERE slug = 'dg-premium-subscription'), (SELECT id FROM courses WHERE slug = 'biologicals'), 6),
  ((SELECT id FROM programs WHERE slug = 'dg-premium-subscription'), (SELECT id FROM courses WHERE slug = 'dry-ice-air-transport-iata'), 7);

-- ============================================================
-- SEED: PLANS (2 subscription plans)
-- ============================================================
INSERT INTO plans (slug, name, tagline, price, price_display, period, billing, program_slug, features, highlighted, sort_order) VALUES
(
  'essentials',
  'Essentials',
  'Core dangerous goods training with expert knowledge support',
  75.00, '€75', 'month', 'Billed monthly',
  'dg-essentials-subscription',
  ARRAY[
    'Unlimited email-based expert knowledge support (defined response time)',
    'One 1:1 expert knowledge session per quarter',
    'Access to selected dangerous goods training courses',
    'Access available for the duration of the active subscription'
  ],
  false, 1
),
(
  'premium',
  'Premium',
  'Extended access to dangerous goods training with priority expert knowledge support',
  149.00, '€149', 'month', 'Billed monthly',
  'dg-premium-subscription',
  ARRAY[
    'Unlimited priority email-based expert knowledge support',
    'One 1:1 expert knowledge session per month',
    'Extended access to the full range of dangerous goods training courses',
    'Access available for the duration of the active subscription'
  ],
  true, 2
);
