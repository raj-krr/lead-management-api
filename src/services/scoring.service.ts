import { SCORE_CONFIG } from "../config/scoring";

export class ScoringService {
  static calculateBudgetFit(
    budget: number | null | undefined
  ): number {
    if (budget == null) return 50;

    const {
      preferredMin,
      preferredMax,
      lowerLimit,
      upperLimit,
    } = SCORE_CONFIG.budget;

    if (
      budget >= preferredMin &&
      budget <= preferredMax
    ) {
      return 100;
    }

    if (
      budget < lowerLimit ||
      budget > upperLimit
    ) {
      return 0;
    }

    if (budget < preferredMin) {
      return Math.round(
        ((budget - lowerLimit) /
          (preferredMin - lowerLimit)) *
          100
      );
    }

    return Math.round(
      ((upperLimit - budget) /
        (upperLimit - preferredMax)) *
        100
    );
  }

  static calculateEngagement(
    inquiryDate: Date,
    message?: string
  ): number {
    const now = new Date();

    const diffDays = Math.floor(
      (now.getTime() - inquiryDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    let recencyScore = 0;

    if (diffDays <= 7) {
      recencyScore = 80;
    } else if (diffDays <= 60) {
      recencyScore =
        80 *
        (1 - (diffDays - 7) / 53);
    }

    const messageBonus =
      message?.trim() ? 20 : 0;

    return Math.min(
      100,
      Math.round(recencyScore + messageBonus)
    );
  }

  static calculateSourceQuality(
    source: string
  ): number {
    return (
      SCORE_CONFIG.sourceQuality[
        source as keyof typeof SCORE_CONFIG.sourceQuality
      ] ?? 40
    );
  }

  static calculateFinalScore(
    budget: number | null | undefined,
    inquiryDate: Date,
    source: string,
    message?: string
  ): number {
    const budgetFit =
      this.calculateBudgetFit(budget);

    const engagement =
      this.calculateEngagement(
        inquiryDate,
        message
      );

    const sourceQuality =
      this.calculateSourceQuality(source);

    const score =
      budgetFit *
        SCORE_CONFIG.weights.budgetFit +
      engagement *
        SCORE_CONFIG.weights.engagement +
      sourceQuality *
        SCORE_CONFIG.weights.sourceQuality;

    return Math.max(
      0,
      Math.min(100, Math.round(score))
    );
  }
}