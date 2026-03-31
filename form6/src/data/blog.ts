export interface BlogPost {
  id: number
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  emoji: string
  bgColor: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'creatine-monohydrate-research',
    category: 'Recovery Science',
    title: 'The Creatine Monohydrate Myth: What the Research Actually Shows',
    excerpt: 'Separating marketing from mechanism — a deep review of 34 published trials on creatine bioavailability and performance outcomes.',
    date: 'Dec 18, 2024',
    readTime: '8 min',
    emoji: '🧬',
    bgColor: 'from-teal-50 to-teal-100',
  },
  {
    id: 2,
    slug: 'nootropic-stacking-evidence',
    category: 'Mental Performance',
    title: 'Nootropic Stacking: Evidence vs. Hype in Cognitive Enhancement',
    excerpt: 'Which compounds have genuine clinical evidence and which are overhyped? A scientist\'s guide to building a rational nootropic stack.',
    date: 'Dec 10, 2024',
    readTime: '11 min',
    emoji: '🧠',
    bgColor: 'from-blue-50 to-indigo-100',
  },
  {
    id: 3,
    slug: 'deep-sleep-architecture',
    category: 'Sleep Optimisation',
    title: 'Deep Sleep Architecture: Why Your Supplements Aren\'t Working',
    excerpt: 'The circadian biology behind sleep quality — and how targeted supplementation can genuinely help when used correctly.',
    date: 'Dec 4, 2024',
    readTime: '7 min',
    emoji: '😴',
    bgColor: 'from-amber-50 to-orange-100',
  },
  {
    id: 4,
    slug: 'mitochondrial-biogenesis',
    category: 'Energy',
    title: 'Mitochondrial Biogenesis: The Science of Sustainable Energy',
    excerpt: 'How cellular energy production works and which compounds genuinely enhance mitochondrial function — without the jitters.',
    date: 'Nov 28, 2024',
    readTime: '9 min',
    emoji: '⚡',
    bgColor: 'from-teal-50 to-teal-100',
  },
  {
    id: 5,
    slug: 'vitamin-d-immune-regulation',
    category: 'Immunity',
    title: 'Vitamin D and Immune Regulation: The Definitive Guide',
    excerpt: 'Why D3 deficiency is widespread across Europe, and what optimal repletion actually looks like in clinical practice.',
    date: 'Nov 19, 2024',
    readTime: '12 min',
    emoji: '🛡️',
    bgColor: 'from-blue-50 to-indigo-100',
  },
  {
    id: 6,
    slug: 'nmn-nr-nad-comparison',
    category: 'Longevity',
    title: 'NAD+ Precursors: Separating NMN from NR from the Hype',
    excerpt: 'A rigorous review of the nicotinamide riboside and NMN literature to 2024 — what the evidence actually supports.',
    date: 'Nov 12, 2024',
    readTime: '14 min',
    emoji: '🔬',
    bgColor: 'from-amber-50 to-orange-100',
  },
]
