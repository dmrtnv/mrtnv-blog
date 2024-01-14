import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { UserType } from '@/types/User';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Image from 'next/image';

function ImageDialog({ user }: { user: UserType }) {
  const img = user.profilePicture;
  if (!img) return;

  return (
    <Dialog>
      <DialogTrigger>
        <div className='shadow-l h-40 w-40 self-start overflow-hidden rounded-full object-contain'>
          <Image
            alt='profile picture'
            src={img.src}
            width={img.width}
            height={img.height}
            placeholder='blur'
            blurDataURL={img.blurDataUrl}
            quality={100}
          />
          {/* <AvatarImage src={user.profilePicture?.src ?? undefined} />
          <AvatarFallback>{user.fullName.split(' ').reduce((prev, current) => prev + current[0], '')}</AvatarFallback> */}
        </div>
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
          className='rounded-lg'
        />
      </DialogContent>
    </Dialog>
  );
}

export default ImageDialog;
