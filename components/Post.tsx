import { Heart, MessageCircle } from 'lucide-react';
import UserHoverCard from './UserHoverCard';
import { Button } from './ui/button';
import PostType from '@/types/PostType';

function Post({ post }: { post: PostType }) {
  return (
    <article className='rounded-xl border p-4'>
      <div className='flex items-center gap-4'>
        <UserHoverCard />
        <span>·</span>
        <span className='cursor-pointer'>7h</span>
      </div>
      <div className='my-2'>{post.body}</div>
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          className='h-11 w-11 rounded-full p-0 hover:bg-rose-300 hover:bg-opacity-25 dark:hover:bg-rose-500 dark:hover:bg-opacity-25'
        >
          <Heart />
        </Button>
        <Button variant='ghost' className='h-11 w-11 rounded-full p-0'>
          <MessageCircle />
        </Button>
      </div>
    </article>
  );
}

export default Post;
