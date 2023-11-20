import { Content, ErrorLoginText, ErrorWriteText, ErrorsProps } from './interfaces';

// export const validateLogin = (
//   email: string,
//   password: string,
//   errorText: ErrorLoginText
// ): ErrorsProps => {
//   let errors: { email?: string; password?: string } = {};

//   // Validación del email
//   if (validator.isEmpty(email)) {
//     errors.email = errorText.emailEmpty;
//   } else if (!validator.isEmail(email)) {
//     errors.email = errorText.emailFormat;
//   }

//   // Validación de la contraseña
//   if (validator.isEmpty(password)) {
//     errors.password = errorText.passwordError;
//   } else if (password.length < 6) {
//     errors.password = errorText.passwordValidate;
//   }

//   return errors;
// };

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
