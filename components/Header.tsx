'use client';

import React, { useContext } from 'react';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import Link from 'next/link';
import { useSession } from '@/app/(auth)/SessionProvider';
import UserDropdown from './UserDropdown';

function Header() {
  const { status } = useSession();

  return (
    <div className='sticky top-0 z-50 flex w-full items-center gap-2 border-b-2 bg-inherit p-4'>
      <Button variant='ghost' className='text-lg' asChild>
        <Link href='/'>Header</Link>
      </Button>

      <div className='ml-2 mr-auto'>
        <div>{status}</div>
      </div>

      <ModeToggle />

      {status === 'authenticated' && <UserDropdown />}
      {status === 'unauthenticated' && (
        <div className='flex items-center gap-1'>
          <Button variant='ghost' asChild>
            <Link href='/login'>Log In</Link>
          </Button>
          /
          <Button variant='ghost' asChild>
            <Link href='/signup'>Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Header;
