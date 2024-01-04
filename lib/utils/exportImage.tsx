import html2canvas from 'html2canvas';
import { en } from '../texts/en';

export const exportImage = async (elementId: string): Promise<string> => {
  const elemento = document.getElementById(elementId);

  if (!elemento) {
    console.error(`${en.writes.error.image} ${elementId}`);
    return '';
  }

  const canvas = await html2canvas(elemento);
  const dataUrl = canvas.toDataURL('image/png');

  return dataUrl;
};
