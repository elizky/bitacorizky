import React from 'react';
import parser from 'html-react-parser';
import useContent from '@/lib/hooks/useContent';
import { Card, CardDescription, CardHeader, CardTitle } from './card';
import formatDate from '@/lib/utils/formatDate';
import { Camera, CameraOff, LocateFixed } from 'lucide-react';
import { WriteProps } from '@/lib/utils/interfaces';
import Link from 'next/link';

type WriteCardProps = {
  data: WriteProps;
};

const WriteCard = ({ data }: WriteCardProps) => {
  const { content, id, publishAt, location, image } = data;
  const { title } = useContent(content);

  return (
    <Link href={`/writes/${encodeURIComponent(id)}`}>
      <Card
        key={id}
        className='
            w-72 h-28
            space-y-4 
            cursor-pointer 
            rounded-sm 
            outline-none 
            dark:outline-paper 
            dark:hover:bg-paper 
            hover:bg-secondary 
            transition-all 
        '
      >
        <CardHeader>
          <CardTitle>{parser(title)}</CardTitle>
          <CardDescription className='flex items-center justify-between'>
            <p className='font-cormorant italic'>{formatDate(publishAt)}</p>
            {location && <LocateFixed />}
            {image ? <Camera /> : <CameraOff />}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default WriteCard;
