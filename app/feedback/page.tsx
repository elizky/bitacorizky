'use client';
import { FormEvent, useState } from 'react';

import { addSuggestion } from '@/lib/firebase/utils';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { en } from '@/lib/texts/en';

const FeedbackPage = () => {
  const [suggestion, setSuggestion] = useState('');
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const suggestionData = { suggestion, authorId: currentUser.uid };
      await addSuggestion(suggestionData);
      setSuggestion('');
      toast({
        title: en.feedback.toast.success,
      });
    } catch (error) {
      console.log('error', error);
      toast({
        variant: 'destructive',
        title: en.feedback.toast.error,
      });
    }
  };

  return (
    <div className='flex flex-col p-8 gap-4'>
      <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-baseline'>
        <h1>{en.feedback.title}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          id='suggestion'
          value={suggestion}
          onChange={(event) => setSuggestion(event.target.value)}
          className='w-full h-64 my-4 p-2 rounded focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-4 
            focus-visible:outline-primary bg-secondary-light/40 dark:bg-paper/60'
          placeholder={en.feedback.placeholder}
          required
        />
        <Button className='px-8 text-base'>{en.feedback.button}</Button>
      </form>
    </div>
  );
};

export default FeedbackPage;
