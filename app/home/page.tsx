'use client';

import { fetchPosts } from '@/api/posts';
import CallToSignIn from '@/components/CallToSignIn';
import Feed from '@/components/Feed';
import NewPost from '@/components/NewPost';
import { useSession } from '@/contexts/SessionProvider';
import { Loader2 } from 'lucide-react';
import { useQuery } from 'react-query';

function HomePage() {
  const { user, isLoading: isUserLoading } = useSession();
  const { data: posts, isLoading } = useQuery(['posts'], fetchPosts);

  if (isUserLoading) return <Loader2 className='mx-auto my-2 animate-spin' />;

  if (!user) return <CallToSignIn />;

  return (
    <>
      <NewPost />
      {isLoading ? <Loader2 className='mx-auto my-2 animate-spin' /> : <Feed posts={posts ?? []} />}
    </>
  );
}

export default HomePage;
