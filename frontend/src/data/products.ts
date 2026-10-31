export type ProductCategory =
  | 'all'
  | 'combos'
  | 'skincare-patches'
  | 'breathing'
  | 'footcare'
  | 'body-patches';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'combos' | 'skincare-patches' | 'breathing' | 'footcare' | 'body-patches';
  price: number;
  originalPrice?: number;
  isProvisionalPrice: boolean;
  packSize: string; // e.g. "36 Pieces", "30 Pairs", "10 Strips"
  image: string;
  description: string;
  specifications: string[];
  directionsForUse: string;
  isComboKit: boolean;
  kitContents?: string[];
  badge?: string;
  stock: number;
  sku: string;
}

export interface StoreSettings {
  freeShippingEnabled: boolean;
  freeShippingThreshold: number; // in INR
  standardShippingFee: number; // in INR
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  freeShippingEnabled: true,
  freeShippingThreshold: 500, // Configurable threshold (e.g. ₹500)
  standardShippingFee: 50,
};

export const INITIAL_PRODUCTS: Product[] = [
  // ==========================================
  // COMBO KITS (EXACT PRICES & REAL CONTENTS)
  // ==========================================
  {
    id: 'combo-complete-skin-glow',
    name: 'Complete Skin Glow Kit',
    subtitle: '5-Piece Patch & Mask Care Bundle',
    category: 'combos',
    price: 895,
    originalPrice: 895,
    isProvisionalPrice: false,
    packSize: '5 Targeted Items',
    image: '/src/assets/images/pack_pimple_patches_1792057734811.jpg',
    description: 'A comprehensive 5-piece facial care bundle combining pimple spot care, pore cleansing strips, under-eye nourishment, and hydrating facial and lip masks.',
    specifications: [
      'Comprehensive care for blemishes, pores, under-eyes, lips and face',
      'Convenient single-use and multi-patch formats',
      'Compact for travel or home self-care routines'
    ],
    directionsForUse: 'Use blackhead strips on clean wet nose. Apply pimple patches directly onto clean dry blemishes. Place eye patches and lip mask for 15-20 minutes, followed by the hydrating sheet mask.',
    isComboKit: true,
    kitContents: [
      'Pimple patches (36 pieces)',
      'Blackhead removal strips (6 strips)',
      'Eye patches (30 pairs)',
      'Hydrating sheet mask (1 mask)',
      'Lip patch mask (1 mask)'
    ],
    badge: '5-Piece Kit',
    stock: 40,
    sku: 'ORX-KIT-GLOW-895'
  },
  {
    id: 'combo-gold-foot-care-duo',
    name: 'Gold Foot-Care Duo',
    subtitle: '20-Pad Dual Foot-Care Set',
    category: 'combos',
    price: 358,
    originalPrice: 358,
    isProvisionalPrice: false,
    packSize: '20 Total Pads (2 Packs)',
    image: '/src/assets/images/pack_foot_pads_1792057736038.jpg',
    description: 'A 2-pack foot pad combination featuring Kinoki Gold Series cleansing foot pads paired with general foot-care pads for overnight sole comfort.',
    specifications: [
      'Total of 20 adhesive cleansing foot pads',
      'Designed for overnight application to the soles of feet',
      'Breathable adhesive backing sheets included'
    ],
    directionsForUse: 'Wash and dry feet thoroughly before bed. Peel protective paper from adhesive sheet and firmly attach pad to center of sole. Leave on overnight (6-8 hours) and wash residue in morning.',
    isComboKit: true,
    kitContents: [
      'Kinoki Gold Series cleansing foot pads (10 pads)',
      'General foot-care/detox pads (10 pads)'
    ],
    badge: 'Foot Care Duo',
    stock: 50,
    sku: 'ORX-KIT-FOOT-358'
  },
  {
    id: 'combo-sleep-breathe-kit',
    name: 'Sleep & Breathe Kit',
    subtitle: 'Nasal Strips & Magnetic Dilator Bundle',
    category: 'combos',
    price: 698,
    originalPrice: 698,
    isProvisionalPrice: false,
    packSize: '30 Strips + Starter Kit',
    image: '/src/assets/images/nasal_dilator_kit_1792057805167.jpg',
    description: 'An integrated nighttime breathing kit combining 30 adhesive nasal strips and the reusable magnetic Sleep & Sport nasal dilator starter kit.',
    specifications: [
      'Includes 30 single-use nasal strips and 1 reusable magnetic dilator set with case',
      'Designed to physically open nasal passages for sleep or physical activity',
      'Drug-free mechanical airflow support'
    ],
    directionsForUse: 'For strips: Wash and dry bridge of nose, apply strip across bridge, and press firmly for 30 seconds. For magnetic dilator: Select appropriate wing size, place gently inside nostrils, and position magnetic bridge.',
    isComboKit: true,
    kitContents: [
      'Nasal strips (30 strips)',
      'Magnetic Sleep & Sport nasal dilator starter kit (applicator, case & multi-size wings)'
    ],
    badge: 'Breathing Set',
    stock: 35,
    sku: 'ORX-KIT-BREATHE-698'
  },

  // ==========================================
  // INDIVIDUAL PRODUCTS (REAL ORIONIX CATALOG)
  // ==========================================
  {
    id: 'prod-pimple-patches-36',
    name: 'Pimple Patches',
    subtitle: 'Hydrocolloid Blemish Spot Covers',
    category: 'skincare-patches',
    price: 199,
    isProvisionalPrice: false,
    packSize: '36 Pieces',
    image: '/src/assets/images/pack_pimple_patches_1792057734811.jpg',
    description: 'Hydrocolloid spot patches designed to cover blemishes, absorb exudate, and protect spots from dirt, picking, and friction.',
    specifications: [
      '36 hydrocolloid patches per pack',
      'Low-profile translucent finish suitable for day or night wear',
      'Gentle adhesive that stays securely in place'
    ],
    directionsForUse: 'Clean and completely dry the blemish area. Apply patch directly over the spot. Remove or replace when the patch turns opaque white (usually 6-8 hours).',
    isComboKit: false,
    badge: 'Spot Care',
    stock: 120,
    sku: 'ORX-PMP-36'
  },
  {
    id: 'prod-eye-patches-30',
    name: 'Eye Patches',
    subtitle: 'Hydrogel Under-Eye Patch Pads',
    category: 'skincare-patches',
    price: 349,
    isProvisionalPrice: false,
    packSize: '30 Pairs (60 Patches)',
    image: '/src/assets/images/pack_eye_patches_1792057735106.jpg',
    description: 'Contoured hydrogel pads shaped for the delicate under-eye area. Delivers a cooling, soothing sensation to help comfort tired-looking eyes.',
    specifications: [
      '30 pairs (60 individual patches) in a sealed jar',
      'Includes hygienic mini spatula for easy separation',
      'Contoured teardrop shape fits comfortably under lower lashes'
    ],
    directionsForUse: 'Use the enclosed spatula to lift an eye patch. Place gently under each eye on clean, dry skin. Leave on for 15-20 minutes, then remove and pat remaining serum.',
    isComboKit: false,
    badge: 'Eye Care',
    stock: 85,
    sku: 'ORX-EYE-30'
  },
  {
    id: 'prod-nasal-strips-10',
    name: 'Nasal Strips (10 Pack)',
    subtitle: 'Breath-Opening Adhesive Strips',
    category: 'breathing',
    price: 199,
    isProvisionalPrice: false,
    packSize: '10 Strips',
    image: '/src/assets/images/pack_nasal_strips_1792057736383.jpg',
    description: 'Flexible spring-like bands that gently lift the sides of the nose to help open nasal passages for easier airflow during sleep or exercise.',
    specifications: [
      '10 individual sterile-wrapped strips',
      'Flexible spring bands gently flare nostrils',
      'Drug-free external application'
    ],
    directionsForUse: 'Thoroughly wash and dry nose bridge to remove oil. Center strip across the bridge of your nose and press down firmly until adhered.',
    isComboKit: false,
    badge: '10 Strips',
    stock: 110,
    sku: 'ORX-NS-10'
  },
  {
    id: 'prod-nasal-strips-30',
    name: 'Nasal Strips (30 Pack)',
    subtitle: 'Breath-Opening Adhesive Strips',
    category: 'breathing',
    price: 399,
    isProvisionalPrice: false,
    packSize: '30 Strips',
    image: '/src/assets/images/pack_nasal_strips_1792057736383.jpg',
    description: 'Full monthly supply of flexible adhesive nasal strips designed to gently lift nasal walls to promote comfortable breathing at night.',
    specifications: [
      '30 individual sterile-wrapped strips',
      'Economical monthly pack',
      'Suitable for night use, sports, and congested breathing'
    ],
    directionsForUse: 'Clean and dry nose thoroughly. Place strip directly across the bridge of the nose. Press firmly on edges to secure.',
    isComboKit: false,
    badge: 'Value Pack (30)',
    stock: 95,
    sku: 'ORX-NS-30'
  },
  {
    id: 'prod-blackhead-strips-6',
    name: 'Blackhead Removal Strips',
    subtitle: 'Deep Pore Cleansing Nose Strips',
    category: 'skincare-patches',
    price: 149,
    isProvisionalPrice: false,
    packSize: '6 Strips',
    image: '/src/assets/images/pack_blackhead_strips_1792057804585.jpg',
    description: 'Single-use adhesive strips that bond with pore impurities, excess sebum, and blackheads on the nose to lift them away upon peeling.',
    specifications: [
      '6 nose pore cleansing strips per box',
      'Specially contoured slit design for snug nose curvature fit',
      'Quick 10-15 minute application'
    ],
    directionsForUse: 'Wash face and wet nose thoroughly with warm water. Peel strip from plastic backing and apply smooth side to wet nose. Let dry 10-15 minutes until stiff, then gently peel from edges toward center.',
    isComboKit: false,
    badge: 'Pore Cleansing',
    stock: 90,
    sku: 'ORX-BKS-06'
  },
  {
    id: 'prod-kinoki-gold-foot-pads',
    name: 'Kinoki Gold Series Cleansing Foot Pads',
    subtitle: 'Overnight Foot Pads with Adhesive Sheets',
    category: 'footcare',
    price: 179,
    isProvisionalPrice: false,
    packSize: '10 Pads (5 Pairs)',
    image: '/src/assets/images/pack_foot_pads_1792057736038.jpg',
    description: 'Cleansing foot pads with adhesive sheets designed to be applied to the soles of the feet overnight for warmth and foot comfort.',
    specifications: [
      '10 pads + 10 adhesive backing sheets',
      'Gold series packaging with secure adhesive fixation',
      'Applied overnight while resting'
    ],
    directionsForUse: 'Peel back paper from adhesive sheet. Place printed side of pad onto adhesive, then press firmly onto clean center of sole. Wear overnight and rinse feet in morning.',
    isComboKit: false,
    badge: 'Gold Series',
    stock: 75,
    sku: 'ORX-KINOKI-10'
  },
  {
    id: 'prod-magnetic-nasal-dilator-kit',
    name: 'Magnetic Sleep & Sport Nasal Dilator Starter Kit',
    subtitle: 'External Reusable Nasal Dilator Set',
    category: 'breathing',
    price: 299,
    isProvisionalPrice: false,
    packSize: 'Complete Starter Kit',
    image: '/src/assets/images/nasal_dilator_kit_1792057805167.jpg',
    description: 'A reusable magnetic nasal dilator starter kit that includes an applicator, storage case, and multi-size nasal inserts to improve nasal airflow.',
    specifications: [
      'Includes multiple sizing wings for custom fit',
      'Hygienic protective hard travel case included',
      'Reusable, easy to wash with mild soap and warm water',
      'Comfortable for sleeping or sports activities'
    ],
    directionsForUse: 'Choose the appropriate wing size that fits comfortably. Position the dilator inside the nostrils according to user guide. Wash and dry after each use.',
    isComboKit: false,
    badge: 'Reusable Tool',
    stock: 55,
    sku: 'ORX-MAG-DIL-01'
  },
  {
    id: 'prod-lip-patch-mask',
    name: 'Lip Patch Mask',
    subtitle: 'Hydrogel Conditioning Lip Patch',
    category: 'skincare-patches',
    price: 99,
    isProvisionalPrice: true,
    packSize: 'Single Patch Sachet',
    image: '/src/assets/images/pack_sheet_mask_1792057805320.jpg',
    description: 'A shaped hydrogel patch formulated to hydrate dry, chapped lips and the lip contour area. (Provisional price — editable in catalog).',
    specifications: [
      'Single-use hydrogel lip mask in foil sachet',
      'Covers entire lip area and immediate surrounding skin',
      'Provisional launch price'
    ],
    directionsForUse: 'Apply to clean, dry lips. Smooth down firmly and leave on for 15-20 minutes. Discard patch and pat remaining moisture into lips.',
    isComboKit: false,
    badge: 'Provisional Price',
    stock: 150,
    sku: 'ORX-LIP-MSK'
  },
  {
    id: 'prod-hydrating-sheet-mask',
    name: 'Hydrating Sheet Mask',
    subtitle: 'Moisture Infusion Facial Sheet Mask',
    category: 'skincare-patches',
    price: 99,
    isProvisionalPrice: true,
    packSize: '1 Facial Mask Sachet',
    image: '/src/assets/images/pack_sheet_mask_1792057805320.jpg',
    description: 'A soft fabric facial sheet mask soaked in a hydrating essence to moisturize and revitalize dry facial skin. (Provisional price — editable in catalog).',
    specifications: [
      'Individually packaged single-use facial sheet mask',
      'Pre-cut eye, nose, and mouth contours',
      'Provisional launch price'
    ],
    directionsForUse: 'Unfold mask and place gently over clean dry face. Smooth flat to adhere. Relax for 15-20 minutes, remove sheet, and massage remaining liquid into skin.',
    isComboKit: false,
    badge: 'Provisional Price',
    stock: 140,
    sku: 'ORX-SHT-MSK'
  },
  {
    id: 'prod-general-foot-pads',
    name: 'General Foot-Care / Detox Pads',
    subtitle: 'Comfort Cleansing Foot Pads',
    category: 'footcare',
    price: 179,
    isProvisionalPrice: true,
    packSize: '10 Pads (5 Pairs)',
    image: '/src/assets/images/pack_foot_pads_1792057736038.jpg',
    description: 'General cleansing foot pads with adhesive fixing tape for overnight sole application. (Provisional price — editable in catalog).',
    specifications: [
      '10 pads with individual adhesive fixing strips',
      'Nighttime use on feet soles',
      'Provisional catalog price'
    ],
    directionsForUse: 'Attach pad to adhesive tape with printed side facing the adhesive. Apply to center of sole before sleep. Remove and wash feet in morning.',
    isComboKit: false,
    badge: 'Provisional Price',
    stock: 80,
    sku: 'ORX-FT-GEN-10'
  },
  {
    id: 'prod-knee-patch',
    name: 'Knee Relief Patch',
    subtitle: 'Targeted Joint Comfort Warming Patches',
    category: 'body-patches',
    price: 199,
    isProvisionalPrice: true,
    packSize: '10 Patches',
    image: '/src/assets/images/pack_knee_patch_1792057805692.jpg',
    description: 'Ergonomically contoured adhesive patches designed to fit around knee joints for soothing warmth and comfort during daily movement. (Provisional price — editable in catalog).',
    specifications: [
      '10 contoured knee patches per box',
      'Flexible fabric backing moves naturally with walking and bending',
      'Provisional catalog price — editable'
    ],
    directionsForUse: 'Clean and dry knee area. Peel protective film and apply curved patch snugly over knee joint. Leave on for 6-8 hours.',
    isComboKit: false,
    badge: 'Provisional Price',
    stock: 60,
    sku: 'ORX-KNE-PAT-10'
  },
  {
    id: 'prod-varicose-veins-patch',
    name: 'Varicose Veins Comfort Patch',
    subtitle: 'Leg Care Comfort Adhesive Patches',
    category: 'body-patches',
    price: 249,
    isProvisionalPrice: true,
    packSize: '10 Patches',
    image: '/src/assets/images/pack_knee_patch_1792057805692.jpg',
    description: 'Soothing adhesive patches designed for application along calves and legs to provide a cooling, relaxing sensation for tired leg areas. (Provisional price — editable in catalog).',
    specifications: [
      '10 individual patches per pack',
      'Skin-friendly adhesive with cooling herbal extract essence',
      'Provisional catalog price — editable'
    ],
    directionsForUse: 'Clean and dry the leg area. Apply patch directly over the desired leg area. Leave on for 6-8 hours. Discard after use.',
    isComboKit: false,
    badge: 'Provisional Price',
    stock: 55,
    sku: 'ORX-VAR-PAT-10'
  }
];
