import { en } from '../texts/en';
import { Content, ErrorLoginText, ErrorWriteText, ErrorsProps } from './interfaces';
import * as z from 'zod';

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, en.validations.register.name.min)
    .max(25, en.validations.register.name.max),
  email: z
    .string()
    .min(1, en.validations.register.email.min)
    .email(en.validations.register.email.valid)
    .min(3),
  password: z.string().min(6, en.validations.register.password.min),
});
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, en.validations.register.email.min)
    .email(en.validations.register.email.valid)
    .min(3),
  password: z.string().min(6, en.validations.register.password.min),
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
  if (error === en.validations.firebaseError.user) {
    return (errorMessage = errorText.firebaseUser);
  }
  if (error === en.validations.firebaseError.password) {
    return (errorMessage = errorText.firebasePassword);
  }
};
