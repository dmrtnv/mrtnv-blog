'use client';

import { fetchPostById } from '@/api/posts';
import Post from '@/components/Post';
import api from '@/lib/api';
import { useQuery } from 'react-query';

function PostPage({ params }: { params: { postId: string } }) {
  const { data: post, isLoading, isError } = useQuery(['posts', params.postId], () => fetchPostById(params.postId));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!post) return <div>Post does not exist</div>;

  return <Post post={post} />;
}

export default PostPage;
