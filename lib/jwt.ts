import jwt from 'jsonwebtoken';

const JWT_ACCESS_MAX_AGE = 300;
const JWT_REFRESH_MAX_AGE = 86400;

type CookieOptions = {
  httpOnly: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  secure: boolean;
  maxAge: number;
};

export const accessCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: true,
  maxAge: JWT_ACCESS_MAX_AGE,
};
export const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: true,
  maxAge: JWT_REFRESH_MAX_AGE,
};

export function generateTokens(payload: any) {
  return { accessToken: generateAccess(payload), refreshToken: generateRefresh(payload) };
}

export function generateAccess(payload: any) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET ?? '', {
    expiresIn: JWT_ACCESS_MAX_AGE,
  });

  return accessToken;
}

export function generateRefresh(payload: any) {
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET ?? '', {
    expiresIn: JWT_REFRESH_MAX_AGE,
  });

  return refreshToken;
}

export function verifyAccess(token: string) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET ?? '');
}

export function verifyRefresh(token: string) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET ?? '');
}
