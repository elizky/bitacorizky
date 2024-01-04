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
import { en } from '@/lib/texts/en';

const Writing = () => {
  const [content, setContent] = useState<Content>({ type: 'doc', content: [] });
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [image, setImage] = useState<string>('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const { currentUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

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
            title: en.write.toast.error,
            description: error.message,
          });
        }
      );
    } else {
      toast({
        variant: 'destructive',
        title: en.write.toast.error,
        description: en.write.toast.description,
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
            title: en.write.toast.imageSuccess,
          });
        })
        .catch((error) => {
          console.log('error', error);
          toast({
            variant: 'destructive',
            title: en.write.toast.imageServer,
          });
        })
        .finally(() => setIsLoadingImage(false));
    }
  };

  const handleSubmit = async () => {
    setIsLoadingData(true);
    getLocation();
    const errors = validateContent(content, en.write.errors);
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
            title: en.write.toast.writeSuccess,
          });
          router.push(`/`);
        })
        .catch((error) => {
          console.log('error', error);
          toast({
            variant: 'destructive',
            title: en.write.toast.writeServer,
            description: error,
          });
        })
        .finally(() => setIsLoadingData(false));
    } else {
      const errorMessages = Object.values(errors).join(' ');
      toast({
        variant: 'destructive',
        title: en.write.toast.validate,
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
          <Tiptap
            setContent={setContent}
            heading={en.write.tiptap.title}
            paragraph={en.write.tiptap.paragraph}
          />
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
        {en.write.button}
      </Button>
    </div>
  );
};

export default Writing;
