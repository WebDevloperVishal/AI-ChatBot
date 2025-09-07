import express from "express";
import {GetUserController, LoginController, OTPLoginController, OTPverifyLoginController, RegisterController,  } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ratelimiter } from "../middlewares/ratelimiter.js";
 

const authRouter = express.Router();

authRouter.post('/register',RegisterController);
authRouter.post('/login',ratelimiter,LoginController);
authRouter.get("/getUser",ratelimiter,authMiddleware,GetUserController)
authRouter.post('/otp-sent',ratelimiter,OTPLoginController);
authRouter.post('/otp-verify',authMiddleware,OTPverifyLoginController);


export default authRouter;