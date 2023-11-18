import { Button } from '@/components/ui/button';
import Link from 'next/link';

const error = () => {
  return (
    <div className='container m-auto p-4 '>
      <div className='flex flex-col gap-4 my-4 text-center'>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>This is not the way</h4>
        <Button variant='link'>
          <Link href='/'>Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default error;
