import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(10),
  source: z.enum([
    "Referral",
    "Google",
    "Facebook",
    "WalkIn",
    "Other",
  ]),
  budgetInr: z.number().optional().nullable(),
  location: z.string(),
  propertyType: z.string(),
  inquiryDate: z.string(),
  message: z.string().optional(),
  status: z.enum([
    "new",
    "contacted",
    "qualified",
    "negotiating",
    "closed",
  ]),
});