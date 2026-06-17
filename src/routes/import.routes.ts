import { Router } from "express";

import multer from "multer";

import { importLeads } from "../controllers/import.controller";

const router = Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/",
  upload.single("file"),
  importLeads
);

export default router;