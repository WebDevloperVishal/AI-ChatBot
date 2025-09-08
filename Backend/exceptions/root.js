
export class HttpException extends Error{
    constructor(message,errorCode,statusCode,errors){
        super(message)
        
        this.message = message
        this.statusCode = statusCode
        this.errors = errors
        this.errorCode = errorCode;
    }
}

//Error codes

export const ErrorCodes = {
  //add error codes here
   USER_NOT_FOUND: 1001,
    USER_ALREADY_EXISTS: 1002,
    ALL_FIELDS_REQUIRED: 1003,
    UNAUTHORIZED: 1004,
    INVALID_PASSWORD: 1005,
    PHONE_NUMBER_REQUIRED: 1006,
    PHONE_NUMBER_EXISTS: 1007,
    OTP_IS_MANDATORY: 1008,
    INVALID_OTP: 1009,
    INTERNAL_SERVER_ERROR: 2001,
    UNPROCESSABLE_ENTITY: 2002,
    TO_MANY_REQUESTS: 3001,
    MESSAGE_IS_REQUIRED:4001
};