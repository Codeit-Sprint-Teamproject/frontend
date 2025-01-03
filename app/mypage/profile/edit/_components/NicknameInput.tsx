'use client';

import { useState } from 'react';
import { useProfileQuery } from '@/hooks/userProfileQuery';
import useUserStore from '@/store/userStore';

export default function NicknameInput() {
  const { user, setUser } = useUserStore();
  const [nickname, setNickname] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const { updateProfileMutate } = useProfileQuery();

  const handleChangeNickname = () => {
    const formData = new FormData();
    const form = JSON.stringify({
      userName: nickname,
      email: user?.email,
    });
    formData.append('data', form);
    updateProfileMutate(formData, {
      onSuccess: () => {
        setUser({ ...user!, name: nickname });
        setIsEdit(false);
      },
    });
  };
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-customGrey-800'>닉네임</p>
      <div className='flex gap-3'>
        <input
          type='text'
          value={isEdit ? nickname : ''}
          className='flex-1 border px-2.5 py-1.5 rounded-sm border-customGrey-200'
          placeholder={user?.name}
          onChange={(e) => setNickname(e.target.value)}
          disabled={!isEdit}
        />
        {!isEdit && (
          <button
            className='h-11 p-2.5 bg-customGrey-800 text-white rounded-sm'
            onClick={() => setIsEdit(true)}
          >
            변경하기
          </button>
        )}
      </div>
      {isEdit && (
        <div className='flex justify-end'>
          <button className='p-2.5' onClick={() => setIsEdit(false)}>
            취소
          </button>
          <button
            className='w-[74px] p-2.5 bg-black text-white rounded-sm'
            onClick={handleChangeNickname}
          >
            저장
          </button>
        </div>
      )}
    </div>
  );
}
