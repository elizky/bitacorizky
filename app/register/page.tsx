import Footer from '@/components/Footer';
import RegisterForm from '@/components/RegisterForm';
import TypeWriter from '@/components/TypeWriter';
import { en } from '@/lib/texts/en';
import Link from 'next/link';

export default async function Register() {
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
            <h1 className='text-lg font-semibold text-center'>{en.register.title}</h1>

            <RegisterForm />
            <p>
              {en.register.subtitle.first}
              <Link
                href='/login'
                className='underline underline-offset-2 hover:text-primary transition'
              >
                {en.register.subtitle.second}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
