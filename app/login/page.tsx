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
        <div className='sm:w-1/2 lg:w-2/3 p-8 hidden md:flex'>
          <TypeWriter />
        </div>

        <div className='w-full md:w-1/2 lg:w-1/3 p-8'>
          <div className=' flex w-full flex-col justify-center items-center space-y-6 '>
            <h1 className='text-lg font-semibold text-center'>Inicia sesion para poder acceder</h1>
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
