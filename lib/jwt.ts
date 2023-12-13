import jwt from 'jsonwebtoken';

const JWT_ACCESS_SECRET =
  '752db3803b9425545488f9d5f3e9cea125266a87a70d2f311c6e1dc33545e390';
const JWT_REFRESH_SECRET =
  '1feed900d04b51e2500d475c58e301266e9a6d9c8d58e45af7283e5e0cb4dc4c';

export function generateTokens(payload: any) {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '5m' });

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: '1d',
  });

  return { accessToken, refreshToken };
}
