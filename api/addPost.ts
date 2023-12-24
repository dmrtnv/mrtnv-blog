import axios from '@/lib/axios';

export default async function addPost(post: any) {
  try {
    const addedPost = await axios.post('/api/posts', post);
    console.log(addedPost);
  } catch (err: unknown) {
    console.log(err);
  }
}
