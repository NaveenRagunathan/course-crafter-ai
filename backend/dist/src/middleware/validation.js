import { validationResult } from 'express-validator';
/**
 * Validates the request against the defined validation rules
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = {
            success: false,
            message: 'Validation failed',
            errors: errors.array().map((err) => ({
                message: err.msg || 'Validation error',
                field: err.param || 'unknown'
            }))
        };
        return res.status(400).json(response);
    }
    next();
};
/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    const statusCode = err.statusCode || 500;
    const errorMessage = process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong';
    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
