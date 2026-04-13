import { Router } from 'express';
import {
  getMe,
  getOAuthUrl,
  refreshSession,
  signIn,
  signOut,
  signUp,
  syncSession,
} from '../controllers/authController';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.post('/refresh', refreshSession);
router.post('/sync', syncSession);
router.get('/oauth-url', getOAuthUrl);
router.get('/me', getMe);

export default router;
