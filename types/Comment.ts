import z from 'zod';

export const CommentSchema = z.object({
  id: z.number(),
  text: z.string(),
  author: z.object({
    id: z.string(),
    username: z.string(),
    fullName: z.string(),
    bio: z.string().nullable().optional(),
    profilePictureUrl: z.string().url().nullable().optional(),
  }),
  postId: z.number(),
});

export const CommentArraySchema = z.array(CommentSchema);

export type CommentType = z.infer<typeof CommentSchema>;
