'use client';

import ImageIcon from '../_svg/ImageIcon';
import { useModalStore } from '@/store/modal';

export default function ProfileModifyForm() {
  const { closeModal } = useModalStore();
  return (
    <div className='text-black'>
      <h3 className='text-lg font-semibold mb-4'>프로필 수정하기</h3>
      <div className='flex flex-col gap-3 mb-3'>
        <ImageIcon />
        <p className='font-semibold'>닉네임</p>
        <input
          className='w-full h-11 border rounded-xl px-4 py-2'
          type='text'
          value='코드잇'
          readOnly
        />
      </div>
      <div className='flex items-center gap-4 font-semibold'>
        <button
          className='w-[472px] h-11 rounded-xl border border-[#EA580C] text-[#EA580C]'
          onClick={closeModal}
        >
          취소
        </button>
        <button className='w-[472px] h-11 rounded-xl border bg-[#9CA3AF] text-white'>
          수정하기
        </button>
      </div>
    </div>
  );
}
