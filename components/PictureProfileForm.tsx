'use client';

import { UploadDropzone } from '@/lib/uploadthin';
import React from 'react';

function PictureProfileForm() {
  return (
    <UploadDropzone
      endpoint='profilePictureUploader'
      onClientUploadComplete={(res) => {
        console.log(res);
      }}
    />
  );
}

export default PictureProfileForm;
