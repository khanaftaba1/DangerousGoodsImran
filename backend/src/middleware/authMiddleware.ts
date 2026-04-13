import { Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { getAccessTokenFromRequest } from '../utils/authCookies';
import type { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = getAccessTokenFromRequest(req);

  if (!token) {
    res.status(401).json({ success: false, error: 'Not authenticated' });
    return;
  }

  try {
    const { data: userData, error } = await supabase.auth.getUser(token);
    if (error || !userData.user) {
      res.status(401).json({ success: false, error: 'Invalid or expired session' });
      return;
    }
    req.user = { id: userData.user.id, email: userData.user.email || '' };
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Authentication failed' });
  }
}
