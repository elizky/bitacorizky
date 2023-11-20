'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from './button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Chrome, Loader } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { useToast } from './use-toast';

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'El email no puede estar vacío',
    })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .max(50),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values.email, values.password)
      .then(() => router.push('/'))
      .catch((error) => {
        console.log('error', error);
        toast({
          variant: "destructive",
          title: 'Uh oh! Algo salió mal.',
          description: 'asd',
        });
      });
    console.log(values);
  }
  return (
    <div className='grid gap-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Email' {...field} />
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
                <FormControl>
                  <Input placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Log in
          </Button>
        </form>
      </Form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>O Continua Con</span>
        </div>
      </div>
      <Button variant='outline' type='button' disabled={isLoading} onClick={loginWithGoogle}>
        {isLoading ? (
          <Loader className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Chrome className='mr-2 h-4 w-4' />
        )}
        Google
      </Button>
    </div>
  );
};

export default LoginForm;
