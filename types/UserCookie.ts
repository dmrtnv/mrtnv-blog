import z from 'zod';

export const UserCookieSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export type UserCookieType = z.infer<typeof UserCookieSchema>;
