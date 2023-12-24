import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function UserHoverCard() {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger className='flex gap-4'>
          <Avatar className='cursor-pointer'>
            <AvatarImage src='https://images.news18.com/ibnlive/uploads/2022/04/untitled-design-4.jpg' />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <div className='cursor-pointer'>
            <p className='w-max font-bold hover:underline'>Stepan the Cat</p>
            <p>@stepan</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className='flex items-center gap-6'>
            <Avatar className='h-16 w-16 cursor-pointer'>
              <AvatarImage src='https://images.news18.com/ibnlive/uploads/2022/04/untitled-design-4.jpg' />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div className='cursor-pointer'>
              <p className='w-max font-bold hover:underline'>Stepan the Cat</p>
              <p>@stepan</p>
            </div>
          </div>
          <div className='mt-4'>
            <p className='font-bold'>Bio</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste error architecto eaque modi autem
              voluptatibus.
            </p>
          </div>
          <div className='mt-4'>
            <span className='mr-2 font-bold'>117</span>
            <span>posts written</span>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

export default UserHoverCard;
