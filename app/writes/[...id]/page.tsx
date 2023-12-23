'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getWrite } from '@/lib/firebase/utils';
import parser from 'html-react-parser';
import useContent from '@/lib/hooks/useContent';

import { useAuth } from '@/lib/context/AuthContext';
import { WriteProps } from '@/lib/utils/interfaces';
import formatDate from '@/lib/utils/formatDate';
import { getLocationWrite } from '@/lib/services';
import { exportImage } from '@/lib/utils/exportImage';

import { ImageZoom } from '@/components/ImageZoom';
import Loader from '@/components/ui/Loader';
import ImageToExportModal from '@/components/ImageToExportModal';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { ArrowUpRightSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageToExport from '@/components/ImageToExport';

interface WritePageProps {
  params: {
    id: string[];
  };
}
const Write = ({ params }: WritePageProps) => {
  const [write, setWrite] = useState<WriteProps>();
  const [location, setLocation] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null);

  const router = useRouter();
  const { currentUser } = useAuth();
  const { title, paragraphs } = useContent(write?.content);
  const { toast } = useToast();

  // Textos
  const titleParsed = parser(title);
  const dateAndPlace = `${write && location && formatDate(write.publishAt)}  ${
    location && ` - Cerca de ${location}`
  }`;
  const parr = paragraphs.map((paragraph, index) => <p key={index}>{parser(paragraph)}</p>);

  const fetchWrite = () => {
    setLoading(true);
    setIsImageLoading(true);
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
        setIsImageLoading(false);
      });
  };

  const handleGenerarImagen = async () => {
    const imageUrl = await exportImage('entrada-diario', 'mi_diario.png');
    setPreviewImageSrc(imageUrl);
    setPreviewModalOpen(true);
  };

  useEffect(() => {
    !currentUser && router.push('/login');
    currentUser && fetchWrite();
    write && write.authorId !== currentUser.uid && router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col p-8 gap-12 flex-wrap mi-elemento'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='flex flex-col md:flex-row gap-2 justify-between items-baseline flex-wrap'>
            <div className='flex items-center gap-8'>
              <h1 id='title'>{titleParsed}</h1>
              <Button
                onClick={handleGenerarImagen}
                variant='ghost'
                size='icon'
                className='text-muted-foreground'
              >
                <ArrowUpRightSquare />
              </Button>
            </div>
            <p className='font-cormorant italic ' id='date'>
              {dateAndPlace}
            </p>
          </div>
          <div className='flex flex-col flex-wrap gap-8 items-start' id='parr'>
            {parr}
          </div>
          <div>
            {write && write.image !== '' && (
              <div className={` m-auto items-center flex justify-center cursor-zoom-in `}>
                {write && isImageLoading ? (
                  <Skeleton className='w-[200px] h-[200px]' />
                ) : (
                  <ImageZoom
                    src={write.image}
                    alt={`imagen de ${parser(title)}`}
                    options={{
                      margin: 10,
                      background: '#000000e3',
                      scrollOffset: 20,
                    }}
                    width={300}
                    height={300}
                  />
                )}
              </div>
            )}
          </div>
        </>
      )}
      <ImageToExportModal
        isOpen={isPreviewModalOpen}
        onClose={setPreviewModalOpen}
        imageSrc={previewImageSrc || ''}
      />

      <ImageToExport titulo={titleParsed} fecha={dateAndPlace} parrafos={parr} />
    </div>
  );
};

export default Write;
