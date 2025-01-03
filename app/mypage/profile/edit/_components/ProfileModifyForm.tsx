'use client';

import { useState } from 'react';
import NicknameInput from './NicknameInput';
import PasswordInput from './PasswordInput';
import ProfileImageUploader from './ProfileImageUploader';
import Avatar from '@/components/common/icons/Avatar';
import useUserStore from '@/store/userStore';
import Image from 'next/image';

export default function ProfileModifyForm() {
  const { user } = useUserStore();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <section className='w-[518px] flex flex-col gap-7'>
      {isEdit ? (
        <ProfileImageUploader setIsEdit={setIsEdit} />
      ) : (
        <div className='px-4 pt-4 pb-5 border rounded-sm'>
          <h4 className='text-lg text-customGrey-800 font-bold mb-4'>
            내 계정
          </h4>
          <div className='flex gap-4'>
            {user?.profile ? (
              <Image
                src={user.profile}
                className='w-[60px] h-[60px] border border-customGrey-100 rounded-full'
                width={60}
                height={60}
                alt='프로필'
              />
            ) : (
              <Avatar className='w-[45px] h-[45px]' />
            )}
            <div className='flex justify-between flex-1'>
              <div>
                <p className='font-bold text-customGrey-800 text-lg'>
                  {user?.name}
                </p>
                <p className='text-sm text-customGrey-300'>{user?.email}</p>
              </div>
              <button
                className='w-[74px] h-11 p-2 bg-customGrey-800 text-white text-sm rounded-sm'
                onClick={() => setIsEdit(true)}
              >
                변경하기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='w-full border px-4 pt-4 pb-5 rounded-sm'>
        <h4 className='text-lg font-bold text-customGrey-800 mb-8'>내 정보</h4>
        <div className='flex flex-col gap-7'>
          <NicknameInput />
          <div className='flex flex-col gap-2'>
            <p className='text-customGrey-800'>이메일</p>
            <input
              type='text'
              defaultValue={user?.email}
              className='w-full h-11 px-1.5 py-2.5 border border-customGrey-200 bg-customGrey-100 text-customGrey-300 rounded-sm'
              disabled
            />
          </div>
          <PasswordInput />
        </div>
      </div>
    </section>
  );
}
