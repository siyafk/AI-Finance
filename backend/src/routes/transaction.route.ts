import { Router } from "express";
import {
  bulkDeleteTransactionsController,
  bulkTransactionController,
  createTransactionController,
  deleteTransactionController,
  duplilcateTransactionController,
  getAllTransactionController,
  getTransactionByIdController,
  scanReceiptController,
  updateTransactionController,
} from "../controllers/transaction.controller";
import { upload } from "../config/cloudinary.config";

const transactionRoutes = Router();

transactionRoutes.post("/create", createTransactionController);

transactionRoutes.post("/bulk-transaction", bulkTransactionController);

transactionRoutes.post("/scan-receipt" , upload.single("receipt"), scanReceiptController);

transactionRoutes.put("/duplicate/:id", duplilcateTransactionController);
transactionRoutes.delete("/update/:id", updateTransactionController);

transactionRoutes.get("/all", getAllTransactionController);
transactionRoutes.get("/:id", getTransactionByIdController);
transactionRoutes.put("/delete/:id", deleteTransactionController);

transactionRoutes.delete("/bulk/delete/:id", bulkDeleteTransactionsController);

export default transactionRoutes;
