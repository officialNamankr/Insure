import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError{
    statusCode = 404;
    constructor(public message: string){
        super("Route not found");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(){
        return [
            {
                message: "Not Found"
            }
        ]
    }
}