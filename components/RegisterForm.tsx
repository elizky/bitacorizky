'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { Loader2 } from 'lucide-react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '@/lib/utils/validation';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { en } from '@/lib/texts/en';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, signup } = useAuth();

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  if (currentUser) {
    router.push('/');
    return null;
  }

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    const { name, email, password } = data;
    setIsLoading(true);
    signup(email, password, name)
      .then(() => router.push('/'))
      .catch((error) => {
        console.log('error', error);
        toast({
          variant: 'destructive',
          title: en.register.form.toast.server,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6 w-full max-w-[500px]]'>
        <div className='grid gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id='text'
                    placeholder={en.register.form.namePlaceholder}
                    type='text'
                    autoCapitalize='sentences'
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
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id='email'
                    placeholder={en.register.form.emailPlaceholder}
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
                    placeholder={en.register.form.passwordPlaceholder}
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
            {en.register.form.button}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
