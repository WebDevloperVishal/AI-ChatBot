import express from "express";
import { RegisterController } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/register',RegisterController)


export default authRouter;