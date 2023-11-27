import { Content, ErrorLoginText, ErrorWriteText, ErrorsProps } from './interfaces';

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
