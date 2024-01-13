import React from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';
import { addComment } from '@/api/comment';
import { PostType } from '@/types/Post';

const NewCommentFormSchema = z.object({
  text: z.string().trim().min(1).max(280),
});

function NewComment({ post }: { post: PostType }) {
  const form = useForm<z.infer<typeof NewCommentFormSchema>>({
    resolver: zodResolver(NewCommentFormSchema),
    defaultValues: {
      text: '',
    },
  });

  const queryClient = useQueryClient();
  const addCommentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', post?.id, 'comments']);
      form.reset();
    },
  });

  const onSubmit = async (comment: z.infer<typeof NewCommentFormSchema>) => {
    addCommentMutation.mutate({ ...comment, postId: post.id });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2'>
        <div className='flex-1'>
          <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Write your comment!' className='space-y-8' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='border-white-100 flex w-28 items-center justify-center'>
          {addCommentMutation.isLoading ? (
            <Loader2 className='animate-spin' />
          ) : (
            <Button disabled={!form.formState.isDirty} type='submit' className='w-full'>
              Comment!
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default NewComment;
