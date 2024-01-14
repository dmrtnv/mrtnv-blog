import z from 'zod';

export const PostSchema = z.object({
  text: z.string(),
  id: z.number(),
  createdAt: z.string().pipe(z.coerce.date()),
  author: z.object({
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
  }),
  likes: z.array(
    z.object({
      id: z.number(),
      user: z.object({
        id: z.string(),
        username: z.string(),
      }),
    }),
  ),
});

export const PostArraySchema = z.array(PostSchema);

export type PostType = z.infer<typeof PostSchema>;

export type PostArrayType = z.infer<typeof PostArraySchema>;
