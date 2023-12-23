import html2canvas from 'html2canvas';

export const exportImage = async (elementId: string, fileName: string): Promise<string> => {
  const elemento = document.getElementById(elementId);

  if (!elemento) {
    console.error(`No se encontró el elemento con el ID ${elementId}`);
    return '';
  }

  const canvas = await html2canvas(elemento);
  const dataUrl = canvas.toDataURL('image/png');

  return dataUrl;
};
