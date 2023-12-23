interface ImageToExportProps {
  titulo: string | JSX.Element | JSX.Element[];
  fecha: string;
  parrafos: string | JSX.Element | JSX.Element[];
}

const ImageToExport: React.FC<ImageToExportProps> = ({ titulo, fecha, parrafos }) => {
  return (
    <div
      id='entrada-diario'
      className="flex flex-col justify-center self-center rounded-md bg-[url('public/wallpaper.jpg')] w-[400px] h-[600px] py-12 px-8 gap-1"
    >
      <div className='font-semibold'>{titulo}</div>
      <div className='italic text-xs'>{fecha}</div>
      <div className='text-sm mt-4 leading-relaxed'>{parrafos}</div>
    </div>
  );
};

export default ImageToExport;
