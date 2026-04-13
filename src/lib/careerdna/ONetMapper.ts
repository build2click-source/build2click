import { RawPsychometricScores } from "./types";

/**
 * Maps O*NET data into the Career DNA 14-dimensional psychometric vector.
 */
export class ONetMapper {
  
  private static scale100to5(score: number): number {
    return Math.round((score / 100) * 5 * 10) / 10;
  }

  private static scaleTo5(score: number): number {
    return Math.round(((score - 1) / 6) * 5 * 10) / 10;
  }

  private static autoScaleTo5(score: number): number {
     return score <= 7 ? this.scaleTo5(score) : this.scale100to5(score);
  }

  static mapToVector(interests: any, workStyles: any, abilities: any): RawPsychometricScores {
    const scores: RawPsychometricScores = {
      extraversion: 2.5,
      agreeableness: 2.5,
      conscientiousness: 2.5,
      neuroticism: 2.5,
      openness: 2.5,
      realistic: 0,
      investigative: 0,
      artistic: 0,
      social: 0,
      enterprising: 0,
      conventional: 0,
      numericalReasoning: 0.5,
      verbalReasoning: 0.5,
      logicalReasoning: 0.5,
    };

    const interestArr = interests?.element || interests?.interests || [];
    for (const i of interestArr) {
      let val = i.occupational_interest ?? i.score ?? 50; 
      const score = this.autoScaleTo5(val);
      const code = i.interest_code || (i.name ? i.name.charAt(0).toUpperCase() : "X");
      
      switch (code) {
        case 'R': scores.realistic = score; break;
        case 'I': scores.investigative = score; break;
        case 'A': scores.artistic = score; break;
        case 'S': scores.social = score; break;
        case 'E': scores.enterprising = score; break;
        case 'C': scores.conventional = score; break;
      }
    }

    const workStylesArr = workStyles?.element || workStyles?.work_styles || [];
    const getS = (name: string) => {
      const found = workStylesArr.find((s: any) => s.name === name);
      if (!found) return 3.5;
      let val = found.importance ?? found.score ?? 50;
      return this.autoScaleTo5(val);
    };

    scores.extraversion = Math.round((getS('Social Orientation') + getS('Independence')) / 2 * 10) / 10;
    scores.agreeableness = Math.round((getS('Cooperation') + getS('Concern for Others')) / 2 * 10) / 10;
    scores.conscientiousness = Math.round((getS('Attention to Detail') + getS('Dependability') + getS('Integrity')) / 3 * 10) / 10;
    const stability = (getS('Stress Tolerance') + getS('Self Control')) / 2;
    scores.neuroticism = Math.round((5 - stability) * 10) / 10;
    scores.openness = Math.round((getS('Innovation') + getS('Analytical Thinking')) / 2 * 10) / 10;

    const abilitiesArr = abilities?.element || abilities?.ability || [];
    const findA = (name: string) => {
      const found = abilitiesArr.find((a: any) => a.name === name);
      if (!found) return 0.5;
      let val = found.importance ?? found?.score?.value ?? found?.score ?? 50;
      return val <= 7 ? (val / 7) : (val / 100);
    };

    scores.numericalReasoning = Math.round(findA('Mathematical Reasoning') * 10) / 10;
    scores.verbalReasoning = Math.round(((findA('Oral Comprehension') + findA('Written Comprehension')) / 2) * 10) / 10;
    scores.logicalReasoning = Math.round(findA('Deductive Reasoning') * 10) / 10;

    return scores;
  }

  static toTargetVector(scores: RawPsychometricScores): number[] {
    return [
      scores.extraversion,
      scores.agreeableness,
      scores.conscientiousness,
      scores.neuroticism,
      scores.openness,
      scores.realistic,
      scores.investigative,
      scores.artistic,
      scores.social,
      scores.enterprising,
      scores.conventional,
      scores.numericalReasoning * 5,
      scores.verbalReasoning * 5,
      scores.logicalReasoning * 5,
    ];
  }
}
