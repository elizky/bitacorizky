import LoginForm from '@/components/ui/LoginForm';

export default async function Home() {
  return (
    <section className='flex flex-col items-center justify-between h-full w-full'>
      <div className='flex justify-center items-center w-full h-full gap-16 mt-8'>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                Bienvenido a Bitacora
              </h1>
              <p className='text-lg font-semibold'>Inicia sesion para poder acceder</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
