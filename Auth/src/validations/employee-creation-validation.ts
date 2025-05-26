import { body } from 'express-validator';

export const employeeCreationValidations = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid')
        .notEmpty()
        .withMessage('Email is required'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .notEmpty()
        .withMessage('Password is required'),
    body('mobile')
        .isString()
        .withMessage('Mobile must be a string')
        .notEmpty()
        .withMessage('Mobile is required'),
    body('employeeType')
        .isIn(['Permanent', 'Contract'])
        .withMessage('Employee type must be either "Permanent" or "Contract"')
        .notEmpty()
        .withMessage('Employee type is required')
];