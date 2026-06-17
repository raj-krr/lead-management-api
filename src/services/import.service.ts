import { parseCSV } from "../utils/csvParser";
import prisma from "../config/prisma";
import { ScoringService } from "./scoring.service";

export class ImportService {
  static async importLeads(
    filePath: string
  ) {
    const rows =
      await parseCSV(filePath);

    let success = 0;
    let failed = 0;

    for (const row of rows) {
      try {
        const sourceMap: any = {
          "Walk-in": "WalkIn",
        };

        const source =
          sourceMap[row.source] ||
          row.source;

        const score =
          ScoringService.calculateFinalScore(
            Number(row.budget_inr),
            new Date(row.inquiry_date),
            source,
            row.message
          );

        await prisma.lead.create({
          data: {
            name: row.name,
            email: row.email,
            phone: row.phone,
            source,
            budgetInr: Number(
              row.budget_inr
            ),
            location: row.location,
            propertyType:
              row.property_type,
            inquiryDate: new Date(
              row.inquiry_date
            ),
            message: row.message,
            status: row.status,
            score,
          },
        });

        success++;
      } catch (error) {
        failed++;
      }
    }

    return {
      total: rows.length,
      success,
      failed,
    };
  }
}