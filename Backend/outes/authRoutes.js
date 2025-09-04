import express from "express";
import { LoginController, RegisterController } from "../controllers/authController.js";
import { GetUserContoller } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/register',RegisterController);
authRouter.post('/login',LoginController);
authRouter.get("/getUser",GetUserContoller)


export default authRouter;