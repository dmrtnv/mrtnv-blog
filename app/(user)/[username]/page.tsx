'use client';

import Feed from '@/components/Feed';
import api from '@/lib/api';
import { UserSchema, UserType } from '@/types/User';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import UserCard from '@/components/UserCard';
import NewPost from '@/components/NewPost';
import { useSession } from '@/contexts/SessionProvider';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import CallToSignIn from '@/components/CallToSignIn';
import { useQuery } from 'react-query';
import { fetchPostsByUsername } from '@/apiRequests/posts';

function UserPage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const { user: sessionUser, isLoading: isSessionUserLoading } = useSession();

  useEffect(() => {
    setIsUserLoading(true);

    (async () => {
      const result = await api.get(`/users/${params.username}`);

      if (!result.data.user) {
        // router.back();
        setIsUserLoading(false);
        return;
      }

      setUser(UserSchema.parse(result.data.user));
      setIsUserLoading(false);
    })();
  }, [params.username]);

  const { data: posts, isLoading: isPostsLoading } = useQuery(['posts', { username: user?.username }], () =>
    fetchPostsByUsername(user?.username ?? ''),
  );

  if (isUserLoading || isSessionUserLoading) return null;

  if (!user) {
    return (
      <Card className='my-2'>
        <CardHeader>
          <CardTitle>{`User with username ${params.username} does not exist. 404`}</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <UserCard user={user} totalPosts={posts?.length ?? 0} />

      {sessionUser?.username === user.username && <NewPost />}

      {isPostsLoading ? <Loader2 className='mx-auto my-2 animate-spin' /> : <Feed user={sessionUser} posts={posts} />}
    </>
  );
}

export default UserPage;
