import { UserType } from '@/types/User';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ImageDialog from './ImageDialog';

function UserCard({ user, totalPosts }: { user: UserType; totalPosts: number }) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-10'>
          {!!user.profilePicture ? (
            <ImageDialog user={user} />
          ) : (
            <Avatar className='shadow-l h-40 w-40 self-start'>
              <AvatarFallback>
                {user.fullName.split(' ').reduce((prev, current) => prev + current[0], '')}
              </AvatarFallback>
            </Avatar>
          )}
          <div className='flex flex-col gap-2'>
            <CardTitle>{user.fullName}</CardTitle>
            <CardDescription>@{user.username}</CardDescription>
            {user.bio && (
              <div>
                <CardDescription className='font-semibold'>Bio</CardDescription>
                <CardDescription>{user.bio}</CardDescription>
              </div>
            )}
            <CardDescription className='flex flex-col'>
              <span className='font-semibold'>Posts</span> <span>{totalPosts}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default UserCard;
