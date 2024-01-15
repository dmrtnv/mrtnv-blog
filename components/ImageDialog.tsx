import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { UserType } from '@/types/User';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Image from 'next/image';
import { cn } from '@/lib/utils';

function ImageDialog({ user }: { user: UserType }) {
  const img = user.profilePicture;
  if (!img) return;

  return (
    <Dialog>
      <DialogTrigger className='h-40 w-40 overflow-hidden rounded-full'>
        <Image
          alt='profile picture'
          src={img.src}
          width={img.width}
          height={img.height}
          placeholder='blur'
          blurDataURL={img.blurDataUrl}
          quality={100}
          className={cn('object-cover', img.width > img.height && 'h-full')}
        />
      </DialogTrigger>
      <DialogContent className='bg-transparent'>
        <Image
          alt='profile picture'
          src={img.src}
          width={img.width}
          height={img.height}
          placeholder='blur'
          blurDataURL={img.blurDataUrl}
          quality={100}
          className=''
        />
      </DialogContent>
    </Dialog>
  );
}

export default ImageDialog;
