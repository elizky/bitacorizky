import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { en } from '@/lib/texts/en';

const InfoModal = ({ isOpen, onClose }: any) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <ScrollArea>
        <DialogContent className='max-w-2xl w-2/3 max-h-full overflow-y-scroll '>
          <DialogHeader>
            <DialogTitle>
              <h2 className='font-bold'>{en.logModal.title}</h2>
            </DialogTitle>
            <DialogDescription>{en.logModal.subtitle}</DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <h3 className='text-primary'>{en.logModal.changeLog.title}</h3>
            <p>{en.logModal.changeLog.subtitle}</p>
            <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
              {en.logModal.changeLog.list.map((list) => (
                <li key={list}>{list}</li>
              ))}
            </ul>

            <p className='font-mono text-primary text-right'>{en.metadata.author.name}</p>
          </div>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
};

export default InfoModal;
