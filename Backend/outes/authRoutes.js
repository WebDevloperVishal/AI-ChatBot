import express from "express";
import {GetUserController, LoginController, OTPLoginContoller, RegisterController, OTPverifyLoginContoller } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
 

const authRouter = express.Router();

authRouter.post('/register',RegisterController);
authRouter.post('/login',LoginController);
authRouter.get("/getUser",authMiddleware,GetUserController)
authRouter.post('/otp-sent',OTPLoginContoller);
authRouter.post('/otp-verify',authMiddleware,OTPverifyLoginContoller);


export default authRouter;