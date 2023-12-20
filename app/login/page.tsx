import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import TypeWriter from '@/components/TypeWriter';
import Link from 'next/link';

export default async function Home() {
  return (
    <>
      <div
        className='min-h-screen flex items-center '
        style={{ minHeight: 'calc(100vh - 70px)', marginTop: '-70px' }}
      >
        <div className='w-2/3 p-8'>
          <TypeWriter />
        </div>

        <div className='w-1/3'>
          <div className=' flex w-full flex-col justify-center items-center space-y-6 '>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-lg font-semibold'>Inicia sesion para poder acceder</h1>
            </div>
            <LoginForm />
            <p>
              O puedes{' '}
              <Link
                href='/register'
                className='underline underline-offset-2 hover:text-primary transition'
              >
                {' '}
                crearte una cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
