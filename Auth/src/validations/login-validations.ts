import {body} from "express-validator";

export const loginValidations = [
    body("email").isEmail().withMessage("Email is required"),
    body("password").isString().withMessage("Password is required")
];