'use client';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useAuth } from '@/lib/context/AuthContext';

import { getWrites } from '@/lib/firebase/utils';

import { WriteProps } from '@/lib/utils/interfaces';
import { PencilLine } from 'lucide-react';
import Loader from '@/components/ui/Loader';
import WriteCard from '@/components/ui/WriteCard';
import { buttonVariants } from '@/components/ui/button';

const Home = () => {
  const [writes, setWrites] = useState<WriteProps[]>([]);
  const [loading, setLoading] = useState(false);

  const writesFilter = writes.sort(
    (a, b) => new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime()
  );

  const { currentUser } = useAuth();
  const router = useRouter();

  const fetchWrites = async () => {
    const writesData = await getWrites(currentUser.uid);
    setWrites(writesData);
    setLoading(false);
  };

  useEffect(() => {
    !currentUser && router.push('/login');
    currentUser && fetchWrites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className='flex flex-col p-8 gap-12 '>
      <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-center'>
        <h1>Mis Escritos</h1>
        <Link href={'/write'} className={buttonVariants({ variant: 'default' })}>
          <div className='flex gap-4 items-center'>
            <p className='text-base'>Escribir</p>
            <PencilLine />
          </div>
        </Link>
      </div>
      {loading ? (
        <div className=' flex justify-center items-center '>
          <Loader />
        </div>
      ) : writes.length === 0 ? (
        <div className='flex flex-col justify-center items-center gap-4'>
          <h3 className='italic'>No tienes escritos</h3>
          <Link href={'/write'} className={buttonVariants({ variant: 'default' })}>
            <div className='flex gap-4 items-center'>
              <p className='text-base'>Comenza a escribir</p>
            </div>
          </Link>
        </div>
      ) : (
        <div className='flex justify-center lg:justify-start items-center flex-wrap gap-8'>
          {writesFilter.map((write) => (
            <WriteCard key={write.id} data={write} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
