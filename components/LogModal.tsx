import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from './ui/scroll-area';

const InfoModal = ({ isOpen, onClose }: any) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <ScrollArea>
        <DialogContent className='max-w-2xl w-2/3 max-h-full overflow-y-scroll '>
          <DialogHeader>
            <DialogTitle>
              <h2 className='font-bold'>Changelog</h2>
            </DialogTitle>
            <DialogDescription>Últimos cambios de Bitacorizky y anuncios</DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <h3 className='text-primary'>Enero 2024 - First Release </h3>
            <p>Salió Bitacorizky con sus primeras features:</p>
            <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
              <li>Loguearte con Google y Facebook o crear tu propio usuario</li>
              <li>Permitir guardar la ubicacion cuando escribis</li>
              <li>Poder subir una imagen cuando escribis</li>
              <li>Poder descargar una imagen del escrito cuando lo terminas</li>
              <li>Cambiar tema claro/oscuro</li>
            </ul>

            <p className='font-mono text-primary text-right'>Izky</p>
          </div>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
};

export default InfoModal;
