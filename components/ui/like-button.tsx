import React from 'react';
import { Button } from './button';
import { Heart } from 'lucide-react';

function LikeButton({
  likes,
  disabled,
  isActive = false,
  handleClick,
}: {
  likes: {
    id: number;
    user: {
      id: string;
      username: string;
    };
  }[];
  isActive: boolean;
  disabled: boolean;
  handleClick: () => void;
}) {
  return (
    <div className='flex items-center justify-center gap-2'>
      <Button
        onClick={handleClick}
        variant='ghost'
        disabled={disabled}
        className='h-11 w-11 rounded-full p-0 hover:bg-rose-300 hover:bg-opacity-25 dark:hover:bg-rose-500 dark:hover:bg-opacity-25'
      >
        {isActive ? <Heart fill='#f43f5e' strokeWidth={0} /> : <Heart />}
      </Button>
      <span>{likes.length}</span>
    </div>
  );
}

export default LikeButton;
