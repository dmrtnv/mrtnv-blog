import jwt from 'jsonwebtoken';

export function generateTokens(payload: any) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET ?? '', {
    expiresIn: '5m',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET ?? '', {
    expiresIn: '1d',
  });

  return { accessToken, refreshToken };
}
