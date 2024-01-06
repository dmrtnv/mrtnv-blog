import z from 'zod';

const PostsSchema = z.array(
  z.object({
    text: z.string(),
    id: z.number(),
    createdAt: z.string().pipe(z.coerce.date()),
    author: z.object({
      id: z.string(),
      username: z.string(),
      fullName: z.string(),
      bio: z.string().nullable().optional(),
      profilePictureUrl: z.string().url().nullable().optional(),
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
  }),
);

export default PostsSchema;
