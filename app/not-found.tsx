import { Button } from '@/components/ui/button';
import { en } from '@/lib/texts/en';
import Link from 'next/link';

const error = () => {
  return (
    <div className='container m-auto p-4 '>
      <div className='flex flex-col gap-4 my-4 text-center'>
        <h4>{en.notFoundPage.title}</h4>
        <Button variant='link'>
          <Link href='/'>{en.notFoundPage.button}</Link>
        </Button>
      </div>
    </div>
  );
};

export default error;
