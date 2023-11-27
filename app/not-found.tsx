import { Button } from '@/components/ui/button';
import Link from 'next/link';

const error = () => {
  return (
    <div className='container m-auto p-4 '>
      <div className='flex flex-col gap-4 my-4 text-center'>
        <h4>Acá no hay nada</h4>
        <Button variant='link'>
          <Link href='/'>Volver a Inicio</Link>
        </Button>
      </div>
    </div>
  );
};

export default error;
