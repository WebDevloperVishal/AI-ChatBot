import { HttpException } from "./root.js";

export class UnprocessableEntityExecption extends HttpException{
    constructor (message, errorCode,statusCode,errors){
        super(message,errorCode,422,null)
    }
}