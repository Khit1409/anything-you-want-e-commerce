import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { CookieMap } from 'src/interfaces/cookies.interface';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const cookies = req.cookies as CookieMap;
    const sessionId = cookies.session_id;
    if (!sessionId) {
      const sessionId = randomUUID();
      res.cookie('session_id', sessionId, {
        httpOnly: true,
        sameSite: 'lax',
      });
    }
    req.sessionId = sessionId;
    next();
  }
}
