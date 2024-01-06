import z from 'zod';

export const NewPostSchema = z.object({
  text: z.string(),
});

export type NewPostType = z.infer<typeof NewPostSchema>;
