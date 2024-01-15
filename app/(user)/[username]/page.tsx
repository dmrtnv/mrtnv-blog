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

  const [isLoading, setIsLoading] = useState(true);
  const { user: sessionUser, isLoading: isSessionUserLoading } = useSession();

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const result = await api.get(`/users/${params.username}`);

      if (!result.data.user) {
        // router.back();
        setIsLoading(false);
        return;
      }

      setUser(UserSchema.parse(result.data.user));
    })();
  }, [params.username]);

  const { data: posts } = useQuery(
    ['posts', { username: user?.username }],
    () => fetchPostsByUsername(user?.username ?? ''),
    {
      onSettled: () => {
        setIsLoading(false);
      },
    },
  );

  if (isLoading || isSessionUserLoading) return <Loader2 className='mx-auto my-2 animate-spin' />;

  if (!user) {
    return (
      <Card className='my-2'>
        <CardHeader>
          <CardTitle>{`User with username ${params.username} does not exist. 404`}</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (!sessionUser) return <CallToSignIn />;

  return (
    <>
      <UserCard user={user} totalPosts={posts?.length ?? 0} />

      {sessionUser.username === user.username && <NewPost />}

      {!!posts && <Feed posts={posts} />}
    </>
  );
}

export default UserPage;
