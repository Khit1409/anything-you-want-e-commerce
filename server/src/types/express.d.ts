import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId: string;
    role: 'user' | 'seller';
    email: string;
  }
}
