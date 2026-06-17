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
  const score =
    ScoringService.calculateFinalScore(
      data.budgetInr,
      new Date(data.inquiryDate),
      data.source,
      data.message
    );

  return LeadRepository.update(id, {
    ...data,
    inquiryDate: new Date(data.inquiryDate),
    score,
  });
}
}