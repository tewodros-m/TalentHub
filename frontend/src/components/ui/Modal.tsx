import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed top-0 left-0 w-screen h-screen inset-0 z-10 flex items-center justify-center bg-bg bg-opacity-70'
      role='dialog'
      aria-modal='true'
    >
      <div className='bg-bg rounded-xl shadow-2xl w-full max-w-lg p-6 dark:border dark:border-primary-200 relative'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-1 right-1 text-gray-500 hover:text-gray-800'
        >
          <X size={36} />
        </button>

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
