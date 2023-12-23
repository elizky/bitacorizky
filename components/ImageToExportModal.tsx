import { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import ImageToExport from './ImageToExport';
import { exportImage } from '@/lib/utils/exportImage';

interface ImageToExportModalProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  titulo: string | JSX.Element | JSX.Element[];
  fecha: string;
  parrafos: string | JSX.Element | JSX.Element[];
}

const ImageToExportModal = ({
  isOpen,
  onClose,
  titulo,
  fecha,
  parrafos,
}: ImageToExportModalProps) => {


  const handleDescargarImagen = async () => {
    const imageUrl = await exportImage('entrada-diario');
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = imageUrl;
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
          <ImageToExport titulo={titulo} fecha={fecha} parrafos={parrafos} />
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
