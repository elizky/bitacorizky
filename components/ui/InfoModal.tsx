import React from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from './button';

const InfoModal = ({ isOpen, onClose }: any) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl w-2/3 overflow-y-scroll max-h-screen '>
        <DialogHeader>
          <DialogTitle>
            <h3 className='font-bold'>Así funciona Bitacorizky</h3>
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <p>
            ¡Hola y bienvenido a Bitácora! Esta aplicación te permite mantener un diario íntimo
            digital donde puedes registrar tus pensamientos, ideas y experiencias de forma privada.
            <br />
            Aquí tienes un vistazo de las características que encontrarás en cada página:
          </p>
          <p>
            En la página de{' '}
            <Link
              href={'/'}
              className='font-bold text-primary hover:text-primary/90 underline underline-offset-2 decoration-primary'
            >
              Inicio
            </Link>
            , podrás ver todas las entradas que has registrado en tu Bitácora personal. Aquí podrás
            revivir tus recuerdos, explorar tus pensamientos anteriores y si deseas ver más en
            detalle algún recuerdo en particular, simplemente haz clic en el recuerdo
            correspondiente y serás redirigido a una página donde podrás explorar el recuerdo de
            manera más completa. Es un espacio privado donde solo tú puedes acceder y disfrutar de
            tus propias reflexiones.
          </p>
          <p>
            En la página de{' '}
            <Link
              href={'/write'}
              className='font-bold text-primary hover:text-primary/90 underline underline-offset-2 decoration-primary'
            >
              Escribir
            </Link>
            , tendrás la oportunidad de plasmar tus pensamientos más íntimos. Al escribir tendrás la
            opción de darle formato al texto, resaltando palabras o párrafos importantes
            (seleccionando con el mouse). Podrás añadir una foto para capturar momentos especiales.
            Si lo deseas, también puedes permitirnos acceder a tu ubicación para que podamos
            mostrarla junto con tu entrada. ¡Así podrás recordar dónde estabas cuando escribiste
            esas líneas llenas de emoción!
          </p>
          <p>
            Recuerda que en la parte superior de la página encontrarás un icono de configuración. Al
            hacer clic en él, podrás acceder a las opciones de configuración, donde podrás cambiar
            el tema de la aplicación y cerrar sesión cuando desees.
          </p>
          <p>
            Además, nos encantaría recibir tus comentarios y sugerencias. ¡Ayúdanos a mejorar
            Bitácora compartiendo tu feedback! Haz clic en el botón &apos;Enviar Feedback&apos; a
            continuación y serás redirigido a un formulario donde podrás compartir tus opiniones con
            nosotros.
          </p>
          <Button className='m-auto'>
            <Link href={'/feedback'}> Enviar Feedback</Link>
          </Button>

          <p>
            ¡Estamos emocionados por compartir más características emocionantes en futuras
            actualizaciones! Apreciamos tu apoyo y tu contribución para hacer de Bitácora la mejor
            experiencia para ti.
          </p>
          <p>¡Gracias por ser parte de nuestra comunidad!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
