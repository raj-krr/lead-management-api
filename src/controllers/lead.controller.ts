import { Request, Response } from "express";
import { LeadService } from "../services/lead.service";

export const createLead = async (
  req: Request,
  res: Response
) => {
try {
  const lead = await LeadService.createLead(req.body);

  res.status(201).json({
    success: true,
    data: lead,
  });

} catch (error: any) {

  if (error.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "Lead with this email already exists",
    });
  }

  throw error;
}
};

export const getLeads = async (
  req: Request,
  res: Response
) => {

  const leads =
    await LeadService.getLeads(
      req.query
    );

  res.status(200).json({
    success: true,
    data: leads,
  });
};

export const getLead = async (
  req: Request,
  res: Response
) => {
  const lead = await LeadService.getLead(
    Number(req.params.id)
  );

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  res.status(200).json({
    success: true,
    data: lead,
  });
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  const lead =
    await LeadService.updateLead(
      Number(req.params.id),
      req.body
    );

  res.status(200).json({
    success: true,
    data: lead,
  });
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  await LeadService.deleteLead(
    Number(req.params.id)
  );

  res.status(200).json({
    success: true,
    message: "Lead deleted",
  });
};

export const getStats = async (
  req: Request,
  res: Response
) => {

  const stats =
    await LeadService.getStats();

  res.status(200).json({
    success: true,
    data: stats
  });
};