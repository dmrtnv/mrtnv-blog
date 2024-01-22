'use client';

import { fetchCommentsByPostId } from '@/apiRequests/comment';
import { fetchPostById } from '@/apiRequests/posts';
import CallToSignIn from '@/components/CallToSignIn';
import CommentsSection from '@/components/CommentsSection';
import NewComment from '@/components/NewComment';
import Post from '@/components/Post';
import { useSession } from '@/contexts/SessionProvider';
import { Loader2 } from 'lucide-react';
import { useQuery } from 'react-query';

function PostPage({ params }: { params: { postId: string } }) {
  const { user, isLoading: isUserLoading } = useSession();

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

  if (isCommentsLoading || isPostLoading || isUserLoading) return <Loader2 className='mx-auto my-2 animate-spin' />;
  if (isPostError || isCommentsError) return <div>Error</div>;
  if (!post) return <div>Post does not exist</div>;

  return (
    <>
      <h1 className='text-3xl font-bold text-muted-foreground'>Post</h1>
      <Post user={user} post={post} isPostPage />
      <div id='comments'></div>
      <h1 className='text-2xl font-bold text-muted-foreground'>Comments</h1>
      {!!user && <NewComment post={post} />}
      <CommentsSection comments={comments ?? []} />
    </>
  );
}

export default PostPage;
