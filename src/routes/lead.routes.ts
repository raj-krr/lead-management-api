import { Router } from "express";

import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  getStats
} from "../controllers/lead.controller";

import { validate } from "../middleware/validate.middleware";
import { createLeadSchema } from "../validators/lead.validator";

const router = Router();

router.post(
  "/",
  validate(createLeadSchema),
  createLead
);

router.get("/stats", getStats);

router.get("/", getLeads);

router.get("/:id", getLead);

router.patch("/:id", updateLead);

router.delete("/:id", deleteLead);

export default router;