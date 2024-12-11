'use client';

import { useEffect, useState } from 'react';
import { getUser } from '../_lib/profile';
import ImageIcon from '../_svg/ImageIcon';
import ProfileModifyForm from './ProfileModifyForm';
import Modal from '@/components/Modal';
import { useModalStore } from '@/store/modal';
import { User } from '@/types/user';
import Image from 'next/image';

export default function Profile() {
  const { isOpen, openModal } = useModalStore();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;
  const { userName, email, profile } = user?.user;
  const { name, startDate, endDate, bookImage } = user?.gatheringList?.[0];

  return (
    <div className='w-[700px] h-[372px] bg-[#D9D9D9] bg-opacity-30 px-[22px] py-9 mb-8'>
      <div className='flex items-center gap-6 mb-6'>
        {profile ? (
          <Image
            src={profile as string}
            className='rounded-full'
            width='84'
            height='84'
            alt='프로필'
          />
        ) : (
          <ImageIcon />
        )}
        <div className='flex flex-col w-44'>
          <p className='font-bold text-2xl'>{userName}</p>
          <p>{email}</p>
        </div>
        <button
          className='w-[95px] h-[42px] p-[10px] text-sm bg-[#D9D9D9]'
          onClick={() =>
            openModal(<ProfileModifyForm user={user} setUser={setUser} />)
          }
        >
          프로필 수정
        </button>
      </div>
      <div className='flex gap-5 w-[652px] h-[201x] bg-white pl-3 py-[18px] rounded-lg'>
        <Image src={bookImage} width={132} height={200} alt='책 표지' />
        <div className='text-sm'>
          <h3>{name}</h3>
          <p className='mb-3'>모임 기간 </p>
          <p className='font-bold mb-7'>
            {startDate.toLocaleString()} ~ {endDate.toLocaleString()}
          </p>
          <p className='mb-3'>나의 독서 진행률 </p>
          <div className='w-[334px] h-[15px] bg-[#D9D9D9]'></div>
        </div>
      </div>
      {isOpen && <Modal />}
    </div>
  );
}
