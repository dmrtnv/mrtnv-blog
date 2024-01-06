'use client';

import Feed from '@/components/Feed';
import { usePostsContext } from '@/contexts/PostsProvider';
import axios from '@/lib/axios';
import { UserSchema, UserType } from '@/types/User';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserCard from '@/components/UserCard';
import Link from 'next/link';
import NewPost from '@/components/NewPost';

function UserPage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<UserType | null>(null);
  const { fetchPostsByUsername, posts } = usePostsContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const result = await axios.get(`/api/users/${params.username}`);

      if (!result.data.user) {
        // router.back();
        setIsLoading(false);
        return;
      }

      setUser(UserSchema.parse(result.data.user));
    })();
  }, [params.username]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      await fetchPostsByUsername(user.username);
      setIsLoading(false);
    })();
  }, [user]);

  if (isLoading) return <Loader2 className='mx-auto my-2 animate-spin' />;

  if (!user) {
    return <Link href='/login'>Log In</Link>;
  }

  return (
    <>
      <UserCard user={user} totalPosts={posts?.length ?? 0} />

      <NewPost />

      {!!posts && <Feed posts={posts} />}
    </>
  );
}

export default UserPage;
