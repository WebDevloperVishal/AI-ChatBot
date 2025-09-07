import { HttpException } from "./root.js";

export class UnauthorizedExecption extends HttpException{
    constructor (message, errorCode,statusCode,errors){
        super(message,errorCode,401,null)
    }
}