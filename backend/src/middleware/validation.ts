import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    message: string;
    field?: string;
  }>;
}

/**
 * Validates the request against the defined validation rules
 */
export const validate: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const response: ApiError = {
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err: any) => ({
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
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);
  
  const statusCode = (err as any).statusCode || 500;
  const errorMessage = process.env.NODE_ENV === 'development' 
    ? err.message 
    : 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Export types for use in other files
export type { ValidationChain };
