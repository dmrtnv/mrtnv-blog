'use client';

import CallToSignIn from '@/components/CallToSignIn';
import Feed from '@/components/Feed';
import NewPost from '@/components/NewPost';
import { usePostsContext } from '@/contexts/PostsProvider';
import { useSession } from '@/contexts/SessionProvider';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function HomePage() {
  const { posts, fetchPosts } = usePostsContext();
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: isUserLoading } = useSession();

  useEffect(() => {
    (async () => {
      await fetchPosts();
      setIsLoading(false);
    })();
    // (async () => await new Promise((resolve) => setTimeout(resolve, 2000)))();
  }, []);

  if (isUserLoading) return <Loader2 className='mx-auto my-2 animate-spin' />;

  if (!user) return <CallToSignIn />;

  return (
    <>
      <NewPost />
      {isLoading ? <Loader2 className='mx-auto my-2 animate-spin' /> : <Feed posts={posts} />}
    </>
  );
}

export default HomePage;
