import Footer from '@/components/Footer';
import RegisterForm from '@/components/RegisterForm';
import TypeWriter from '@/components/TypeWriter';
import Link from 'next/link';

export default async function Register() {
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
              <h1 className='text-lg font-semibold'>Crea una cuenta para poder acceder</h1>
            </div>
            <RegisterForm />
            <p>
              O puedes{' '}
              <Link
                href='/login'
                className='underline underline-offset-2 hover:text-primary transition'
              >
                {' '}
                loguearte con tu cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
