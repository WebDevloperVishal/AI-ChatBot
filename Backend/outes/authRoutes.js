import express from "express";
import {GetUserController, LoginController, OTPLoginController, OTPverifyLoginController, RegisterController,  } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ratelimiter } from "../middlewares/ratelimiter.js";
import { errorHandler } from "../error-handler.js";
 

const authRouter = express.Router();

authRouter.post('/register',errorHandler(RegisterController));
authRouter.post('/login',ratelimiter,errorHandler(LoginController));
authRouter.get("/getUser",authMiddleware,errorHandler(GetUserController));
authRouter.post('/otp-sent',ratelimiter,errorHandler(OTPLoginController));
authRouter.post('/otp-verify',authMiddleware,errorHandler(OTPverifyLoginController));


export default authRouter;