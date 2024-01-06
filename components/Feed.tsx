import Post from './Post';
import PostType from '@/types/PostType';

function Feed({ posts }: { posts: PostType[] | null }) {
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
