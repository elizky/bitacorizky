import { X } from 'lucide-react';
import React, { useRef, useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: any;
};

const ImageModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 cursor-auto'>
          <div ref={modalRef} className='flex w-11/12 sm:w-auto  flex-col '>
            <button
              className='my-2 rounded-lg self-end bg-white dark:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary'
              onClick={onClose}
            >
              <X className='hover:text-primary-light transition-colors' />
            </button>
            <div className='shadow-lg'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
