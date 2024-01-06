import z from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  fullName: z.string(),
  bio: z.string().nullable().optional(),
  profilePictureUrl: z.string().url().nullable().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
