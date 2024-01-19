'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import React from 'react';
import { Label } from './ui/label';
import { useSession } from '@/contexts/SessionProvider';

function PictureProfileForm() {
  const { user, updateSession } = useSession();

  if (!user) return;

  return (
    <div className='flex items-end justify-between'>
      <div className='w-full'>
        <Label>
          Profile Picture
          <UploadDropzone
            className='border-2 border-border'
            endpoint='profilePictureUploader'
            onClientUploadComplete={(res) => {
              console.log(res);
              updateSession();
            }}
          />
        </Label>
      </div>
    </div>
  );
}

export default PictureProfileForm;
