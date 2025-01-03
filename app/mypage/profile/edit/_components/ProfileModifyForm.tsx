'use client';

import CameraIcon from '../_svg/CameraIcon';
import NicknameInput from './NicknameInput';
import PasswordInput from './PasswordInput';
import Avatar from '@/components/common/icons/Avatar';
import useUserStore from '@/store/userStore';
import Image from 'next/image';

export default function ProfileModifyForm() {
  const { user } = useUserStore();

  return (
    <section className='w-[518px] flex flex-col gap-7'>
      <div className='px-4 pt-4 pb-5 border rounded-sm'>
        <h4 className='text-lg text-customGrey-800 font-bold mb-4'>내 계정</h4>
        <div className='flex gap-4'>
          <div className='flex items-end -space-x-[14.1px]'>
            {user?.profile ? (
              <Image src={user.profile} width={45} height={45} alt='프로필' />
            ) : (
              <Avatar className='w-[45px] h-[45px]' />
            )}
            <label className='w-8 h-8 p-1.5 bg-customGrey-200 rounded-full'>
              <CameraIcon />
              <input type='file' className='hidden' accept='image/*' />
            </label>
          </div>
          <div className=''>
            <p className='font-bold text-customGrey-800 '>{user?.name}</p>
            <p className='text-sm text-customGrey-300'>{user?.email}</p>
          </div>
        </div>
      </div>
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
