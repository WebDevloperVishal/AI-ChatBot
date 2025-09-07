
import { HttpException } from "./root.js";

export class InternalServerErrorException extends HttpException{
    constructor(message,errorCode,statusCode,errors){
        super(message,errorCode,500,null)
    }
}