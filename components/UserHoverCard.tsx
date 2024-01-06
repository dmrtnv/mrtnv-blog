import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { UserType } from '@/types/User';

function UserHoverCard({ user }: { user: UserType }) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className='flex items-center gap-4'>
            <Link href={`/${user.username}`}>
              <Avatar className='cursor-pointer'>
                <AvatarImage src={user.profilePictureUrl ?? undefined} />
                <AvatarFallback>
                  {user.fullName.split(' ').reduce((prev, current) => prev + current[0], '')}
                </AvatarFallback>
              </Avatar>
            </Link>
            <Link href={`/${user.username}`}>
              <div className='cursor-pointer'>
                <p className='w-max font-bold hover:underline'>{user.fullName}</p>
                <p>@{user.username}</p>
              </div>
            </Link>
          </div>
        </HoverCardTrigger>

        <HoverCardContent>
          <div className='flex items-center gap-6'>
            <Link href={`/${user.username}`}>
              <Avatar className='h-16 w-16 cursor-pointer'>
                <AvatarImage src={user.profilePictureUrl ?? undefined} />
                <AvatarFallback>
                  {user.fullName.split(' ').reduce((prev, current) => prev + current[0], '')}
                </AvatarFallback>
              </Avatar>
            </Link>
            <Link href={`/${user.username}`}>
              <div className='cursor-pointer'>
                <p className='w-max font-bold hover:underline'>{user.fullName}</p>
                <p>@{user.username}</p>
              </div>
            </Link>
          </div>

          {!!user.bio && (
            <div className='mt-4'>
              <p className='font-bold'>Bio</p>
              <p>{user.bio}</p>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

export default UserHoverCard;
