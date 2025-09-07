import { HttpException } from "./root.js";

export class BadRequestExecption extends HttpException{
    constructor (message, errorCode,statusCode,errors){
        super(message,errorCode,400,null)
    }
}