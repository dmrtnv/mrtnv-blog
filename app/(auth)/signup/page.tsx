'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const API_URL = 'http://localhost:3000/api/';

const formSchema = z
  .object({
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(2)
      .max(30)
      .refine(
        async (username) => {
          if (!username) return true;

          const { userExists } = (
            await axios.get(`${API_URL}/users/${username}`)
          ).data;

          return !userExists;
        },
        {
          message: 'Username already taken',
        },
      ),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/, {
      message: 'Password must consist of 4-16 letters and numbers',
    }),
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Paswords must match',
    path: ['confirmPassword'],
  });

type Input = z.infer<typeof formSchema>;

function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: Input) {
    setIsLoading(true);

    const result = await axios.post(`${API_URL}/signup`, values);

    form.reset();
    console.log(result);

    setIsLoading(false);

    router.push('/');
  }

  return (
    <Card className='mx-auto mt-4 max-w-lg'>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          By signibg up you will be registered as new user
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col space-y-8'
          >
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='username' {...field} />
                  </FormControl>
                  <FormDescription>This is your username.</FormDescription>
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
                  <FormDescription>
                    This is password for your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Confirm password'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Confirm password for your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center justify-end'>
              {isLoading ? (
                <Loader2 className='animate-spin' />
              ) : (
                <Button type='submit'>Register</Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignupPage;
