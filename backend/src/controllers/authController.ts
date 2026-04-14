import { Request, Response } from 'express';
import type { User } from '@supabase/supabase-js';
import { supabase, supabaseAuth } from '../config/supabase';
import {
  clearSessionCookies,
  setSessionCookies,
  REFRESH_TOKEN_COOKIE,
  getAccessTokenFromRequest,
} from '../utils/authCookies';
import { getPrimaryFrontendUrl } from '../config/frontendUrl';

type OAuthProvider = 'google' | 'linkedin_oidc';

function sessionFromResponse(
  res: Response,
  session: {
    access_token: string;
    refresh_token: string;
    expires_in?: number;
  } | null
): boolean {
  if (!session?.access_token || !session?.refresh_token) return false;
  setSessionCookies(
    res,
    session.access_token,
    session.refresh_token,
    session.expires_in ?? 3600
  );
  return true;
}

/** Lets the SPA store tokens when httpOnly cookies are blocked cross-origin. */
function sessionForClient(session: {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}) {
  return {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_in: session.expires_in ?? 3600,
  };
}

export async function signUp(req: Request, res: Response): Promise<void> {
  const { email, password, fullName } = req.body as {
    email?: string;
    password?: string;
    fullName?: string;
  };

  if (!email || !password) {
    res.status(400).json({ success: false, error: 'Email and password are required' });
    return;
  }

  const { data, error } = await supabaseAuth.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName ?? '' },
    },
  });

  if (error) {
    res.status(400).json({ success: false, error: error.message });
    return;
  }

  if (data.session && sessionFromResponse(res, data.session)) {
    await ensureProfileRow(data.user!);
    res.json({
      success: true,
      data: {
        user: { id: data.user!.id, email: data.user!.email },
        needsEmailConfirmation: false,
        session: sessionForClient(data.session),
      },
    });
    return;
  }

  res.json({
    success: true,
    data: {
      user: data.user ? { id: data.user.id, email: data.user.email } : null,
      needsEmailConfirmation: true,
    },
  });
}

export async function signIn(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ success: false, error: 'Email and password are required' });
    return;
  }

  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    res.status(401).json({
      success: false,
      error: error?.message ?? 'Invalid credentials',
    });
    return;
  }

  sessionFromResponse(res, data.session);
  await ensureProfileRow(data.user);

  res.json({
    success: true,
    data: {
      user: { id: data.user.id, email: data.user.email },
    },
  });
}

export async function signOut(_req: Request, res: Response): Promise<void> {
  clearSessionCookies(res);
  res.json({ success: true, data: null });
}

export async function refreshSession(req: Request, res: Response): Promise<void> {
  const body = req.body as { refresh_token?: string } | undefined;
  const refreshToken =
    body?.refresh_token ||
    (req.cookies?.[REFRESH_TOKEN_COOKIE] as string | undefined);

  if (!refreshToken) {
    res.status(401).json({ success: false, error: 'No refresh token' });
    return;
  }

  const { data, error } = await supabaseAuth.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (error || !data.session) {
    clearSessionCookies(res);
    res.status(401).json({
      success: false,
      error: error?.message ?? 'Session expired',
    });
    return;
  }

  sessionFromResponse(res, data.session);
  res.json({
    success: true,
    data: {
      user: { id: data.session.user.id, email: data.session.user.email },
      session: sessionForClient(data.session),
    },
  });
}

/** After OAuth (browser): hand tokens to httpOnly cookies. */
export async function syncSession(req: Request, res: Response): Promise<void> {
  const { access_token, refresh_token } = req.body as {
    access_token?: string;
    refresh_token?: string;
  };

  if (!access_token || !refresh_token) {
    res.status(400).json({ success: false, error: 'Missing tokens' });
    return;
  }

  const { data, error } = await supabase.auth.getUser(access_token);

  if (error || !data.user) {
    res.status(401).json({ success: false, error: 'Invalid access token' });
    return;
  }

  setSessionCookies(res, access_token, refresh_token, 3600);
  await ensureProfileRow(data.user);

  res.json({
    success: true,
    data: {
      user: { id: data.user.id, email: data.user.email },
      session: sessionForClient({
        access_token,
        refresh_token,
        expires_in: 3600,
      }),
    },
  });
}

