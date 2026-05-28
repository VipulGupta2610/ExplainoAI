import express from "express"
import { generateVideoController } from "../controllers/generatescrpt.controller.js";

const router = express.Router()

router.post("/GeneratePage/:userid" , generateVideoController)

export default router;