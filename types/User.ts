import z from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  fullName: z.string(),
  bio: z.string().nullable().optional(),
  profilePicture: z
    .object({
      id: z.number(),
      src: z.string(),
      width: z.number(),
      height: z.number(),
      blurDataUrl: z.string(),
    })
    .optional()
    .nullable(),
});

export type UserType = z.infer<typeof UserSchema>;