export async function getOAuthUrl(req: Request, res: Response): Promise<void> {
  const raw = req.query.provider as string | undefined;
  const provider = raw as OAuthProvider | undefined;

  if (provider !== 'google' && provider !== 'linkedin_oidc') {
    res.status(400).json({
      success: false,
      error: 'provider must be google or linkedin_oidc',
    });
    return;
  }

  const { data, error } = await supabaseAuth.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${getPrimaryFrontendUrl()}/auth/callback`,
      skipBrowserRedirect: true,
    },
  });

  if (error || !data.url) {
    res.status(500).json({
      success: false,
      error: error?.message ?? 'Could not start OAuth',
    });
    return;
  }

  res.json({ success: true, data: { url: data.url } });
}

export async function getMe(req: Request, res: Response): Promise<void> {
  const accessToken = getAccessTokenFromRequest(req);

  if (!accessToken) {
    res.status(200).json({ success: true, data: { user: null, profile: null } });
    return;
  }

  const { data: userData, error: userErr } = await supabase.auth.getUser(accessToken);

  if (userErr || !userData.user) {
    clearSessionCookies(res);
    res.status(200).json({ success: true, data: { user: null, profile: null } });
    return;
  }

  await ensureProfileRow(userData.user);

  const { data: profileRow, error: profileErr } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userData.user.id)
    .single();

  if (profileErr) {
    res.status(500).json({ success: false, error: profileErr.message });
    return;
  }

  res.json({
    success: true,
    data: {
      user: { id: userData.user.id, email: userData.user.email },
      profile: profileRow,
    },
  });
}

/** Maps OAuth / email signup metadata into `profiles` columns. */
function profileFieldsFromAuthUser(user: User): {
  full_name?: string;
  avatar_url?: string;
} {
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  if (!meta) return {};

  let fullName: string | undefined;
  if (typeof meta.full_name === 'string' && meta.full_name.trim()) {
    fullName = meta.full_name.trim();
  } else if (typeof meta.name === 'string' && meta.name.trim()) {
    fullName = meta.name.trim();
  }

  let avatarUrl: string | undefined;
  if (typeof meta.avatar_url === 'string' && meta.avatar_url.trim()) {
    avatarUrl = meta.avatar_url.trim();
  } else if (typeof meta.picture === 'string' && meta.picture.trim()) {
    avatarUrl = meta.picture.trim();
  }

  return {
    ...(fullName && { full_name: fullName }),
    ...(avatarUrl && { avatar_url: avatarUrl }),
  };
}

async function ensureProfileRow(user: User): Promise<void> {
  const fromAuth = profileFieldsFromAuthUser(user);

  const { data: existing } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .maybeSingle();

  const nameEmpty = !existing || !String(existing.full_name ?? '').trim();
  const avatarEmpty = !existing || !String(existing.avatar_url ?? '').trim();

  const shouldSetName = Boolean(fromAuth.full_name) && nameEmpty;
  const shouldSetAvatar = Boolean(fromAuth.avatar_url) && avatarEmpty;

  const row: Record<string, string> = {
    id: user.id,
    updated_at: new Date().toISOString(),
    ...(user.email ? { email: user.email } : {}),
    ...(shouldSetName && fromAuth.full_name ? { full_name: fromAuth.full_name } : {}),
    ...(shouldSetAvatar && fromAuth.avatar_url ? { avatar_url: fromAuth.avatar_url } : {}),
  };

  const { error } = await supabase.from('profiles').upsert(row, {
    onConflict: 'id',
  });
  if (error && !String(error.message).includes('duplicate')) {
    console.warn('[auth] ensureProfileRow:', error.message);
  }
}
