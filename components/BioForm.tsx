'use client';

import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Check, Loader2 } from 'lucide-react';
import axios from '@/lib/axios';
import { UserSchema } from '@/types/User';
import { useSession } from '@/contexts/SessionProvider';

const BioFormSchema = z.object({
  bio: z.string().trim().max(280).optional(),
});

function BioForm() {
  const { user, isLoading } = useSession();

  const form = useForm<z.infer<typeof BioFormSchema>>({
    resolver: zodResolver(BioFormSchema),
    defaultValues: {
      bio: user?.bio ?? '',
    },
  });

  if (!user || isLoading) return;

  async function onSubmit(values: z.infer<typeof BioFormSchema>) {
    if (!values.bio) return;
    if (!user) return;

    try {
      const result = await axios.put(`/api/users/${user.username}`, { bio: values.bio });
      const updatedUser = UserSchema.parse(result.data.user);
      form.reset({ bio: updatedUser.bio ?? '' });
    } catch (err: unknown) {
      console.error(err);
    }
    // await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-2 space-y-8'>
        <div className='flex-1'>
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder='Write about yourself' {...field} />
                </FormControl>
                <FormDescription>This is your bio.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.formState.isSubmitting ? (
          <Button variant='ghost' disabled type='submit'>
            <Loader2 className='animate-spin' />
          </Button>
        ) : (
          <Button variant='ghost' disabled={!form.formState.isDirty} type='submit'>
            <Check />
          </Button>
        )}
      </form>
    </Form>
  );
}

export default BioForm;
