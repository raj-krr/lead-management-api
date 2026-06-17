import { Router } from "express";

import {
  createLead,
    getLeads,
    getLead,
    updateLead,
  deleteLead,
  getStats
} from "../controllers/lead.controller";

const router = Router();

router.post("/", createLead);
router.get("/stats", getStats);
router.get("/", getLeads);
router.get("/:id", getLead);
router.patch("/:id", updateLead);
router.delete("/:id", deleteLead);
export default router;