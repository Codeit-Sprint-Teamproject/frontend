'use client';

import EditIcon from '../_svg/EditIcon';
import ProfileModifyForm from './ProfileModifyForm';
import Modal from '@/components/Modal';
import Avatar from '@/components/common/icons/Avatar';
import { useProfileQuery } from '@/hooks/userProfileQuery';
import { useModalStore } from '@/store/modal';
import Image from 'next/image';

export default function Profile() {
  const { isOpen, openModal } = useModalStore();
  const { isLoading, user } = useProfileQuery();
  const handleOpenModal = () => {
    if (user) {
      openModal(<ProfileModifyForm />);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>사용자가 없습니다.</p>;
  const { userName, email, profile } = user;

  return (
    <div className='w-[575px] mb-8 mt-6'>
      <div className='flex items-center gap-6 mb-6'>
        {profile ? (
          <Image
            src={profile as string}
            className='rounded-full'
            width={56}
            height={56}
            alt='프로필'
          />
        ) : (
          <Avatar className='w-14 h-14' />
        )}
        <div className='flex items-center justify-between flex-1'>
          <div className='w-44'>
            <p className='font-bold text-lg'>{userName}</p>
            <p className='text-sm text-customGrey-300'>{email}</p>
          </div>
          <button
            className='h-12 px-3 py-2 flex items-center gap-1 text-sm text-customGrey-500 bg-customGrey-50 rounded'
            onClick={handleOpenModal}
          >
            프로필 수정
            <EditIcon className='w-6 h-6 stroke-customGrey-500' />
          </button>
        </div>
      </div>

      {isOpen && <Modal />}
    </div>
  );
}
