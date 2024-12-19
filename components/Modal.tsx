'use client';

import ModalPortal from './ModalPortal';
import CloseIcon from '@/components/common/icons/CloseIcon';
import { useModalStore } from '@/store/modal';

export default function Modal() {
  const { isOpen, content, closeModal } = useModalStore();
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div>
        <div className='fixed top-0 left-0 w-full h-full bg-[rgba(0, 0, 0, 0.5)] z-[3] overflow-hidden'>
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-4 shadow-md z-[4] overflow-hidden'>
            <div className='flex flex-col p-2 w-[520px]'>
              {content}
              <button className='absolute top-2 right-2' onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
