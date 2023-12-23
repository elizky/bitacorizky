'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useAuth } from '@/lib/context/AuthContext';
import { addWrite, uploadImage } from '@/lib/firebase/utils';

import { validateContent } from '@/lib/utils/validation';
import { Content, ErrorWriteText } from '@/lib/utils/interfaces';
import { useToast } from '@/components/ui/use-toast';

import Tiptap from '@/components/Tiptap';
import { Camera, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Writing = () => {
  const [content, setContent] = useState<Content>({ type: 'doc', content: [] });
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [image, setImage] = useState<string>('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const { currentUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const errorText: ErrorWriteText = {
    contentError: 'El contenido es requerido',
    titleError: 'El título es requerido',
    paragraphError: 'El párrafo es requerido',
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          toast({
            variant: 'destructive',
            title: 'Error al obtener la ubicación',
            description: error.message,
          });
        }
      );
    } else {
      toast({
        variant: 'destructive',
        title: 'Error al obtener la ubicación',
        description: 'Geolocalización no soportada en este dispositivo',
      });
    }
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoadingImage(true);
      uploadImage(file, currentUser.uid)
        .then((data) => {
          setImage(data);
          toast({
            title: '¡La imagen se cargó correctamente!',
          });
        })
        .catch((error) => {
          console.log('error', error);
          toast({
            variant: 'destructive',
            title: 'Hubo un error al cargar la imagen',
          });
        })
        .finally(() => setIsLoadingImage(false));
    }
  };

  const handleSubmit = async () => {
    setIsLoadingData(true);
    getLocation();
    const errors = validateContent(content, errorText);
    const currentDate = new Date();
    const publishAt = currentDate.toISOString();

    if (Object.keys(errors).length === 0) {
      const newWrite = {
        content,
        location,
        image,
        publishAt,
        authorId: currentUser.uid,
      };
      addWrite(newWrite)
        .then(() => {
          toast({
            title: '¡El escrito se guardó correctamente!',
          });
          router.push(`/`);
        })
        .catch((error) => {
          console.log('error', error);
          toast({
            variant: 'destructive',
            title: 'Hubo error en la conexion',
            description: error,
          });
        })
        .finally(() => setIsLoadingData(false));
    } else {
      const errorMessages = Object.values(errors).join(' ');
      toast({
        variant: 'destructive',
        title: 'Hubo error en la validación del contenido',
        description: errorMessages,
      });
    }
  };

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='flex flex-col p-8 gap-12 '>
      <div className='flex justify-between bg-secondary/40'>
        <div className='flex justify-center w-5/6 lg:w-11/12 lg:justify-start items-center flex-wrap font-catamaran'>
          <Tiptap setContent={setContent} heading='Titulo' paragraph='Escribe lo que sientes' />
        </div>
        <label className='w-1/12 h-fit pr-8 flex flex-col items-center pt-8 text:black dark:text-white cursor-pointer hover:text-primary dark:hover:text-primary transition'>
          <Camera className={isLoadingImage ? ' text-gray-500 ' : ''} />
          <input
            type='file'
            onChange={handleImageUpload}
            className='hidden'
            title='hola'
            accept='image/*'
          />
        </label>
      </div>
      <div className='flex items-center justify-center'>
        {isLoadingImage && <Loader2 className='animate-spin' />}
        {image && <Image src={image} alt={`imagen de ${image}`} height={500} width={500} />}
      </div>
      <Button onClick={handleSubmit} className='gap-4 text-base m-auto'>
        {isLoadingData ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Save />}
        Guardar
      </Button>
    </div>
  );
};

export default Writing;
