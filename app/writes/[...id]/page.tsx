'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getWrite } from '@/lib/firebase/utils';
import parser from 'html-react-parser';
import useContent from '@/lib/hooks/useContent';
import Image from 'next/image';

import ImageModal from '@/components/ui/ImageModal';
import { useAuth } from '@/lib/context/AuthContext';
import { WriteProps } from '@/lib/utils/interfaces';
import formatDate from '@/lib/utils/formatDate';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { getLocationWrite } from '@/lib/services';
import { set } from 'zod';
import Loader from '@/components/ui/Loader';
import { Loader2 } from 'lucide-react';

interface WritePageProps {
  params: {
    id: string[];
  };
}
const Write = ({ params }: WritePageProps) => {
  const [write, setWrite] = useState<WriteProps>();
  const [location, setLocation] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { currentUser } = useAuth();
  const { title, paragraphs } = useContent(write?.content);
  const { toast } = useToast();

  const fetchWrite = () => {
    setLoading(true);
    getWrite(params.id[0])
      .then((data) => {
        setWrite(data);
        getLocationWrite(data.location.lat, data.location.lng).then((data) => setLocation(data));
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Error al obtener la ubicación',
          description: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  useEffect(() => {
    !currentUser && router.push('/login');
    currentUser && fetchWrite();
    write && write.authorId !== currentUser.uid && router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col p-8 gap-12 flex-wrap'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='flex flex-col md:flex-row gap-2 justify-between items-baseline flex-wrap'>
            <h1 className=''>{parser(title)}</h1>
            <p className='font-cormorant italic '>
              {write && location && formatDate(write.publishAt)}
              {location && ` - Cerca de ${location}`}
            </p>
          </div>
          <div className='flex flex-col flex-wrap gap-8 items-start'>
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{parser(paragraph)}</p>
            ))}
            {write && write.image !== '' && (
              <div
                className={`w-auto m-auto items-center flex justify-center cursor-pointer ${
                  !showModal && 'hover:opacity-80'
                } transition-all`}
              >
                {showModal && (
                  <ImageModal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Image
                      src={write.image}
                      alt={`imagen de ${parser(title)}`}
                      height={400}
                      width={400}
                      onClick={closeModal}
                    />
                  </ImageModal>
                )}
                <div className='relative'>
                  {write && isImageLoading && <Skeleton className='w-[200] h-[200] rounded-full' />}
                  <Image
                    src={write.image}
                    alt={`imagen de ${parser(title)}`}
                    height={200}
                    width={200}
                    onLoad={handleImageLoad}
                    onClick={openModal}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Write;
