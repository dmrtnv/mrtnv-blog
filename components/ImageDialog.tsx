import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/image-dialog';
import { UserType } from '@/types/User';
import Image from 'next/image';
import { cn } from '@/lib/utils';

function ImageDialog({ user }: { user: UserType }) {
  const img = user.profilePicture;
  if (!img) return;

  return (
    <Dialog>
      <DialogTrigger className='flex h-40 w-40 flex-none overflow-hidden rounded-full'>
        <Image
          unoptimized
          alt='profile picture'
          src={img.src}
          width={img.width}
          height={img.height}
          placeholder='blur'
          blurDataURL={img.blurDataUrl}
          quality={100}
          // className={cn('object-cover', img.width > img.height ? 'h-full' : 'w-full')}
          className='min-h-full min-w-full object-cover'
        />
      </DialogTrigger>
      <DialogContent className='bg-transparent'>
        <Image
          unoptimized
          alt='profile picture'
          src={img.src}
          width={img.width}
          height={img.height}
          placeholder='blur'
          blurDataURL={img.blurDataUrl}
          quality={100}
          className='flex max-h-[95vh] w-fit max-w-[95vw] object-contain'
        />
      </DialogContent>
    </Dialog>
  );
}

export default ImageDialog;
