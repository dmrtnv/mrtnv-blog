import jwt from 'jsonwebtoken';
import * as jose from 'jose';

const JWT_ACCESS_MAX_AGE = 1800;
const JWT_REFRESH_MAX_AGE = 86400;

const ACCESS_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

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

export async function generateTokens(payload: any) {
  return { accessToken: await generateAccess(payload), refreshToken: await generateRefresh(payload) };
}

export async function generateAccess(payload: any) {
  // const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET ?? '', {
  //   expiresIn: JWT_ACCESS_MAX_AGE,
  // });

  const accessToken = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30m')
    .sign(ACCESS_SECRET);

  return accessToken;
}

export async function generateRefresh(payload: any) {
  // const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET ?? '', {
  //   expiresIn: JWT_REFRESH_MAX_AGE,
  // });

  const refreshToken = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(REFRESH_SECRET);

  return refreshToken;
}

export async function verifyAccess(token: string) {
  const { payload } = await jose.jwtVerify(token, ACCESS_SECRET);

  return payload;

  // return jwt.verify(token, process.env.JWT_ACCESS_SECRET ?? '');
}

export async function verifyRefresh(token: string) {
  const { payload } = await jose.jwtVerify(token, REFRESH_SECRET);

  return payload;

  // return jwt.verify(token, process.env.JWT_REFRESH_SECRET ?? '');
}
