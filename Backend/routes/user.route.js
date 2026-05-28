import express from "express"
import { creating_new_user, login } from "../controllers/user.controller.js"

const router = express.Router()

router.post("/signup" , creating_new_user)
router.post("/login" , login)

export default router