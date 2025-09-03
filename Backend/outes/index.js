import express from "express";
import authRouter from "./authRoutes.js";

const rootRouter = express.Router();

rootRouter.use('/auth',authRouter)

export default rootRouter;