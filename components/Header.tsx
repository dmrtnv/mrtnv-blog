'use client';

import React, { useContext } from 'react';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import Link from 'next/link';
import { useSession } from '@/contexts/SessionProvider';
import UserDropdown from './UserDropdown';

function Header() {
  const { user, isLoading } = useSession();

  return (
    <div className='flex w-full items-center gap-2 border-b-2 bg-inherit p-4'>
      <Button variant='ghost' className='mr-auto text-lg' asChild>
        <Link href='/'>Header</Link>
      </Button>

      <ModeToggle />

      {!isLoading ? (
        !!user ? (
          <UserDropdown />
        ) : (
          <div className='flex items-center gap-1'>
            <Button variant='ghost' asChild>
              <Link href='/login'>Log In</Link>
            </Button>
            /
            <Button variant='ghost' asChild>
              <Link href='/signup'>Sign Up</Link>
            </Button>
          </div>
        )
      ) : null}
    </div>
  );
}

export default Header;
