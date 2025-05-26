import {body} from "express-validator";

export const salesManagerCreationValidation = [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be valid').notEmpty().withMessage('Email is required'),
    body('password').isString().withMessage('Password must be a string').notEmpty().withMessage('Password is required'),
    body('mobile').isString().withMessage('Mobile must be a string').notEmpty().withMessage('Mobile is required'),
    body('branch').isString().withMessage('Branch must be a string').notEmpty().withMessage('Branch is required'),
];