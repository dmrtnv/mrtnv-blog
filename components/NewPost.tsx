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
import { Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { usePostsContext } from '@/contexts/PostsProvider';

const PostSchema = z.object({
  text: z.string().trim().min(1).max(280),
});

function NewPost() {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const { addPost } = usePostsContext();

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
    setIsLoading(true);

    addPost(post);
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    form.setValue('text', '');
    setIsLoading(false);
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
                      {/* <Textarea placeholder='Write your post!' className='resize-none space-y-8' {...field} /> */}
                      <Input placeholder='Write your post!' className='space-y-8' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='border-white-100 flex w-[67px] items-end justify-center'>
              {isLoading ? <Loader2 className='animate-spin' /> : <Button type='submit'>Post!</Button>}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default NewPost;