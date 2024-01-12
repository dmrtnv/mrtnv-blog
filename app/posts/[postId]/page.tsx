'use client';

import { fetchCommentsByPostId } from '@/api/comment';
import { fetchPostById } from '@/api/posts';
import CommentsSection from '@/components/CommentsSection';
import Post from '@/components/Post';
import { Loader2 } from 'lucide-react';
import { useQuery } from 'react-query';

function PostPage({ params }: { params: { postId: string } }) {
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery(['posts', params.postId], () => fetchPostById(params.postId));

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery(['posts', post?.id, 'comments'], () => (post ? fetchCommentsByPostId(post?.id) : null));

  if (isCommentsLoading || isPostLoading) return <Loader2 className='mx-auto my-2 animate-spin' />;
  if (isPostError || isCommentsError) return <div>Error</div>;
  if (!post) return <div>Post does not exist</div>;

  return (
    <>
      <Post post={post} />
      <CommentsSection comments={comments ?? []} />
    </>
  );
}

export default PostPage;
