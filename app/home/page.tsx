'use client';

import Feed from '@/components/Feed';
import NewPost from '@/components/NewPost';
import { usePostsContext } from '@/contexts/PostsProvider';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function HomePage() {
  const { posts, fetchPosts } = usePostsContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchPosts();
      setIsLoading(false);
    })();
    // (async () => await new Promise((resolve) => setTimeout(resolve, 2000)))();
  }, []);

  return (
    <>
      <NewPost />
      {isLoading ? <Loader2 className='mx-auto my-2 animate-spin' /> : <Feed posts={posts} />}
    </>
  );
}

export default HomePage;
