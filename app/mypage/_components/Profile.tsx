'use client';

import { useEffect, useState } from 'react';
import { getUser } from '../_lib/profile';
import EditIcon from '../_svg/EditIcon';
import ImageIcon from '../_svg/ImageIcon';
import MyMeetingList from './MyMeetingList';
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
  return (
    <div className='w-[700px] h-[372px] px-[22px] py-9 mb-8'>
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
          <ImageIcon width={64} height={64} />
        )}
        <div className='flex items-center justify-between w-3/4'>
          <div className='w-44'>
            <p className='font-bold text-[22px]'>{userName}</p>
            <p>{email}</p>
          </div>
          <button
            className='w-36 h-11 px-4 py-2.5 flex items-center gap-2.5 text-sm bg-[#D9D9D9] rounded'
            onClick={() =>
              openModal(<ProfileModifyForm user={user} setUser={setUser} />)
            }
          >
            프로필 수정
            <EditIcon width={24} height={24} />
          </button>
        </div>
      </div>
      <MyMeetingList meetingList={user?.gatheringList} />
      {isOpen && <Modal />}
    </div>
  );
}
