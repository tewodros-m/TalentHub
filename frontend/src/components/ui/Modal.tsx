import React, { useRef } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside([modalRef], onClose, isOpen);

  if (!isOpen) return null;

  return (
    <div
      className='fixed top-0 left-0 w-screen h-screen inset-0 z-50 flex items-center justify-center bg-[rgba(var(--color-bg),0.1)] backdrop-blur-sm'
      role='dialog'
      aria-modal='true'
    >
      <div
        ref={modalRef}
        className='bg-bg rounded-xl shadow-2xl w-full text-gray-600 max-w-lg p-6 dark:border dark:border-primary-200 relative'
      >
        {/* Close Button */}
        <Button
          onClick={onClose}
          size='custom'
          variant='custom'
          className='absolute top-0 right-0 p-1 border-none'
        >
          <X size={26} />
        </Button>

        {/* Title */}
        {title && (
          <h3 className='text-xl font-bold mb-4 text-primary-600'>{title}</h3>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
