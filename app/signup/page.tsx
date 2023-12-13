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

const API_URL = 'http://localhost:3000/api/';

const formSchema = z
  .object({
    username: z.string().trim().toLowerCase().min(2).max(30),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,16}$/, {
      message: 'Password must consist of 4-16 letters and numbers',
    }),
  })
  .refine(
    async ({ username }) => {
      if (!username) return true;

      const { userExists } = (await axios.get(`${API_URL}/users/${username}`))
        .data;
      console.log(userExists);

      return !userExists;
    },
    {
      message: 'Username already taken',
      path: ['username'],
    },
  );

type Input = z.infer<typeof formSchema>;

function SignupPage() {
  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: Input) {
    const result = await axios.post(`${API_URL}/signup`, values);

    console.log(result);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto mt-4 flex max-w-lg flex-col space-y-8 rounded-xl border-2 p-4 shadow-xl'
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

        <Button className='self-end' type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default SignupPage;
