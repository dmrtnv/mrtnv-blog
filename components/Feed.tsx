// import { useSession } from '@/app/(auth)/SessionProvider';
import Post from './Post';
import { z } from 'zod';
import axios from '@/lib/axios';

const PostSchema = z.array(
  z.object({
    title: z.string(),
    body: z.string(),
  }),
);

async function Feed() {
  // const { axios } = useSession();

  const fetchPosts = async () => {
    try {
      const result = await axios.get('/api/posts');

      return PostSchema.parse(result.data.posts);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const posts = await fetchPosts();

  if (!posts) return <div>No posts</div>;

  return (
    <ul className='mx-auto flex list-none flex-col items-center gap-2 p-2'>
      {posts.map((post) => (
        <li key={post.title}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}

export default Feed;
