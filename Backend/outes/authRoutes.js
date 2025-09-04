import express from "express";
import { GetUserContoller, LoginController, RegisterController, } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/register',RegisterController);
authRouter.post('/login',LoginController);
authRouter.get("/getUser",authMiddleware,GetUserContoller)


export default authRouter;