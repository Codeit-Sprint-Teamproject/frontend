'use client';

import { useState } from 'react';
import { User, updateUser } from '../_lib/profile';
import { validateProfile } from '../_lib/profileSchema';
import ImageIcon from '../_svg/ImageIcon';
import { useModalStore } from '@/store/modal';
import Image from 'next/image';

type Props = { user: User; setUser: (user: User) => void };

export default function ProfileModifyForm({ user, setUser }: Props) {
  const [nickname, setNickname] = useState(user?.companyName);
  const [image, setImage] = useState(user?.image);
  const [file, setFile] = useState<File>();
  const [errors, setErrors] = useState<Record<string, string>>();
  const { closeModal } = useModalStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'nickname') {
      setNickname(value);
    }
    if (files && name === 'image') {
      const file = files[0];
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateProfile({
      nickname,
      image: file,
    });
    if (errors) {
      setErrors(errors);
      return;
    }
    setErrors({});
    const formData = new FormData();
    // 프로필 수정 임시 api여서 회사명으로 추가
    formData.append('companyName', nickname);
    if (file) {
      formData.append('image', file as File);
    }
    try {
      const updated = await updateUser(formData);
      setUser(updated);
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  if (!user) return <p>Loading...</p>;
  return (
    <div className='text-black'>
      <h3 className='text-lg font-semibold mb-4'>프로필 수정하기</h3>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3 mb-3'>
          {image ? (
            <Image
              src={image}
              className='rounded-md'
              width={70}
              height={70}
              alt='프로필'
            />
          ) : (
            <ImageIcon />
          )}
          <input
            type='file'
            name='image'
            onChange={handleChange}
            accept='image/*'
          ></input>
          {errors && <p>{errors?.image}</p>}
          <p className='font-semibold'>닉네임</p>
          <input
            className='w-full h-11 border rounded-xl px-4 py-2'
            type='text'
            name='nickname'
            value={nickname}
            onChange={handleChange}
          />
          {errors && <p>{errors?.nickname}</p>}
        </div>
        <div className='flex items-center gap-4 font-semibold'>
          <button
            className='w-[472px] h-11 rounded-xl border border-[#EA580C] text-[#EA580C]'
            onClick={closeModal}
            type='button'
          >
            취소
          </button>
          <button className='w-[472px] h-11 rounded-xl border bg-[#9CA3AF] text-white'>
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}
