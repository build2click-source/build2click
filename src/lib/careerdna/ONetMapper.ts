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

  static mapToVector(interests: any, workStyles: any, abilities: any, workValues?: any): RawPsychometricScores {
    const scores: RawPsychometricScores = {
      extraversion: 2.5, agreeableness: 2.5, conscientiousness: 2.5, neuroticism: 2.5, openness: 2.5,
      realistic: 0, investigative: 0, artistic: 0, social: 0, enterprising: 0, conventional: 0,
      numericalReasoning: 0.5, verbalReasoning: 0.5, logicalReasoning: 0.5,
      stability: 2.5, materialReward: 2.5, learning: 2.5, creativity: 2.5, altruism: 2.5,
      influence: 2.5, recognition: 2.5, autonomy: 2.5, teamwork: 2.5, intellectualChallenge: 2.5,
      leadership: 2.5, conflictResolution: 2.5, teamDynamics: 2.5, integrity: 2.5, professionalism: 2.5,
      accountability: 2.5, clientManagement: 2.5, decisionMaking: 2.5, resilience: 2.5, timeManagement: 2.5,
      collaboration: 2.5, learningAgility: 2.5, proactivity: 2.5, prioritization: 2.5, stakeholderManagement: 2.5,
      communication: 2.5, selfAwareness: 2.5, vark: 2.5
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
    const stabilityScore = (getS('Stress Tolerance') + getS('Self Control')) / 2;
    scores.neuroticism = Math.round((5 - stabilityScore) * 10) / 10;
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

    const workValuesArr = workValues?.element || workValues?.work_values || [];
    const getV = (name: string) => {
      const found = workValuesArr.find((s: any) => s.name === name);
      if (!found) return 3.0; // Moderate default for unmapped values
      let val = found.importance ?? found.score ?? 50;
      return this.autoScaleTo5(val);
    };

    // Values Mapping
    scores.stability = Math.round((getV('Working Conditions') + getV('Support')) / 2 * 10) / 10;
    scores.materialReward = Math.round((getV('Working Conditions') + getV('Achievement') + getV('Support')) / 3 * 10) / 10;
    scores.learning = Math.round((getV('Achievement') + getS('Innovation')) / 2 * 10) / 10;
    scores.creativity = Math.round((getV('Independence') + getS('Innovation')) / 2 * 10) / 10;
    scores.altruism = Math.round((getV('Relationships') + getS('Concern for Others')) / 2 * 10) / 10;
    scores.influence = Math.round((getV('Recognition') + getS('Leadership')) / 2 * 10) / 10;
    scores.recognition = getV('Recognition');
    scores.autonomy = getV('Independence');
    scores.teamwork = Math.round((getV('Relationships') + getS('Cooperation')) / 2 * 10) / 10;
    scores.intellectualChallenge = Math.round((getV('Achievement') + getS('Analytical Thinking')) / 2 * 10) / 10;

    // SJT Mapping
    scores.leadership = getS('Leadership');
    scores.conflictResolution = getS('Cooperation');
    scores.teamDynamics = Math.round((getS('Cooperation') + getV('Relationships')) / 2 * 10) / 10;
    scores.integrity = getS('Integrity');
    scores.professionalism = getS('Dependability');
    scores.accountability = getS('Dependability');
    scores.clientManagement = getS('Concern for Others');
    scores.decisionMaking = getS('Analytical Thinking');
    scores.resilience = getS('Stress Tolerance');
    scores.timeManagement = Math.round((getS('Dependability') + getS('Attention to Detail')) / 2 * 10) / 10;
    scores.collaboration = getS('Cooperation');
    const agility = getS('Adaptability/Flexibility') || getS('Innovation');
    scores.learningAgility = Math.round((getS('Innovation') + agility) / 2 * 10) / 10;
    scores.proactivity = getS('Initiative');
    scores.prioritization = Math.round((getS('Analytical Thinking') + getS('Attention to Detail')) / 2 * 10) / 10;
    scores.stakeholderManagement = Math.round((getS('Concern for Others') + getS('Social Orientation')) / 2 * 10) / 10;
    scores.communication = getS('Social Orientation');
    scores.selfAwareness = getS('Self Control');

    return scores;
  }

  static toTargetVector(scores: RawPsychometricScores): number[] {
    return [
      scores.extraversion, scores.agreeableness, scores.conscientiousness, scores.neuroticism, scores.openness,
      scores.realistic, scores.investigative, scores.artistic, scores.social, scores.enterprising, scores.conventional,
      scores.numericalReasoning * 5, scores.verbalReasoning * 5, scores.logicalReasoning * 5,
      // Values
      scores.stability, scores.materialReward, scores.learning, scores.creativity, scores.altruism,
      scores.influence, scores.recognition, scores.autonomy, scores.teamwork, scores.intellectualChallenge,
      // SJT
      scores.leadership, scores.conflictResolution, scores.teamDynamics, scores.integrity, scores.professionalism,
      scores.accountability, scores.clientManagement, scores.decisionMaking, scores.resilience, scores.timeManagement,
      scores.collaboration, scores.learningAgility, scores.proactivity, scores.prioritization, scores.stakeholderManagement,
      scores.communication, scores.selfAwareness,
      // VARK
      scores.vark
    ];
  }
}
