'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { useSession } from '@/app/(auth)/SessionProvider';
import Link from 'next/link';

const PostSchema = z.object({
  text: z.string().min(1).max(280),
});

function NewPost() {
  const { status, axios } = useSession();

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      text: '',
    },
  });

  if (status === 'loading') return;

  if (status === 'unauthenticated') {
    return (
      <Card className='my-2'>
        <CardHeader>
          <CardTitle>
            <Link href='/login' className='mr-2 text-sky-600 hover:underline'>
              Log In
            </Link>
            <span>to Create New Post!</span>
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const onSubmit = async (post: z.infer<typeof PostSchema>) => {
    try {
      const result = await axios.post('/api/posts', post);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className='my-2'>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full gap-2'>
            <div className='flex-1'>
              <FormField
                control={form.control}
                name='text'
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <Textarea placeholder='Write your post!' className='resize-none space-y-8' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' className='self-end'>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default NewPost;
