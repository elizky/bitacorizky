'use client';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import Greeting from '@/lib/utils/Greeting';

import LogModal from './LogModal';
import { Home, LogOut, MessagesSquare, MoonIcon, Settings, SunIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { en } from '@/lib/texts/en';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className='py-6 px-8 flex items-center justify-between font-catamaran'>
      <div className='flex justify-start w-1/3 '>
        {currentUser ? (
          pathname === '/' ? (
            currentUser && (
              <Greeting
                morning={en.navbar.greeting.morning}
                afternoon={en.navbar.greeting.afternoon}
                nigth={en.navbar.greeting.night}
                name={currentUser.displayName}
              />
            )
          ) : (
            <Button onClick={() => router.push('/')} variant='ghost' size='icon'>
              <Home />
            </Button>
          )
        ) : (
          <h3>{en.metadata.title}</h3>
        )}
      </div>

      <div className='hidden sm:flex gap-4 w-1/3  justify-center'>
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className='
          rounded-lg 
          focus-visible:outline 
          focus-visible:outline-2 
          focus-visible:outline-offset-4 
          focus-visible:outline-primary
          '
        >
          <Badge variant='secondary'>v 1.0.0</Badge>
        </button>
      </div>
      <div className='flex justify-end w-1/3'>
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
                    <SunIcon /> {en.navbar.dropdown.theme.light}
                  </button>
                ) : (
                  <button
                    className='my-1 flex gap-4 items-center  w-full'
                    onClick={() => setTheme('light')}
                  >
                    <MoonIcon /> {en.navbar.dropdown.theme.dark}
                  </button>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push('/feedback')}
                className='my-1 flex gap-4 items-center cursor-pointer'
              >
                <MessagesSquare />
                {en.navbar.dropdown.feedback}
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className='my-1 flex gap-4 items-center cursor-pointer'
              >
                <LogOut /> {en.navbar.dropdown.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <LogModal isOpen={isModalOpen} onClose={setIsModalOpen} />
      </div>
    </header>
  );
};

export default NavBar;
