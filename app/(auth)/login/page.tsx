'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { useSession } from '../SessionProvider';

const URL = process.env.URL || 'http://localhost:3000/';

const formSchema = z.object({
  username: z.string().trim().toLowerCase().min(1, { message: 'Enter username' }),
  password: z.string().min(1, { message: 'Enter paswword' }),
});

type Input = z.infer<typeof formSchema>;

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { updateSession } = useSession();

  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: Input) {
    setIsLoading(true);

    try {
      const result = await axios.post(`${URL}/api/login`, values);

      setIsLoading(false);

      updateSession();

      router.push('/');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        if (err.response?.status === 401) {
          const { field, error } = err.response.data;
          form.setError(field, { message: error }, { shouldFocus: true });
          form.setValue('password', '');
        }
      } else {
        console.log(err);
      }
      setIsLoading(false);
    }
  }

  return (
    <Card className='mx-auto mt-4 max-w-lg'>
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>By logging in you will be able to like, comment and post!</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-8'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='password' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center justify-end'>
              {isLoading ? <Loader2 className='animate-spin' /> : <Button type='submit'>Log In</Button>}
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex flex-col'>
        <Separator className='mb-4 ' />
        <CardDescription>
          Do not have an account?
          <Button variant='link' className='text-inherit'>
            <Link href='/signup'>Sign Up!</Link>
          </Button>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default LoginPage;
