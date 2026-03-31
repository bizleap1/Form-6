export type ProductLine = 'core' | 'prime'
export type ProductGoal = 'Recovery' | 'Sleep' | 'Focus' | 'Energy' | 'Immunity' | 'Longevity' | 'Stress'
export type ProductFormat = 'Capsule' | 'Powder' | 'Sachet'

export interface Ingredient {
  name: string
  dose: string
  nrv: string
  form: string
}

export interface Product {
  id: number
  line: ProductLine
  name: string
  slug: string
  tagline: string
  benefit: string
  description: string
  price: number
  rating: number
  reviews: number
  goal: ProductGoal
  format: ProductFormat
  servings: number
  intensity: 'Essential' | 'Advanced' | 'Elite'
  badge?: string
  ingredients: Ingredient[]
  benefits: { title: string; desc: string }[]
  usage: string[]
  whoFor: string[]
}

export const products: Product[] = [
  {
    id: 1,
    line: 'core',
    name: 'Advanced Recovery Complex',
    slug: 'advanced-recovery-complex',
    tagline: 'Accelerate muscular repair and reduce inflammation post-training.',
    benefit: 'Clinical-dose HMB, curcumin, and antioxidant stack for elite recovery.',
    description: 'Engineered for athletes who train at intensity. The Advanced Recovery Complex addresses three primary mechanisms of exercise-induced muscle damage: sarcomeric disruption, inflammatory cascade activation, and oxidative stress accumulation.',
    price: 54.90,
    rating: 4.9,
    reviews: 318,
    goal: 'Recovery',
    format: 'Capsule',
    servings: 30,
    intensity: 'Elite',
    badge: 'Best Seller',
    ingredients: [
      { name: 'HMB (β-hydroxy β-methylbutyrate)', dose: '3,000 mg', nrv: '—', form: 'Free Acid' },
      { name: 'Curcumin', dose: '1,000 mg', nrv: '—', form: '95% Curcuminoids + BioPerine®' },
      { name: 'Magnesium', dose: '300 mg', nrv: '80%', form: 'Bisglycinate' },
      { name: 'Astaxanthin', dose: '12 mg', nrv: '—', form: 'Haematococcus pluvialis' },
      { name: 'Vitamin D3', dose: '2,000 IU', nrv: '250%', form: 'Cholecalciferol' },
      { name: 'Zinc', dose: '15 mg', nrv: '150%', form: 'Bisglycinate' },
      { name: 'L-Glutamine', dose: '5,000 mg', nrv: '—', form: 'Pharmaceutical Grade' },
    ],
    benefits: [
      { title: 'Accelerated Muscle Repair', desc: 'Clinical-dose HMB and leucine peptides to upregulate protein synthesis pathways' },
      { title: 'Inflammation Modulation', desc: 'Standardised curcumin (95% curcuminoids) with BioPerine® for 20× enhanced absorption' },
      { title: 'Oxidative Stress Reduction', desc: 'Astaxanthin 12 mg + Vitamin E complex to neutralise exercise-induced free radicals' },
    ],
    usage: [
      'Take 4 capsules within 30–60 minutes post-training.',
      'On non-training days, take with morning meal.',
      'Best results after 4–6 weeks of consistent daily use.',
      'Store in a cool, dry place. Keep out of reach of children.',
    ],
    whoFor: ['Strength & power athletes', 'Endurance athletes', 'High-volume training phases', 'Competition peaking'],
  },
  {
    id: 2,
    line: 'core',
    name: 'Core Sleep Formula',
    slug: 'core-sleep-formula',
    tagline: 'Clinically-dosed sleep induction and deep sleep architecture support.',
    benefit: 'Magnesium glycinate, L-theanine, and ashwagandha for restorative sleep.',
    description: 'Sleep is the most anabolic window in any training programme. Core Sleep Formula supports sleep onset, slow-wave sleep quality, and hormonal recovery through a synergistic combination of evidence-based compounds.',
    price: 49.90,
    rating: 4.8,
    reviews: 211,
    goal: 'Sleep',
    format: 'Capsule',
    servings: 30,
    intensity: 'Advanced',
    ingredients: [
      { name: 'Magnesium', dose: '400 mg', nrv: '107%', form: 'Bisglycinate' },
      { name: 'L-Theanine', dose: '400 mg', nrv: '—', form: 'Suntheanine®' },
      { name: 'Ashwagandha Root Extract', dose: '600 mg', nrv: '—', form: 'KSM-66® (5% withanolides)' },
      { name: 'Melatonin', dose: '0.5 mg', nrv: '—', form: 'Pharmaceutical Grade' },
      { name: 'Zinc', dose: '10 mg', nrv: '100%', form: 'Bisglycinate' },
      { name: 'Vitamin B6', dose: '10 mg', nrv: '714%', form: 'Pyridoxal-5-Phosphate' },
    ],
    benefits: [
      { title: 'Faster Sleep Onset', desc: 'L-Theanine at 400 mg promotes alpha-wave activity and reduces sleep latency' },
      { title: 'Deep Sleep Architecture', desc: 'Magnesium bisglycinate supports GABA-receptor activity for slow-wave sleep' },
      { title: 'Hormonal Recovery', desc: 'KSM-66® ashwagandha reduces cortisol and supports overnight testosterone recovery' },
    ],
    usage: [
      'Take 3 capsules 45–60 minutes before target sleep time.',
      'Do not drive or operate machinery after use.',
      'Best taken on an empty stomach or with a light snack.',
      'Cycle 5 days on, 2 days off or use continuously for up to 8 weeks.',
    ],
    whoFor: ['Athletes with sleep quality issues', 'High-stress training phases', 'Travel / time-zone disruption', 'Anyone prioritising recovery'],
  },
  {
    id: 3,
    line: 'core',
    name: 'Pre-Training Ignite',
    slug: 'pre-training-ignite',
    tagline: 'Sustained performance energy without crash or excessive stimulation.',
    benefit: 'Citrulline malate, beta-alanine, and natural caffeine for peak performance.',
    description: 'A clinically-dosed pre-workout matrix engineered for sustained output — not the spike-and-crash typical of over-stimulant formulas. Every ingredient is at or above the minimum effective dose.',
    price: 44.90,
    rating: 4.7,
    reviews: 167,
    goal: 'Energy',
    format: 'Powder',
    servings: 30,
    intensity: 'Elite',
    ingredients: [
      { name: 'L-Citrulline Malate 2:1', dose: '8,000 mg', nrv: '—', form: 'Pharmaceutical Grade' },
      { name: 'Beta-Alanine', dose: '3,200 mg', nrv: '—', form: 'CarnoSyn®' },
      { name: 'Betaine Anhydrous', dose: '2,500 mg', nrv: '—', form: 'TMG' },
      { name: 'Natural Caffeine', dose: '200 mg', nrv: '—', form: 'Green Coffee Extract' },
      { name: 'L-Tyrosine', dose: '2,000 mg', nrv: '—', form: 'Free-form amino acid' },
      { name: 'Vitamin B12', dose: '500 mcg', nrv: '20,000%', form: 'Methylcobalamin' },
    ],
    benefits: [
      { title: 'Nitric Oxide Amplification', desc: '8 g citrulline malate to maximise blood flow and nutrient delivery to working muscle' },
      { title: 'Muscular Endurance', desc: 'CarnoSyn® beta-alanine buffers hydrogen ions to delay fatigue and extend output capacity' },
      { title: 'Clean, Sustained Energy', desc: 'Natural caffeine with L-tyrosine for smooth energy without anxiety or post-workout crash' },
    ],
    usage: [
      'Mix 1 scoop (15 g) with 300–400 ml cold water.',
      'Consume 20–30 minutes before training.',
      'Do not exceed 1 serving per day.',
      'Not recommended within 6 hours of sleep.',
    ],
    whoFor: ['Strength athletes', 'HIIT and CrossFit athletes', 'Endurance training', 'Competitive sports performance'],
  },
  {
    id: 4,
    line: 'prime',
    name: 'Prime Focus Formula',
    slug: 'prime-focus-formula',
    tagline: 'Cognitive clarity, executive function, and sustained mental energy.',
    benefit: 'Lion\'s mane, bacopa, and alpha-GPC for measurable cognitive enhancement.',
    description: 'Formulated for high-performance professionals who require sustained mental clarity, focused attention, and cognitive resilience across long working days. No stimulant jitters — just clean, evidence-based cognitive support.',
    price: 54.90,
    rating: 4.9,
    reviews: 274,
    goal: 'Focus',
    format: 'Capsule',
    servings: 30,
    intensity: 'Advanced',
    badge: 'Most Popular',
    ingredients: [
      { name: "Lion's Mane Mushroom Extract", dose: '1,000 mg', nrv: '—', form: '30% polysaccharides' },
      { name: 'Bacopa Monnieri', dose: '300 mg', nrv: '—', form: '50% bacosides' },
      { name: 'Alpha-GPC', dose: '600 mg', nrv: '—', form: '50% Alpha-GPC' },
      { name: 'Rhodiola Rosea', dose: '400 mg', nrv: '—', form: '3% rosavins, 1% salidroside' },
      { name: 'Phosphatidylserine', dose: '200 mg', nrv: '—', form: 'Sunflower-derived' },
      { name: 'Vitamin B Complex', dose: '—', nrv: 'Varies', form: 'Active methylated forms' },
    ],
    benefits: [
      { title: 'Neurogenesis Support', desc: "Lion's mane stimulates NGF (nerve growth factor) production for long-term cognitive health" },
      { title: 'Memory & Learning', desc: 'Bacopa monnieri at clinical dose improves information retention and working memory' },
      { title: 'Acetylcholine Amplification', desc: 'Alpha-GPC provides the direct precursor to acetylcholine — the neurotransmitter of learning' },
    ],
    usage: [
      'Take 3 capsules with morning meal.',
      'Effects on memory and cognition build over 4–12 weeks.',
      'Suitable for continuous long-term use.',
      'Can be paired with Prime Stress Support for comprehensive mental wellness.',
    ],
    whoFor: ['Executives and founders', 'Knowledge workers', 'Students and researchers', 'Professionals in demanding cognitive roles'],
  },
  {
    id: 5,
    line: 'prime',
    name: 'Prime Immunity Shield',
    slug: 'prime-immunity-shield',
    tagline: 'Comprehensive immune support with standardised botanical extracts.',
    benefit: 'Vitamin D3/K2, zinc, elderberry, and beta-glucan for year-round immunity.',
    description: 'A comprehensive immune support matrix combining synergistic micronutrients and botanical extracts at evidence-based doses. Designed for daily use as foundational immune maintenance.',
    price: 39.90,
    rating: 4.8,
    reviews: 142,
    goal: 'Immunity',
    format: 'Capsule',
    servings: 30,
    intensity: 'Essential',
    ingredients: [
      { name: 'Vitamin D3', dose: '4,000 IU', nrv: '500%', form: 'Cholecalciferol' },
      { name: 'Vitamin K2', dose: '180 mcg', nrv: '240%', form: 'MK-7 (all-trans)' },
      { name: 'Zinc', dose: '25 mg', nrv: '250%', form: 'Bisglycinate' },
      { name: 'Elderberry Extract', dose: '500 mg', nrv: '—', form: '25% anthocyanins' },
      { name: 'Beta-Glucan', dose: '250 mg', nrv: '—', form: 'Wellmune® (1,3/1,6)' },
      { name: 'Vitamin C', dose: '1,000 mg', nrv: '1,250%', form: 'Ascorbic Acid + Rosehip bioflavonoids' },
    ],
    benefits: [
      { title: 'Foundational Immune Regulation', desc: 'Vitamin D3 at 4,000 IU corrects widespread deficiency and modulates innate immunity' },
      { title: 'Antiviral Defence', desc: 'Wellmune® beta-glucan activates neutrophils and macrophages for enhanced pathogen response' },
      { title: 'Antioxidant Protection', desc: 'Vitamin C with bioflavonoids and elderberry anthocyanins reduce oxidative immune stress' },
    ],
    usage: [
      'Take 2 capsules daily with morning meal.',
      'Take with Vitamin D-containing food (fat-soluble absorption).',
      'Suitable for year-round continuous use.',
      'Increase to 3 capsules daily during periods of increased exposure risk.',
    ],
    whoFor: ['Anyone wanting year-round immune support', 'Frequent travellers', 'Athletes during high-load training', 'Anyone in D3-deficient regions'],
  },
  {
    id: 6,
    line: 'prime',
    name: 'Prime Longevity Complex',
    slug: 'prime-longevity-complex',
    tagline: 'Cellular health, NAD+ precursors, and antioxidant defence for longevity.',
    benefit: 'NMN, resveratrol, CoQ10 ubiquinol, and spermidine for healthspan extension.',
    description: 'The most advanced formulation in the Form6 Prime line. Designed for individuals serious about healthspan optimisation — targeting four key hallmarks of aging: NAD+ decline, mitochondrial dysfunction, senescence, and chronic inflammation.',
    price: 69.90,
    rating: 4.9,
    reviews: 98,
    goal: 'Longevity',
    format: 'Capsule',
    servings: 30,
    intensity: 'Elite',
    ingredients: [
      { name: 'NMN (Nicotinamide Mononucleotide)', dose: '500 mg', nrv: '—', form: 'Stabilised powder' },
      { name: 'Trans-Resveratrol', dose: '500 mg', nrv: '—', form: '99% purity extract' },
      { name: 'CoQ10', dose: '200 mg', nrv: '—', form: 'Ubiquinol (reduced)' },
      { name: 'Spermidine', dose: '6 mg', nrv: '—', form: 'Wheat germ extract' },
      { name: 'Fisetin', dose: '200 mg', nrv: '—', form: 'Strawberry tree extract (98%)' },
      { name: 'Quercetin', dose: '500 mg', nrv: '—', form: 'Sophora japonica extract' },
    ],
    benefits: [
      { title: 'NAD+ Restoration', desc: 'NMN is a direct NAD+ precursor — NAD+ levels decline by ~50% by age 50, impairing cellular energy' },
      { title: 'Mitochondrial Support', desc: 'CoQ10 (ubiquinol form) maintains mitochondrial electron transport chain efficiency' },
      { title: 'Senolytic Activity', desc: 'Fisetin and quercetin target and clear senescent cells — a primary driver of age-related decline' },
    ],
    usage: [
      'Take 3 capsules with morning meal (fat-containing for CoQ10/resveratrol absorption).',
      'Consistent daily use required — longevity benefits are cumulative.',
      'Best paired with Prime Focus Formula for comprehensive daily stack.',
      'Consult physician if taking anticoagulant medications (resveratrol interaction).',
    ],
    whoFor: ['Adults 35+ prioritising healthspan', 'Biohackers and longevity-focused individuals', 'High-stress executives', 'Anyone with family history of metabolic disease'],
  },
  {
    id: 7,
    line: 'core',
    name: 'Intra-Training BCAA+',
    slug: 'intra-training-bcaa',
    tagline: 'Leucine-enriched amino acid matrix for muscle preservation during training.',
    benefit: 'EAA matrix with clinical leucine ratio and electrolytes for intra-workout use.',
    description: 'Formulated for consumption during training sessions — delivering essential amino acids to prevent muscle catabolism, support hydration, and maintain neuromuscular performance.',
    price: 42.90,
    rating: 4.7,
    reviews: 186,
    goal: 'Recovery',
    format: 'Powder',
    servings: 30,
    intensity: 'Advanced',
    ingredients: [
      { name: 'L-Leucine', dose: '3,000 mg', nrv: '—', form: 'Free-form amino acid' },
      { name: 'L-Isoleucine', dose: '1,500 mg', nrv: '—', form: 'Free-form amino acid' },
      { name: 'L-Valine', dose: '1,500 mg', nrv: '—', form: 'Free-form amino acid' },
      { name: 'Essential Amino Acid Complex', dose: '5,000 mg', nrv: '—', form: 'Full EAA spectrum' },
      { name: 'Sodium', dose: '500 mg', nrv: '25%', form: 'Sodium chloride + citrate' },
      { name: 'Potassium', dose: '200 mg', nrv: '10%', form: 'Potassium citrate' },
    ],
    benefits: [
      { title: 'Anti-Catabolic Protection', desc: 'BCAA 2:1:1 ratio with elevated leucine triggers mTOR and prevents muscle protein breakdown' },
      { title: 'Intra-Workout Hydration', desc: 'Clinical electrolyte dosing maintains fluid balance and neuromuscular function' },
      { title: 'Full EAA Matrix', desc: 'Complete essential amino acid spectrum — not just BCAAs — for maximal MPS support' },
    ],
    usage: [
      'Mix 1 scoop (20 g) with 500 ml water.',
      'Sip throughout training session (60–90 minutes).',
      'Can also be used as post-workout when combined with protein source.',
      'Add additional water for longer sessions.',
    ],
    whoFor: ['Endurance athletes', 'Bodybuilders in caloric deficit', 'Fasted training practitioners', 'High-frequency training programmes'],
  },
  {
    id: 8,
    line: 'prime',
    name: 'Prime Stress Support',
    slug: 'prime-stress-support',
    tagline: 'Adaptogenic stack for HPA axis regulation and cortisol balance.',
    benefit: 'KSM-66 ashwagandha, Rhodiola, and phosphatidylserine for stress resilience.',
    description: 'Chronic psychological stress dysregulates the HPA axis, elevates cortisol, and accelerates biological aging. Prime Stress Support directly targets stress physiology with the highest-quality adaptogenic extracts available.',
    price: 47.90,
    rating: 4.8,
    reviews: 123,
    goal: 'Stress',
    format: 'Capsule',
    servings: 30,
    intensity: 'Advanced',
    ingredients: [
      { name: 'Ashwagandha Root Extract', dose: '600 mg', nrv: '—', form: 'KSM-66® (5% withanolides)' },
      { name: 'Rhodiola Rosea', dose: '500 mg', nrv: '—', form: '3% rosavins, 1% salidroside' },
      { name: 'Phosphatidylserine', dose: '300 mg', nrv: '—', form: 'Sunflower-derived' },
      { name: 'L-Theanine', dose: '200 mg', nrv: '—', form: 'Suntheanine®' },
      { name: 'Magnesium', dose: '200 mg', nrv: '53%', form: 'Bisglycinate' },
      { name: 'Vitamin B5', dose: '200 mg', nrv: '3,333%', form: 'Pantothenic acid (adrenal support)' },
    ],
    benefits: [
      { title: 'Cortisol Regulation', desc: 'KSM-66® ashwagandha reduces serum cortisol by up to 27% in clinical trials (vs. placebo)' },
      { title: 'Stress Resilience', desc: 'Rhodiola rosea (SHR-5 standardised extract) reduces burnout and improves stress adaptability' },
      { title: 'HPA Axis Normalisation', desc: 'Phosphatidylserine blunts ACTH and cortisol responses to psychological stressors' },
    ],
    usage: [
      'Take 2 capsules with breakfast.',
      'Adaptogens work cumulatively — effects build over 2–4 weeks.',
      'Suitable for continuous use. Cycle every 8 weeks if desired.',
      'Can be combined with Prime Focus Formula for comprehensive cognitive-stress support.',
    ],
    whoFor: ['High-stress professionals', 'Athletes overtraining / high volume', 'Anyone experiencing burnout', 'Executives managing complex demands'],
  },
  {
    id: 9,
    line: 'core',
    name: 'Electrolyte Performance+',
    slug: 'electrolyte-performance',
    tagline: 'Precision electrolyte matrix for hydration and peak muscle function.',
    benefit: 'Clinical sodium, potassium, magnesium, and chloride ratios for elite hydration.',
    description: 'Hydration is not about water alone. Electrolyte Performance+ delivers a precision matrix of electrolytes at physiologically correct ratios — designed to match sweat composition data and support muscle function, cramping prevention, and cardiovascular performance.',
    price: 34.90,
    rating: 4.7,
    reviews: 201,
    goal: 'Energy',
    format: 'Sachet',
    servings: 30,
    intensity: 'Essential',
    ingredients: [
      { name: 'Sodium', dose: '1,000 mg', nrv: '50%', form: 'Sodium chloride + bicarbonate' },
      { name: 'Potassium', dose: '400 mg', nrv: '20%', form: 'Potassium citrate' },
      { name: 'Magnesium', dose: '150 mg', nrv: '40%', form: 'Bisglycinate' },
      { name: 'Calcium', dose: '100 mg', nrv: '13%', form: 'Calcium lactate' },
      { name: 'Chloride', dose: '1,500 mg', nrv: '188%', form: 'Sodium + Potassium chloride' },
      { name: 'D-Ribose', dose: '1,000 mg', nrv: '—', form: 'Pharmaceutical Grade' },
    ],
    benefits: [
      { title: 'Precision Hydration', desc: 'Electrolyte ratio matched to human sweat composition for optimal fluid retention' },
      { title: 'Cramp Prevention', desc: 'Full magnesium and potassium matrix addresses the primary electrolyte-depletion causes of cramping' },
      { title: 'Rapid Absorption', desc: 'Citrate and lactate salt forms provide superior absorption vs. cheaper inorganic mineral salts' },
    ],
    usage: [
      'Dissolve 1 sachet in 500 ml water.',
      'Consume during or immediately after exercise.',
      'Can be used on non-training days to support daily hydration.',
      'Suitable for all endurance sports and high-sweat activities.',
    ],
    whoFor: ['Endurance athletes', 'Team sport players', 'Sweat-heavy trainers', 'Anyone prone to exercise cramping'],
  },
]

export const getProductsByLine = (line: ProductLine) =>
  products.filter(p => p.line === line)

export const getProductsByGoal = (goal: ProductGoal) =>
  products.filter(p => p.goal === goal)

export const getProductBySlug = (slug: string) =>
  products.find(p => p.slug === slug)

export const featuredProducts = products.filter(p =>
  ['advanced-recovery-complex', 'prime-focus-formula', 'core-sleep-formula', 'prime-longevity-complex', 'pre-training-ignite', 'prime-immunity-shield'].includes(p.slug)
)
