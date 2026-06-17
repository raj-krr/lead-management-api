import { LeadRepository } from "../repositories/lead.repository";
import { ScoringService } from "./scoring.service";

export class LeadService {
 static async createLead(data: any) {
  const score =
    ScoringService.calculateFinalScore(
      data.budgetInr,
      new Date(data.inquiryDate),
      data.source,
      data.message
    );

  return LeadRepository.create({
    ...data,
    inquiryDate: new Date(data.inquiryDate),
    score,
  });
}

  static async getStats() {
  return LeadRepository.getStats();
  }
  
  static async getLead(id: number) {
    return LeadRepository.findById(id);
  }

  static async getLeads(query: any) {
  return LeadRepository.findAll(query);
}

  static async deleteLead(id: number) {
    return LeadRepository.delete(id);
  }
  
static async updateLead(
  id: number,
  data: any
) {

  const existing =
    await LeadRepository.findById(id);

  if (!existing) {
    throw new Error("Lead not found");
  }

  const budget =
    data.budgetInr ??
    existing.budgetInr;

  const source =
    data.source ??
    existing.source;

  const inquiryDate =
    data.inquiryDate
      ? new Date(data.inquiryDate)
      : existing.inquiryDate;

  const message =
    data.message ??
    existing.message;

  const score =
    ScoringService.calculateFinalScore(
      budget,
      inquiryDate,
      source,
      message
    );

  return LeadRepository.update(id, {
    ...data,
    score,
    inquiryDate,
  });
}
}