import axios from '@/lib/axios';
import { z } from 'zod';

const PostSchema = z.array(
  z.object({
    title: z.string(),
    body: z.string(),
  }),
);

export default async function fetchPosts() {
  try {
    const result = await axios.get('/api/posts');

    return PostSchema.parse(result.data.posts);
  } catch (error) {
    console.error(error);
    return null;
  }
}
