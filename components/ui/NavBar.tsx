'use client';
import { useState } from 'react';
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
import { Badge } from './badge';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className='py-6 px-8 flex items-center justify-between font-catamaran'>
      <div className='flex justify-start'>
        {currentUser &&
          (pathname === '/' ? (
            currentUser && (
              <Greeting
                morning='Buenos días'
                afternoon='Buenas tardes'
                nigth='Buenas noches'
                name={currentUser.displayName}
              />
            )
          ) : (
            <Button onClick={() => router.push('/')} variant='ghost' size='icon'>
              <Home />
            </Button>
          ))}
      </div>

      <div className='flex  gap-4'>
        {/* {currentUser && (
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
          )} */}
        <Badge variant='secondary'>v 0.1.0</Badge>
      </div>
      <div>
        {currentUser && (
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
      </div>
    </header>
  );
};

export default Header;
