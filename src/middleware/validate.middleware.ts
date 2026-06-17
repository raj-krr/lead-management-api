import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(422).json({
        success: false,
        errors: result.error.flatten(),
      });
    }

    next();
  };