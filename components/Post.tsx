'use client';

import { MessageCircle } from 'lucide-react';
import UserHoverCard from './UserHoverCard';
import { Button } from './ui/button';
import { PostType } from '@/types/Post';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikeButton from './ui/like-button';
import { useSession } from '@/contexts/SessionProvider';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePost, toggleLike } from '@/api/posts';
import { fetchCommentsByPostId } from '@/api/comment';
import PostOptions from './PostOptions';
dayjs.extend(relativeTime);

function Post({ post, linkable = false }: { post: PostType; linkable?: boolean }) {
  const queryClient = useQueryClient();
  const toggleLikeMutation = useMutation(toggleLike, { onSuccess: () => queryClient.invalidateQueries('posts') });
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery(['posts', post?.id, 'comments'], () => (post ? fetchCommentsByPostId(post?.id) : null));
  const deletePostMutation = useMutation(deletePost, { onSuccess: () => queryClient.invalidateQueries('posts') });

  const { user } = useSession();

  if (!user || isCommentsError || isCommentsLoading) return null;

  return (
    <article className='w-full rounded-xl border p-4'>
      <div className='flex items-center gap-4'>
        <UserHoverCard user={post.author} />
        <span>·</span>
        <span className='cursor-pointer text-sm'>{dayjs(post.createdAt).fromNow()}</span>
        <PostOptions
          className='ml-auto'
          handleDelete={() => deletePostMutation.mutate(post.id)}
          isAuthor={post.author.id === user.id}
        />
      </div>

      {linkable ? (
        <Link href={`/posts/${post.id}`}>
          <div className='my-2'>{post.text}</div>
        </Link>
      ) : (
        <div className='my-2'>{post.text}</div>
      )}

      <div className='flex items-center gap-8'>
        <LikeButton
          likes={post.likes}
          isActive={post.likes.some((like) => like.user.id === user.id)}
          handleClick={() => toggleLikeMutation.mutate(post.id)}
        />

        <div className='flex items-center justify-center gap-2'>
          <Button variant='ghost' className='h-11 w-11 rounded-full p-0'>
            <Link href={`/posts/${post.id}/#comments`}>
              <MessageCircle />
            </Link>
          </Button>
          <span>{comments?.length ?? 0}</span>
        </div>
      </div>
    </article>
  );
}

export default Post;
