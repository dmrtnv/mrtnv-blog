'use client';

import React from 'react';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import Link from 'next/link';

function Header() {
  return (
    <div className='flex w-full items-center justify-between border-b-2 p-4'>
      <Button variant='ghost' asChild>
        <Link href='/'>Header</Link>
      </Button>
      <ModeToggle />
    </div>
  );
}

export default Header;
