import { HttpException } from "./root.js";

export class NotFoundExecption extends HttpException{
    constructor (message, errorCode,statusCode,errors){
        super(message,errorCode,404,null)
    }
}