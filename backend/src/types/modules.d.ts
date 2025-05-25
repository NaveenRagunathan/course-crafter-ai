// Type definitions for local modules
declare module '../controllers/courseController' {
  import { RequestHandler } from 'express';
  
  export const generateCourse: RequestHandler;
  export const exportCourse: RequestHandler;
}

declare module '../middleware/validation' {
  import { RequestHandler, ErrorRequestHandler } from 'express';
  import { ValidationChain } from 'express-validator';
  
  export const validate: RequestHandler;
  export const errorHandler: ErrorRequestHandler;
  export type { ValidationChain };
}

// Add type declarations for Node.js modules
declare module 'express-validator';
declare module 'mongoose';
declare module 'openai';
declare module 'fs-extra';
declare module 'path';
declare module 'cors';
declare module 'dotenv';
declare module 'http';
declare module 'https';
declare module 'helmet';
declare module 'compression';
declare module 'morgan';
