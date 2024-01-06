'use client';

import { useSession } from '@/contexts/SessionProvider';
import BioForm from '@/components/BioForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import z from 'zod';
import { Loader2 } from 'lucide-react';
import PictureProfileForm from '@/components/PictureProfileForm';
import { useRouter } from 'next/navigation';

function ProfilePage() {
  const { user, isLoading } = useSession();
  const router = useRouter();

  if (isLoading) return <Loader2 className='mx-auto my-2 animate-spin' />;

  if (!user) {
    // router.push('/login');
    return;
  }

  return (
    <Card className='my-2'>
      <CardHeader>
        <CardTitle>Manage Profile</CardTitle>
        <CardDescription>
          Provide extra information about yourself by adding <span className='font-semibold'>Bio</span> and{' '}
          <span className='font-semibold'>Profile Picture</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BioForm />

        <PictureProfileForm />
      </CardContent>
    </Card>
  );
}

export default ProfilePage;
