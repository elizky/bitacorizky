'use client';
import { en } from '@/lib/texts/en';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
const TypeWriter = () => {
  const [text] = useTypewriter({
    words: [
      en.typeWritter.subtitle1,
      en.typeWritter.subtitle2,
      en.typeWritter.subtitle3,
      en.typeWritter.subtitle4,
    ],
    loop: 0,
    typeSpeed: 20,
    deleteSpeed: 30,
    delaySpeed: 2000,
  });

  return (
    <div>
      <p className='text-xl font-semibold'>{en.typeWritter.title}</p>
      <span className='text-xl text-muted-foreground'>{text}</span>
      <Cursor cursorColor='#EA580C' />
    </div>
  );
};

export default TypeWriter;
