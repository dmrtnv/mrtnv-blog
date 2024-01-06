'use client';

import { useSession } from '@/contexts/SessionProvider';
import BioForm from '@/components/BioForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import z from 'zod';
import { Loader2 } from 'lucide-react';

function ProfilePage() {
  const { user, isLoading } = useSession();

  if (isLoading) return <Loader2 className='mx-auto my-2 animate-spin' />;

  if (!user) {
    return;
    // redirect
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
      </CardContent>
    </Card>
  );
}

export default ProfilePage;
