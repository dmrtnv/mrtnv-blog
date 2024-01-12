'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { useSession } from '@/contexts/SessionProvider';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { useQueryClient, useMutation } from 'react-query';
import { addPost } from '@/api/posts';

const PostSchema = z.object({
  text: z.string().trim().min(1).max(280),
});

function NewPost() {
  const { user, isLoading: isUserLoading } = useSession();
  const queryClient = useQueryClient();

  const addPostMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      text: '',
    },
  });

  if (isUserLoading) return;

  if (!user) return;

  const onSubmit = async (post: z.infer<typeof PostSchema>) => {
    addPostMutation.mutate(post);

    form.setValue('text', '');
  };

  return (
    <Card>
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
              {addPostMutation.isLoading ? <Loader2 className='animate-spin' /> : <Button type='submit'>Post!</Button>}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default NewPost;
