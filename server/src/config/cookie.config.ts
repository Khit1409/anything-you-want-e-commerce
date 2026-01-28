import type { CookieOptions } from 'express';

export const authCookieConfig: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax', // QUAN TRỌNG
  secure: false, // localhost => false
  path: '/',
  maxAge: 1000 * 60 * 60,
};
