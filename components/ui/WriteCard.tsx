import React from 'react';
import parser from 'html-react-parser';
import useContent from '@/lib/hooks/useContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import formatDate from '@/lib/utils/formatDate';
import { Camera, CameraOff, LocateFixed } from 'lucide-react';
import { WriteProps } from '@/lib/utils/interfaces';
import Link from 'next/link';
import { en } from '@/lib/texts/en';

type WriteCardProps = {
  data: WriteProps;
};

const WriteCard = ({ data }: WriteCardProps) => {
  const { content, id, publishAt, location, image } = data;
  const { title } = useContent(content);

  return (
    <Card key={id} className='w-72'>
      <CardHeader>
        <CardTitle>{parser(title)}</CardTitle>
        <CardDescription className='flex items-center justify-between mt-4 font-cormorant italic'>
          {formatDate(publishAt)}
          {location && <LocateFixed />}
          {image ? <Camera /> : <CameraOff />}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/writes/${encodeURIComponent(id)}`} className='hover:underline text-primary'>
          {en.home.goTo}
        </Link>
      </CardContent>
    </Card>
  );
};

export default WriteCard;
