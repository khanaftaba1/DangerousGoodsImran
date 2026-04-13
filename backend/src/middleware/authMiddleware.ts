import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ success: false, error: 'Not authenticated' });
    return;
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      res.status(401).json({ success: false, error: 'Invalid token' });
      return;
    }
    req.user = { id: user.id, email: user.email || '' };
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Authentication failed' });
  }
}
