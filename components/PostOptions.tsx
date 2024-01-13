import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

function PostOptions({
  isAuthor,
  className,
  handleDelete,
}: {
  isAuthor: boolean;
  className: string;
  handleDelete: () => void;
}) {
  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className='h-5 w-5' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mx-1'>
          <DropdownMenuLabel className='text-center'>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {isAuthor && (
            <DropdownMenuItem
              onClick={handleDelete}
              className='text-destructive hover:cursor-pointer focus:bg-destructive-foreground focus:text-destructive'
            >
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default PostOptions;
