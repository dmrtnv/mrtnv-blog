'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './ui/dialog';
import { Button, buttonVariants } from './ui/button';
import { Trash2 } from 'lucide-react';
import { deleteMe } from '@/api/user';
import { useRouter } from 'next/navigation';

function DeleteUserDialog() {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteMe();

    router.push('/');
  };

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: 'destructive' })}>
        <Trash2 className='mr-2 h-5 w-5' />
        Delete Account
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='text-left'>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            By deleting your account you will also delete all your posts, comments and likes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDelete} type='button' variant='destructive' className='mr-2'>
            Delete
          </Button>
          <DialogClose autoFocus className={buttonVariants({ variant: 'outline' })}>
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteUserDialog;
