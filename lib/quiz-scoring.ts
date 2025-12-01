// Scoring algorithm for quiz recommendations

import { Tier, SpecialOutcome, QuizAnswer, QUIZ_QUESTIONS } from './quiz-data';

export interface ScoringResult {
  primary: Tier | SpecialOutcome;
  secondary: Tier | SpecialOutcome;
  scores: Record<Tier, number>;
  confidence: number;
  flags: string[];
}

export function calculateRecommendedTier(answers: Record<string, any>): ScoringResult {
  const scores: Record<Tier, number> = {
    tier1: 0,
    tier2: 0,
    tier3: 0,
    tier4: 0,
    tier5: 0
  };
  
  const flags: string[] = [];
  
  // Process each answer
  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === questionId);
    if (!question) return;
    
    // Handle multi-select
    if (Array.isArray(answerValue)) {
      const rankWeights = [4, 3, 2, 1]
      answerValue.forEach((value: string, index: number) => {
        const option = question.options.find((opt) => opt.value === value)
        if (option) {
          const weight = question.type === 'rank' ? rankWeights[index] ?? 1 : 1
          if (option.scoring) {
            Object.entries(option.scoring).forEach(([tier, points]) => {
              scores[tier as Tier] += points * weight
            })
          }
          if (option.flag) {
            flags.push(option.flag)
          }
        }
      })
    } else {
      // Handle single select
      const option = question.options.find(opt => opt.value === answerValue);
      if (option) {
        // Add scoring
        if (option.scoring) {
          Object.entries(option.scoring).forEach(([tier, points]) => {
            scores[tier as Tier] += points;
          });
        }
        // Collect flags
        if (option.flag) {
          flags.push(option.flag);
        }
      }
    }
  });
  
  // Apply special rules
  
  // Estate value over $2M heavily weights tier5
  if (answers.q1 === 'over_2m') {
    scores.tier5 += 10;
  }
  
  // Disputes disqualify DIY and heavily weight tier5
  const q3Answers = answers.q3 as string[] || [];
  if (q3Answers.includes('disputes')) {
    scores.tier1 = 0;
    scores.tier2 = 0;
    scores.tier5 += 15;
  }
  
  // Living trust triggers special outcome
  const q2Answers = answers.q2 as string[] || [];
  if (q2Answers.includes('living_trust')) {
    return {
      primary: 'PROBATE_AUDIT_UPSELL',
      secondary: 'tier3',
      scores,
      confidence: 1.0,
      flags
    };
  }
  
  // Check for attorney needed (disputes + high value)
  if (q3Answers.includes('disputes') && (answers.q1 === 'over_2m' || answers.q1 === '500k_to_2m')) {
    return {
      primary: 'ATTORNEY_NEEDED',
      secondary: 'tier5',
      scores,
      confidence: 1.0,
      flags
    };
  }
  
  // Find highest score
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0] as Tier;
  const secondary = sorted[1][0] as Tier;
  
  // Calculate confidence (0-1 scale)
  const primaryScore = sorted[0][1];
  const secondaryScore = sorted[1][1];
  const confidence = primaryScore / (primaryScore + secondaryScore + 1);
  
  return {
    primary,
    secondary,
    scores,
    confidence,
    flags
  };
}
