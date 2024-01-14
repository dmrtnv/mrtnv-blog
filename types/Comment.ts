import z from 'zod';

export const CommentSchema = z.object({
  id: z.number(),
  text: z.string(),
  postId: z.number(),
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
});

export const CommentArraySchema = z.array(CommentSchema);

export type CommentType = z.infer<typeof CommentSchema>;
