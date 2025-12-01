// Quiz data structure and types

export type Tier = 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'tier5';
export type SpecialOutcome = 'PROBATE_AUDIT_UPSELL' | 'ATTORNEY_NEEDED' | 'WAITLIST';

export interface QuizAnswer {
  questionId: string;
  value: string | string[];
  scoring?: Record<Tier, number>;
}

export interface QuizQuestion {
  id: string
  question: string
  subtitle?: string
  helperText?: string
  helperTooltip?: string
  type: "single" | "multi-select" | "dropdown" | "form" | "rank"
  options: QuizOption[]
  routing?: (answers: Record<string, any>) => string | SpecialOutcome
}

export interface QuizOption {
  value: string
  label: string
  scoring?: Record<Tier, number>
  flag?: string
  explainer?: string
  description?: string
  quote?: string
  icon?: string
  next?: string
}

export interface TierInfo {
  id: Tier | SpecialOutcome;
  name: string;
  price: string | number;
  tagline: string;
  description: string;
}

export const TIER_INFO: Record<Tier | SpecialOutcome, TierInfo> = {
  tier1: {
    id: 'tier1',
    name: 'DIY Probate',
    price: '$499',
    tagline: 'Do it yourself with our tools',
    description: 'Perfect for simple estates where you want to handle everything yourself'
  },
  tier2: {
    id: 'tier2',
    name: 'AI-Powered Probate',
    price: '$999',
    tagline: 'AI speed + your oversight',
    description: 'AI handles the paperwork, you review and file'
  },
  tier3: {
    id: 'tier3',
    name: 'Concierge Probate',
    price: '$1,999',
    tagline: 'AI speed + human review',
    description: 'AI speed with human experts reviewing every step'
  },
  tier4: {
    id: 'tier4',
    name: 'Full Service Probate',
    price: '$3,499',
    tagline: 'We handle everything',
    description: 'Complete hands-off service - we do it all for you'
  },
  tier5: {
    id: 'tier5',
    name: 'Premium Estate Settlement',
    price: '$6,999',
    tagline: 'Attorney-backed protection',
    description: 'Licensed attorney oversight for complex cases'
  },
  PROBATE_AUDIT_UPSELL: {
    id: 'PROBATE_AUDIT_UPSELL',
    name: 'Probate Avoidance Audit',
    price: '$499',
    tagline: 'You might not need probate!',
    description: 'Get certainty about whether probate is needed'
  },
  ATTORNEY_NEEDED: {
    id: 'ATTORNEY_NEEDED',
    name: 'Premium Estate Settlement',
    price: '$6,999',
    tagline: 'Attorney-backed protection',
    description: 'Your situation requires legal expertise'
  },
  WAITLIST: {
    id: 'WAITLIST',
    name: 'Coming Soon',
    price: 'TBD',
    tagline: 'We\'re expanding to your state',
    description: 'Join the waitlist to be notified when we launch'
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: "What's the estimated total value of the estate?",
    subtitle: "Include: real estate, bank accounts, investments, vehicles",
    helperText: "Don't worry about being exact. A rough estimate is fine.",
    helperTooltip: "We'll help you calculate the precise value later.",
    type: 'single',
    options: [
      { 
        value: 'under_100k', 
        label: 'Under $100K',
        scoring: { tier1: 3, tier2: 2, tier3: 0, tier4: 0, tier5: 0 }
      },
      { 
        value: '100k_to_184k', 
        label: '$100K - $184K',
        scoring: { tier1: 0, tier2: 3, tier3: 1, tier4: 0, tier5: 0 }
      },
      { 
        value: '184k_to_500k', 
        label: '$184K - $500K',
        scoring: { tier1: 0, tier2: 2, tier3: 3, tier4: 0, tier5: 0 }
      },
      { 
        value: '500k_to_2m', 
        label: '$500K - $2M',
        scoring: { tier1: 0, tier2: 0, tier3: 2, tier4: 3, tier5: 0 }
      },
      { 
        value: 'over_2m', 
        label: 'Over $2M',
        scoring: { tier1: 0, tier2: 0, tier3: 0, tier4: 2, tier5: 3 }
      },
      { 
        value: 'unsure', 
        label: "I'm not sure"
      }
    ]
  },
  {
    id: 'q2',
    question: "Did the deceased have any of these?",
    subtitle: "Select all that apply",
    type: 'multi-select',
    options: [
      {
        value: "living_trust",
        label: "Living Trust (revocable or irrevocable)",
        flag: "PROBATE_AVOIDABLE",
        explainer: "Assets in a trust typically skip probate!"
      },
      {
        value: "pod_accounts",
        label: "Bank accounts with beneficiaries (POD/TOD)",
        flag: "PROBATE_AVOIDABLE",
        explainer: "These transfer directly to beneficiaries."
      },
      {
        value: "joint_accounts",
        label: "Joint ownership on property or accounts",
        flag: "PROBATE_AVOIDABLE",
        explainer: "Joint tenancy transfers automatically."
      },
      {
        value: "life_insurance",
        label: "Life insurance with named beneficiaries",
        flag: "PROBATE_AVOIDABLE",
        explainer: "Life insurance proceeds skip probate."
      },
      {
        value: "retirement_accounts",
        label: "Retirement accounts (IRA, 401k) with beneficiaries",
        flag: "PROBATE_AVOIDABLE",
        explainer: "These go directly to beneficiaries."
      },
      {
        value: "none",
        label: "None of these"
      }
    ],
    routing: (answers) => {
      const q2Answers = answers.q2 as string[] || [];
      const avoidanceFlags = ['living_trust', 'pod_accounts', 'joint_accounts', 'life_insurance', 'retirement_accounts'];
      if (q2Answers.some(answer => avoidanceFlags.includes(answer))) {
        return 'PROBATE_AUDIT_UPSELL';
      }
      return 'q3';
    }
  },
  {
    id: 'q3',
    question: "Are any of these true about the situation?",
    subtitle: "Select all that apply",
    type: 'multi-select',
    options: [
      { 
        value: 'disputes', 
        label: 'Family members disagree about the will or distribution',
        scoring: { tier1: 0, tier2: 0, tier3: 0, tier4: 5, tier5: 5 }
      },
      { 
        value: 'no_will', 
        label: 'There is no will'
      },
      { 
        value: 'business', 
        label: 'The deceased owned a business',
        scoring: { tier1: 0, tier2: 0, tier3: 0, tier4: 3, tier5: 2 }
      },
      {
        value: 'multiple_states',
        label: "There's property in multiple states",
        scoring: { tier1: 0, tier2: 0, tier3: 0, tier4: 2, tier5: 2 }
      },
      {
        value: 'minor_children',
        label: 'Beneficiaries include minor children (under 18)'
      },
      {
        value: 'unclear_will',
        label: 'The will is unclear or missing pages',
        scoring: { tier3: 0, tier4: 2, tier5: 3 }
      },
      {
        value: 'debts',
        label: 'There are significant debts or creditor claims',
        scoring: { tier1: 0, tier2: 0, tier3: 1, tier4: 2, tier5: 2 }
      },
      { 
        value: 'none', 
        label: 'None of these apply',
        scoring: { tier1: 2, tier2: 2, tier3: 0, tier4: 0, tier5: 0 }
      }
    ]
  },
  {
    id: 'q4',
    question: "How comfortable are you with legal paperwork and forms?",
    type: 'single',
    options: [
      { 
        value: 'very', 
        label: 'Very Comfortable',
        quote: '"I can handle this myself with guidance"',
        explainer: "I'm detail-oriented and comfortable navigating bureaucracy.",
        scoring: { tier1: 5, tier2: 3, tier3: 0, tier4: 0, tier5: 0 }
      },
      { 
        value: 'somewhat', 
        label: 'Somewhat Comfortable',
        quote: '"I\'d like step-by-step guidance"',
        explainer: "I can do paperwork but want to make sure I get it right.",
        scoring: { tier1: 0, tier2: 5, tier3: 3, tier4: 0, tier5: 0 }
      },
      { 
        value: 'not_really', 
        label: 'Not Very Comfortable',
        quote: '"I want help with the hard parts"',
        explainer: "Legal forms stress me out—I need hands-on support.",
        scoring: { tier1: 0, tier2: 0, tier3: 5, tier4: 3, tier5: 0 }
      },
      { 
        value: 'not_at_all', 
        label: 'Not At All Comfortable',
        quote: '"Please just do it for me"',
        explainer: "I'm overwhelmed and want someone else to handle it.",
        scoring: { tier1: 0, tier2: 0, tier3: 0, tier4: 5, tier5: 0 }
      }
    ]
  },
  {
    id: 'q5',
    question: "When did the death occur?",
    helperText: "This helps us understand timeline urgency. California requires probate filing within certain timeframes.",
    type: 'single',
    options: [
      { value: '0_30_days', label: 'Within the last 30 days', description: 'Recent loss—need to move quickly.' },
      { value: '31_90_days', label: '1-3 months ago', description: 'Getting started with probate process.' },
      { value: '90_plus', label: 'More than 3 months ago', description: 'Time-sensitive deadlines may be approaching.' }
    ]
  },
  {
    id: 'q6',
    question: "What's most important to you?",
    subtitle: "Rank these priorities (tap to move your top choice to the front)",
    type: 'rank',
    options: [
      { 
        value: 'cost', 
        label: '💰 Lowest cost possible',
        explainer: 'I want to minimize expenses, even if it takes more time.',
        scoring: { tier1: 3, tier2: 2, tier3: 0, tier4: 0, tier5: 0 }
      },
      { 
        value: 'speed', 
        label: '⚡ Getting it done quickly',
        explainer: 'Time is more important than cost.',
        scoring: { tier1: 0, tier2: 0, tier3: 3, tier4: 2, tier5: 0 }
      },
      { 
        value: 'accuracy', 
        label: '✓ Making sure it\'s done correctly',
        explainer: 'Accuracy and avoiding mistakes is my priority.',
        scoring: { tier1: 0, tier2: 0, tier3: 2, tier4: 3, tier5: 0 }
      },
      { 
        value: 'hands_off', 
        label: '🤝 Not having to think about it',
        explainer: 'I want someone else to handle the details.',
        scoring: { tier1: 0, tier2: 0, tier3: 0, tier4: 5, tier5: 0 }
      }
    ]
  },
  {
    id: 'q7',
    question: "What state did the deceased live in?",
    helperText: "We currently serve California, Florida, and Texas. We're expanding to 15 more states in 2025.",
    type: 'dropdown',
    options: [
      { value: 'California', label: 'California' },
      { value: 'Florida', label: 'Florida' },
      { value: 'Texas', label: 'Texas' },
      { value: 'Other', label: 'Other' }
    ],
    routing: (answers) => {
      if (answers.q7 === 'Other') {
        return 'WAITLIST';
      }
      return 'q8';
    }
  },
  {
    id: 'q8',
    question: "Where should we send your personalized plan?",
    type: 'form',
    options: []
  }
];
