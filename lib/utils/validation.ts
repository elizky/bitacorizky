import { Content, ErrorLoginText, ErrorWriteText, ErrorsProps } from './interfaces';
import * as z from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(1, 'El nombre no puede estar vacío').max(25, 'Maximo 25 caracteres'),
  email: z
    .string()
    .min(1, 'El email no puede estar vacío')
    .email('El email debe tener un formato válido')
    .min(3),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email no puede estar vacío')
    .email('El email debe tener un formato válido')
    .min(3),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
export const validateContent = (content: Content, errorText: ErrorWriteText): ErrorsProps => {
  let errors: { [key: string]: string } = {};

  if (!content) {
    errors.content = errorText.contentError;
  }

  const hasTitle = content.content.some(
    (item) => item.type === 'heading' && item.content && item.content.length > 0
  );
  if (!hasTitle) {
    errors.title = errorText.titleError;
  }

  const hasParagraph = content.content.some(
    (item) => item.type === 'paragraph' && item.content && item.content.length > 0
  );
  if (!hasParagraph) {
    errors.paragraph = errorText.paragraphError;
  }

  return errors;
};

export const checkError = (error: string, errorText: ErrorLoginText) => {
  let errorMessage = '';
  if (error === 'Firebase: Error (auth/user-not-found).') {
    return (errorMessage = errorText.firebaseUser);
  }
  if (error === 'Firebase: Error (auth/wrong-password).') {
    return (errorMessage = errorText.firebasePassword);
  }
};
