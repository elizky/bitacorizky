import React from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

const InfoModal = ({ isOpen, onClose }: any) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <ScrollArea>
        <DialogContent className='max-w-2xl w-2/3 max-h-96 overflow-y-scroll '>
          <DialogHeader>
            <DialogTitle>
              <h3 className='font-bold'>Bitacorizky salió 🎉🚀</h3>
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            <p>
              ¡Hola y bienvenido a Bitacorizky! Esta aplicación te permite mantener un diario íntimo
              digital donde puedes registrar tus pensamientos, ideas y experiencias de forma
              privada.
              <br />
              Aquí tienes un vistazo de las características que encontrarás:
            </p>
            <h4 className='text-primary'>Inicio</h4>
            <p>
              Aqui podrás ver todas las entradas que has registrado en tu Bitacorizky. Revive tus
              recuerdos, explora tus pensamientos anteriores y si deseas ver más, ingresa al escrito
              y mira el recuerdo de manera más completa.
            </p>
            <h4 className='text-primary'>Escrito</h4>
            <p>
              Mira en detalle lo que escribiste, en donde y cuando. Puedes compartir tu escrito si
              asi lo deseas, descargando la imagen autogenerada para que la puedas postear en tu red
              social favorita
            </p>
            <h4 className='text-primary'>Escribir</h4>
            <p>
              Plasma tus pensamientos más íntimos. Al escribir tendrás la opción de darle formato al
              texto, resaltando palabras o párrafos importantes. Podrás añadir una foto para
              capturar momentos especiales. Si lo deseas, también puedes permitirnos acceder a tu
              ubicación para que podamos mostrarla junto con tu entrada. ¡Así podrás recordar dónde
              estabas cuando escribiste esas líneas llenas de emoción!
            </p>
            <h4>¡Gracias por ser parte de nuestra comunidad!</h4>
            <p>
              ¡Ayúdanos a mejorar Bitacorizky compartiendo tu feedback! Haz click en el botón
              &apos;Enviar Feedback&apos; a continuación y serás redirigido a un formulario donde
              podrás compartir tus opiniones con nosotros.
            </p>
            <Button className='w-1/4 m-auto' variant='default' onClick={() => onClose(!isOpen)}>
              <Link href={'/feedback'}> Enviar Feedback</Link>
            </Button>

            <p>
              ¡Estamos emocionados por compartir más características emocionantes en futuras
              actualizaciones! Apreciamos tu apoyo y tu contribución para hacer de Bitacorizky la
              mejor experiencia para ti.
            </p>
            <p className='font-mono text-primary text-right'>Izky</p>
          </div>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
};

export default InfoModal;
