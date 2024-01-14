import Post from './Post';
import { PostArrayType } from '@/types/Post';

function Feed({ posts }: { posts: PostArrayType | null }) {
  if (!posts) return <div>No posts</div>;

  return (
    <ul className='flex list-none flex-col items-center gap-2'>
      {posts.toReversed().map((post) => (
        <li className='w-full' key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}

export default Feed;
