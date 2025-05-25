import { ValidationChain } from 'express-validator';

declare module 'express-validator' {
  export function body(field: string, message?: string): ValidationChain;
  export function param(field: string, message?: string): ValidationChain;
  export function query(field: string, message?: string): ValidationChain;
}
