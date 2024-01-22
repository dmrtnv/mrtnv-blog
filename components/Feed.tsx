import { UserType } from '@/types/User';
import Post from './Post';
import { PostArrayType } from '@/types/Post';

function Feed({ posts, user }: { posts: PostArrayType | null | undefined; user: UserType | null }) {
  if (!posts) return <div>No posts</div>;

  return (
    <ul className='flex list-none flex-col items-center gap-2'>
      {posts.toReversed().map((post) => (
        <li className='w-full' key={post.id}>
          <Post post={post} user={user} />
        </li>
      ))}
    </ul>
  );
}

export default Feed;
