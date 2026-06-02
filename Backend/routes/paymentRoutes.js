// routes/paymentRoutes.js

import express from "express";

import { checkout } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", checkout);

export default router;