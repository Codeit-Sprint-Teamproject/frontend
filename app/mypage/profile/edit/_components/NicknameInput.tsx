'use client';

import { useState } from 'react';
import { checkDuplicate } from '@/app/auth/signup/_lib/duplicate-check';
import { useProfileQuery } from '@/hooks/userProfileQuery';
import useUserStore from '@/store/userStore';

const NICKANME_REGEX = /^[a-zA-Z0-9가-힣]{1,10}$/;

export default function NicknameInput() {
  const { user, setUser } = useUserStore();
  const [nickname, setNickname] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { updateProfileMutate } = useProfileQuery();

  const validateNickname = async (nickname: string) => {
    if (!NICKANME_REGEX.test(nickname)) {
      return '닉네임은 한글/영문/숫자 포함 10자 이내로 입력하세요.';
    }
    const res = await checkDuplicate('userName', nickname);
    if (res.isDuplicate) {
      return res.message;
    }
    return null;
  };

  const handleChangeNickname = async () => {
    const formData = new FormData();
    const error = await validateNickname(nickname);

    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage('');
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
    <aside
      className={`rounded-sm ${isEdit ? 'bg-customGrey-50 px-5 py-4' : ''}`}
    >
      {isEdit && (
        <p className='font-bold text-customGrey-800 pb-5'>닉네임 변경</p>
      )}
      <div className='flex flex-col gap-1.5'>
        <p className='text-customGrey-800'>닉네임</p>
        <div className='flex gap-3'>
          <input
            type='text'
            value={nickname}
            className={`flex-1 border px-2.5 py-1.5 rounded-sm border-customGrey-200 ${!isEdit ? 'text-customGrey-300' : ''}`}
            placeholder={
              isEdit ? '변경하실 닉네임을 입력해주세요.' : user?.name
            }
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
        <p className='text-sm text-customRed'>{errorMessage}</p>
        {isEdit && (
          <div className='flex justify-end mt-[14px]'>
            <button
              className='text-sm text-customGrey-800 p-2.5'
              onClick={() => setIsEdit(false)}
            >
              취소
            </button>
            <button
              className='w-[74px] h-10 text-sm p-2.5 bg-black text-white rounded-sm'
              onClick={handleChangeNickname}
            >
              저장
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
