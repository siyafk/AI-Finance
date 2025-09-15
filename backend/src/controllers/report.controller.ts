import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  generateReportService,
  getAllReportService,
  updateReportSettingService,
} from "../services/report.service";
import { updateTransactionSchema } from "../validators/transaction.validator";
import { updateReportSettingSchema } from "../validators/report.validator";

export const getAllReportController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 20,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    const reports = await getAllReportService(userId, pagination);

    return res.status(HTTPSTATUS.OK).json({
      message: "Reports fetched successfully",
      ...reports,
    });
  }
);

export const updateReportSettingController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = updateReportSettingSchema.parse(req.body);

    await updateReportSettingService(userId, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Update report settings successfully",
    });
  }
);

export const generateReportController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { from, to } = req.query;
    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const result = await generateReportService(userId, fromDate, toDate);

    return res.status(HTTPSTATUS.OK).json({
      message: "Report generated successfully",
      ...result,
    });
  }
);
