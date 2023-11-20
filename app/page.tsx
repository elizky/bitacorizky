'use client';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import parser from 'html-react-parser';

import { getWrites } from '@/lib/firebase/utils';

import { useAuth } from '@/lib/context/AuthContext';
import { WriteProps } from '@/lib/utils/interfaces';
import { Camera, CameraOff, LocateFixed, PencilLine } from 'lucide-react';
import Loader from '@/components/ui/Loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import formatDate from '@/lib/utils/formatDate';

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

  // useEffect(() => {
  //   !currentUser && router.push('/login');
  //   currentUser && fetchWrites();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentUser]);

  return (
    <div className='flex flex-col p-8 gap-12 '>
      <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-baseline'>
        <h1 className='font-catamaran text-4xl'>Mis Escritos</h1>
        <Link
          href={'/write'}
          className='
              flex 
              gap-2 
              rounded-3xl border-2 border-primary  
              px-4
              py-2 
              hover:text-white
              hover:bg-primary
              focus:bg-primary-dark
              focus:outline-offset-8
              focus:outline-primary-dark
              dark:hover:outline-white 
              transition-colors'
        >
          Escribir <PencilLine />
        </Link>
      </div>
      {loading ? (
        <div className=' flex justify-center items-center '>
          <Loader />
        </div>
      ) : writes.length === 0 ? (
        <div className='flex flex-col justify-center items-center gap-4'>
          <h3>No tienes escritos</h3>
          <Link
            href={'/write'}
            className='
            flex 
            justify-center 
            my-2
            px-6
            py-4
            rounded-3xl 
            font-semibold uppercase
            text-white text-center
            bg-primary 
            shadow 
            hover:bg-primary-light
            transition
            focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-2 
            focus-visible:outline-primary'
          >
            Haz click aqui para comenzar a escribir
          </Link>
        </div>
      ) : (
        <div className='flex justify-center lg:justify-start items-center flex-wrap gap-8'>
          {writesFilter.map((write) => (
            <Card key={write.id}>
              <CardHeader>
                <CardTitle>{parser(write.title)}</CardTitle>
                <CardDescription>
                  <p className='font-cormorant italic'>{formatDate(write.publishAt)}</p>
                  {write.location && <LocateFixed />}
                  {write.image ? <Camera /> : <CameraOff />}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
