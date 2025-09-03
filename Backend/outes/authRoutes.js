import express from "express";
import { LoginController, RegisterController } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/register',RegisterController);
authRouter.post('/login',LoginController);


export default authRouter;