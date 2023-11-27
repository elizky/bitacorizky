'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/lib/context/AuthContext';

import { Chrome, Facebook } from 'lucide-react';
import { Button } from './button';

import { useToast } from './use-toast';

const LoginForm = () => {
  const { currentUser, loginWithGoogle, loginWithFacebook } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

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

  useEffect(() => {
    currentUser && router.push('/');
  });
  return (
    <div className='grid gap-6'>
      <Button variant='outline' type='button' onClick={onClickGoogleButton}>
        <Chrome className='mr-2 h-4 w-4' />
        Google
      </Button>
      <Button variant='outline' type='button' onClick={onClickFacebookButton}>
        <Facebook className='mr-2 h-4 w-4' />
        Facebook
      </Button>
    </div>
  );
};

export default LoginForm;
