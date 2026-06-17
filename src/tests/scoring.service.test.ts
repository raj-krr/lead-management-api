import { ScoringService } from "../services/scoring.service";

describe("Budget Fit", () => {
  test("below lower limit", () => {
    expect(
      ScoringService.calculateBudgetFit(
        2000000
      )
    ).toBe(0);
  });

  test("within preferred range", () => {
    expect(
      ScoringService.calculateBudgetFit(
        10000000
      )
    ).toBe(100);
  });

  test("null budget", () => {
    expect(
      ScoringService.calculateBudgetFit(
        null
      )
    ).toBe(50);
  });
});

describe("Source Quality", () => {
  test("Referral", () => {
    expect(
      ScoringService.calculateSourceQuality(
        "Referral"
      )
    ).toBe(100);
  });

  test("Unknown Source", () => {
    expect(
      ScoringService.calculateSourceQuality(
        "XYZ"
      )
    ).toBe(40);
  });
});

describe("Budget Edge Cases", () => {
  test("lower limit", () => {
    expect(
      ScoringService.calculateBudgetFit(2500000)
    ).toBe(0);
  });

  test("preferred min", () => {
    expect(
      ScoringService.calculateBudgetFit(5000000)
    ).toBe(100);
  });

  test("preferred max", () => {
    expect(
      ScoringService.calculateBudgetFit(20000000)
    ).toBe(100);
  });

  test("upper limit", () => {
    expect(
      ScoringService.calculateBudgetFit(30000000)
    ).toBe(0);
  });
});