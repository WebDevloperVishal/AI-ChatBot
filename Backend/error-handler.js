import { ZodError } from "zod";
import { ErrorCodes, HttpException } from "./exceptions/root.js";
import { UnprocessableEntityException } from "./exceptions/unprocessable-entity.js";
import { InternalServerErrorException } from "./exceptions/internal-error.js";

export const errorHandler = (method) => {
  return async (req, res, next) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception;
      if (error instanceof HttpException) {
        exception = error;
      } else if (error instanceof ZodError) {
        exception = new UnprocessableEntityException(
          "Unprocessable Entity",
          ErrorCodes.UNPROCESSABLE_ENTITY,
          error.errors
        );
      } else {
        exception = new InternalServerErrorException(
          "Internal Server Error",
          ErrorCodes.INTERNAL_SERVER_ERROR
        );
      }
      next(exception);
    }
  };
};

//global error handler

export const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      status: false,
      message: err.message || "Internal Server Error",
      errorCode : err.errorCode || null,
      errors : err.errors || null
    });
}