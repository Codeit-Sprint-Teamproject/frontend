'use client';

import { useState } from 'react';
import CameraIcon from '../_svg/CameraIcon';
import Avatar from '@/components/common/icons/Avatar';
import { useProfileQuery } from '@/hooks/userProfileQuery';
import useUserStore from '@/store/userStore';
import Image from 'next/image';

type Props = { setIsEdit: (isEdit: boolean) => void };

export default function ProfileImageUploader({ setIsEdit }: Props) {
  const { user, setUser } = useUserStore();
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>();
  const { updateProfileMutate } = useProfileQuery();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setImage(URL.createObjectURL(files[0]));
    }
  };
  const handleUpdate = () => {
    const formData = new FormData();
    const form = JSON.stringify({
      userName: user?.name,
      email: user?.email,
    });
    formData.append('data', form);
    if (file) {
      formData.append('file', file);
      updateProfileMutate(formData, {
        onSuccess: (data) => {
          if (data && data.profile) {
            setUser({ ...user!, profile: data.profile });
            setIsEdit(false);
          }
        },
      });
    }
  };
  return (
    <div className='flex flex-col gap-5 px-5 py-4 bg-customGrey-50 rounded-md'>
      <h3 className='text-lg font-bold text-customGrey-800'>
        프로필 사진 변경
      </h3>
      <div className='flex items-end -space-x-8'>
        {user?.profile ? (
          <Image
            src={image ? image : user?.profile}
            className='rounded-full w-[90px] h-[90px] border-2 border-customGrey-100 object-contain'
            width={90}
            height={90}
            alt='프로필'
          />
        ) : (
          <Avatar className='w-[90px] h-[90px]' />
        )}
        <label className='w-10 h-10 p-2 bg-white border border-customGrey-100 rounded-full cursor-pointer'>
          <CameraIcon className='w-[22.5px] h-[22.5px]' />
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className='flex justify-end mt-2'>
        <button
          className='w-[74px] h-10 p-2.5 text-sm'
          onClick={() => setIsEdit(false)}
        >
          취소
        </button>
        <button
          className='w-[74px] h-10 bg-customGrey-800 text-white text-sm rounded-sm'
          onClick={handleUpdate}
        >
          저장
        </button>
      </div>
    </div>
  );
}
