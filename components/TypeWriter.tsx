'use client';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
const TypeWriter = () => {
  const title = 'Con Bitacorizky';
  const subtitle1 = 'Descubre un espacio seguro para expresar tus pensamientos y emociones.';
  const subtitle2 = 'Registra tus experiencias diarias desde cualquier lugar del mundo.';
  const subtitle3 = 'Guarda la ubicación de tus escritos y observa tu viaje a lo largo del tiempo.';
  const subtitle4 = 'Haz lo simple: escribe lo que sientes';

  const [text] = useTypewriter({
    words: [subtitle1, subtitle2, subtitle3, subtitle4],
    loop: 0,
    typeSpeed: 20,
    deleteSpeed: 30,
    delaySpeed: 2000,
  });

  return (
    <div>
      <p className='text-xl font-semibold'>{title}</p>
      <span className='text-xl text-muted-foreground'>{text}</span>
      <Cursor cursorColor='#EA580C' />
    </div>
  );
};

export default TypeWriter;
