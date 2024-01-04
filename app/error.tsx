'use client';

import { en } from '@/lib/texts/en';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <div className='container m-auto p-4 '>
      <div className='flex flex-col gap-4 my-4 text-center'>
        <h4>{en.errorPage.title}</h4>
        <p>{en.errorPage.subtitle}</p>
      </div>
    </div>
  );
}
