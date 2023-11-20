'use client';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import Greeting from '@/lib/utils/Greeting';

import InfoModal from '../ui/InfoModal';
import {
  HelpCircle,
  Home,
  LogOut,
  MessagesSquare,
  MoonIcon,
  Settings,
  SunIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import path from 'path';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  const { theme, setTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  console.log('pathname', pathname);
  console.log('currentUser', currentUser);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  useEffect(() => {
    const hasShownModal = localStorage.getItem('hasShownModal-1.0.0');
    if (!hasShownModal) {
      setIsModalOpen(true);
      setHasShownModal(false);
      localStorage.setItem('hasShownModal-1.0.0', 'true');
    } else {
      setHasShownModal(true);
    }
  }, []);

  return (
    <header className='py-6 px-8 flex items-center justify-between font-catamaran'>
      {pathname !== '/login' &&
        (pathname === '/' ? (
          currentUser && (
            <Greeting
              morning='Buenos días'
              afternoon='Buenas tardes'
              nigth='buenas noches'
              name={currentUser.displayName}
            />
          )
        ) : (
          <Button onClick={() => router.push('/')} variant='ghost' size='icon'>
            <Settings />
          </Button>
        ))}
      {pathname !== '/login' && (
        <button
          onClick={toggleModal}
          className='
       rounded-lg 
       focus-visible:outline 
       focus-visible:outline-2 
       focus-visible:outline-offset-4 
       focus-visible:outline-primary
     '
        >
          <HelpCircle
            className={`hover:text-primary-light transition-colors ${
              isModalOpen && 'text-primary'
            }`}
          />
        </button>
      )}
      {pathname !== '/login' && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Settings />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='right-50 top-10 w-48 mr-10 '>
            <DropdownMenuItem className='cursor-pointer'>
              {theme !== 'dark' ? (
                <button
                  className='my-1 flex gap-4 items-center w-full'
                  onClick={() => setTheme('dark')}
                >
                  <SunIcon /> Claro
                </button>
              ) : (
                <button
                  className='my-1 flex gap-4 items-center  w-full'
                  onClick={() => setTheme('light')}
                >
                  <MoonIcon /> Oscuro
                </button>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push('/feedback')}
              className='my-1 flex gap-4 items-center cursor-pointer'
            >
              <MessagesSquare />
              Feedback
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className='my-1 flex gap-4 items-center cursor-pointer'
            >
              <LogOut /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <InfoModal isOpen={isModalOpen} onClose={setIsModalOpen} />
    </header>
  );
};

export default Header;
