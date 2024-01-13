import z from 'zod';

export const NewCommentSchema = z.object({
  text: z.string(),
  postId: z.number(),
});

export type NewCommentType = z.infer<typeof NewCommentSchema>;
