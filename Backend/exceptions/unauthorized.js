
import { HttpException } from "./root.js";

export class UnauthorizedException extends HttpException{
    constructor(message,errorCode,statusCode,errors){
        super(message,errorCode,401,null)
    }
}