import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    sessionId?: string;
    userId: string;
    role: 'user' | 'seller';
    email: string;
  }
}
