'use client';

import ModalPortal from './ModalPortal';
import CloseIcon from '@/components/common/icons/CloseIcon';
import { useModalStore } from '@/store/modal';

type Props = { width?: string; height?: string; onClose?: () => void };

export default function Modal({
  width = 'w-[520px]',
  height = 'h-auto',
  onClose,
}: Props) {
  const { isOpen, content, closeModal } = useModalStore();
  if (!isOpen) return null;
  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  return (
    <ModalPortal>
      <div>
        <div className='fixed top-0 left-0 w-full h-full bg-[rgba(0, 0, 0, 0.5)] z-[3] overflow-hidden'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border rounded-2xl p-4 shadow-md z-[4] overflow-hidden'>
            <div className={`flex flex-col p-2  ${width} ${height}`}>
              {content}
              <button className='absolute top-4 right-4' onClick={handleClose}>
                <CloseIcon className='w-6 h-6' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
