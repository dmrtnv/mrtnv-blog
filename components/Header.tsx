'use client';

import React from 'react';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import Link from 'next/link';

function Header() {
  return (
    <div className='flex w-full items-center border-b-2 p-4'>
      <Button variant='ghost' className='mr-auto text-lg' asChild>
        <Link href='/'>Header</Link>
      </Button>

      <ModeToggle />
      <div className='flex items-center gap-1'>
        <Button variant='ghost' asChild>
          <Link href='/login'>Log In</Link>
        </Button>
        /
        <Button variant='ghost' asChild>
          <Link href='/signup'>Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;
