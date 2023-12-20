'use client';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import Greeting from '@/lib/utils/Greeting';

import InfoModal from './InfoModal';
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
          )
        ) : (
          <h3>Bitacorizky</h3>
        )}
      </div>

      <div className='hidden sm:flex gap-4 w-1/3  justify-center'>
        <Badge variant='secondary'>v 0.1.0</Badge>
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

export default NavBar;
