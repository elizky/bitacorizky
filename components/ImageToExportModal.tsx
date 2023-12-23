import { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

interface ImageToExportModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  imageSrc: string;
}

const ImageToExportModal = ({ isOpen, onClose, imageSrc }: ImageToExportModalProps) => {
  const handleDescargarImagen = async () => {
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = imageSrc;
    enlaceDescarga.download = 'mi_diario.png';
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();
    document.body.removeChild(enlaceDescarga);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose(false)}>
      <DialogContent className='max-w-2xl w-2/3 overflow-y-scroll max-h-screen '>
        <DialogHeader>
          <DialogTitle>
            <p className='font-bold'>Compartir Escrito</p>
          </DialogTitle>
        </DialogHeader>

        <div className='justify-self-center'>
          {imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt='shared image preview'
              className='max-w-full h-auto rounded-md shadow-md'
            />
          )}
        </div>
        <DialogFooter className='sm:justify-between w-full'>
          <Button onClick={handleDescargarImagen}>Descargar</Button>
          <Button onClick={() => alert('Compartir en redes sociales')}>Compartir en Redes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageToExportModal;
