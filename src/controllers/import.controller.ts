import { Request, Response } from "express";

import { ImportService } from "../services/import.service";

export const importLeads = async (
  req: Request,
  res: Response
) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "CSV file required",
    });
  }

  const result =
    await ImportService.importLeads(
      req.file.path
    );

  return res.status(200).json({
    success: true,
    data: result,
  });
};