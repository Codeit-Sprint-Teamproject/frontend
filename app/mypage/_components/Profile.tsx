'use client';

import { useEffect, useState } from 'react';
import { User, getUser } from '../_lib/profile';
import ProfileModifyForm from './ProfileModifyForm';
import Modal from '@/components/Modal';
import { useModalStore } from '@/store/modal';

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
  const { email, companyName } = user;

  return (
    <div>
      <h3 className='text-lg'>내 프로필</h3>
      <div className='flex flex-col gap-2'>
        <p>
          닉네임 <span>{companyName}</span>
        </p>
        <p>
          E-mail <span>{email}</span>
        </p>
      </div>
      <button
        onClick={() =>
          openModal(<ProfileModifyForm user={user} setUser={setUser} />)
        }
      >
        수정하기
      </button>
      {isOpen && <Modal />}
    </div>
  );
}
