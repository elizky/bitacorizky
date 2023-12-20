'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/lib/context/AuthContext';
import { LoginSchema } from '@/lib/utils/validation';

import { Chrome, Facebook, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, login, loginWithGoogle, loginWithFacebook } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onClickGoogleButton = () => {
    loginWithGoogle()
      .then(() => router.push('/'))
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Algo salió mal.',
          description: error.message,
        });
      });
  };
  const onClickFacebookButton = () => {
    loginWithFacebook()
      .then(() => router.push('/'))
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Algo salió mal.',
          description: error.message,
        });
      });
  };

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    const { email, password } = data;
    setIsLoading(true);
    login(email, password)
      .then(() => router.push('/'))
      .catch((error) => {
        console.log('error', error);
        toast({
          variant: 'destructive',
          title: 'Error al enviar la sugerencia:',
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    currentUser && router.push('/');
  });

  return (
    <div className='grid gap-6 w-full max-w-[500px]'>
      <div className='grid gap-4 '>
        <Button
          className='hover:bg-primary'
          variant='outline'
          type='button'
          onClick={onClickGoogleButton}
        >
          <Chrome className='mr-2 h-4 w-4' />
          Google
        </Button>
        <Button
          className='hover:bg-primary'
          variant='outline'
          type='button'
          onClick={onClickFacebookButton}
        >
          <Facebook className='mr-2 h-4 w-4' />
          Facebook
        </Button>
      </div>
      <div className='relative flex justify-center text-xs uppercase'>
        <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
          <div className='grid gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id='email'
                      placeholder='name@example.com'
                      type='email'
                      autoCapitalize='none'
                      autoComplete='email'
                      autoCorrect='off'
                      disabled={isLoading}
                      {...field}
                    />
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
                    <Input
                      id='password'
                      placeholder='Password'
                      type='password'
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading}>
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
