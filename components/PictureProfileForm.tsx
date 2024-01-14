'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import React from 'react';
import { Label } from './ui/label';
import { useSession } from '@/contexts/SessionProvider';
import Image from 'next/image';
import { cn } from '@/lib/utils';

function PictureProfileForm() {
  const { user } = useSession();

  if (!user) return;

  return (
    <div className='flex items-end justify-between'>
      <div className=''>
        <Label>
          Profile Picture
          <UploadDropzone
            endpoint='profilePictureUploader'
            onClientUploadComplete={(res) => {
              console.log(res);
            }}
          />
        </Label>
      </div>
      {/* <div className='relative inline-block h-48 border-b-2 object-scale-down'>
        <img src={user.profilePicture.src} alt='profile picture' />
        <div className='absolute inset-0 flex items-center justify-center bg-black opacity-50'>
          <div className='aspect-square h-[min(192px,100%)] rounded-full'></div>
        </div>
      </div> */}
    </div>
  );
}

export default PictureProfileForm;
