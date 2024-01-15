'use client';

import { useSession } from '@/contexts/SessionProvider';
import BioForm from '@/components/BioForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Loader2 } from 'lucide-react';
import PictureProfileForm from '@/components/PictureProfileForm';
import CallToSignIn from '@/components/CallToSignIn';
import DeleteUserDialog from '@/components/DeleteUserDialog';

function ProfilePage() {
  const { user, isLoading } = useSession();

  if (isLoading) return <Loader2 className='mx-auto my-2 animate-spin' />;

  if (!user) return <CallToSignIn />;

  return (
    <div className='flex w-full flex-col items-start gap-4'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Manage Profile</CardTitle>
          <CardDescription>
            Provide extra information about yourself by adding <span className='font-semibold'>Bio</span> and{' '}
            <span className='font-semibold'>Profile Picture</span>
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <BioForm />

          <PictureProfileForm />
        </CardContent>
      </Card>

      <DeleteUserDialog />
    </div>
  );
}

export default ProfilePage;
