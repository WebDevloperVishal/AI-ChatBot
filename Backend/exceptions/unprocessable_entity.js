
import { HttpException } from "./root.js";

export class UnprocessableEntityException extends HttpException{
    constructor(message,errorCode,statusCode,errors){
        super(message,errorCode,422,null)
    }
}