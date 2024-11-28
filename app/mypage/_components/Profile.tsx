'use client';

import ProfileModifyForm from './ProfileModifyForm';
import Modal from '@/components/Modal';
import { useModalStore } from '@/store/modal';

export default function Profile() {
  const { isOpen, openModal } = useModalStore();
  return (
    <div>
      <h3 className='text-lg'>내 프로필</h3>
      <div className='flex flex-col gap-2'>
        <p>
          닉네임 <span>코드잇</span>
        </p>
        <p>
          E-mail <span>codeit@codeit.com</span>
        </p>
      </div>
      <button onClick={() => openModal(<ProfileModifyForm />)}>수정하기</button>
      {isOpen && <Modal />}
    </div>
  );
}
