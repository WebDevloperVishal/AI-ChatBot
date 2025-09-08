import { HttpException } from "./root.js";

export class NotFoundException extends HttpException{
    constructor(message,errorCode,statusCode,errors){
        super(message,errorCode,404,null)
    }
}