import { en } from '@/lib/texts/en';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='py-6 px-8 flex items-center justify-end'>
      <p className='font-mono text-xs'>
        {en.footer.createdBy}
        <Link href='https://www.izky.dev/' target='_blank' className='hover:underline'>
          {en.footer.name}
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
