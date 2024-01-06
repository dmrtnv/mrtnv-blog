'use client';

import { MessageCircle } from 'lucide-react';
import UserHoverCard from './UserHoverCard';
import { Button } from './ui/button';
import PostType from '@/types/PostType';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikeButton from './ui/like-button';
import { usePostsContext } from '@/contexts/PostsProvider';
import { useSession } from '@/contexts/SessionProvider';
dayjs.extend(relativeTime);

function Post({ post }: { post: PostType }) {
  const { toggleLike } = usePostsContext();
  const { user } = useSession();

  if (!user) return null;

  return (
    <article className='w-full rounded-xl border p-4'>
      <div className='flex items-center gap-4'>
        <UserHoverCard user={post.author} />
        <span>·</span>
        <span className='cursor-pointer text-sm'>{dayjs(post.createdAt).fromNow()}</span>
      </div>
      <div className='my-2'>{post.text}</div>
      <div className='flex items-center gap-6'>
        <LikeButton
          likes={post.likes}
          isActive={post.likes.some((like) => like.user.id === user.id)}
          handleClick={() => toggleLike(post.id)}
        />
        <Button variant='ghost' className='h-11 w-11 rounded-full p-0'>
          <MessageCircle />
        </Button>
      </div>
    </article>
  );
}

export default Post;
