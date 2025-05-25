import { RequestHandler, ErrorRequestHandler } from 'express';
import { ValidationChain } from 'express-validator';

export declare const validate: RequestHandler;
export declare const errorHandler: ErrorRequestHandler;
export type { ValidationChain };
