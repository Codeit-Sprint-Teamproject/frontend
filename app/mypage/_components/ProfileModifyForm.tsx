'use client';

import { Controller, useForm } from 'react-hook-form';
import { checkCurrentPassword } from '../_lib/profile';
import { profileSchema } from '../_lib/profileSchema';
import Avatar from '@/components/common/icons/Avatar';
import { useProfileQuery } from '@/hooks/userProfileQuery';
import { useModalStore } from '@/store/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

type FormValues = {
  nickname: string;
  image: string;
  file?: File;
  currentPassword?: string;
  newPassword?: string;
};

export default function ProfileModifyForm() {
  const { user, updateProfileMutate } = useProfileQuery();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: user?.user.userName,
      image: user?.user.profile,
    },
  });
  const { closeModal } = useModalStore();

  const handleFileChange =
    (field: { onChange: (value: File) => void }) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        field.onChange(files[0]);
        setValue('file', files[0]);
        const imageUrl = URL.createObjectURL(files[0]);
        setValue('image', imageUrl);
      }
    };
  const onSubmit = async (data: FormValues) => {
    const { nickname, currentPassword, newPassword, file } = data;
    if (newPassword && currentPassword) {
      try {
        await checkCurrentPassword(currentPassword);
      } catch (error) {
        setError('currentPassword', { message: (error as Error).message });
        return;
      }
    }
    const formData = new FormData();
    formData.append('userName', nickname);
    if (file) {
      formData.append('file', file);
    }
    if (newPassword) {
      formData.append('password', newPassword);
    }
    try {
      updateProfileMutate(formData);
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  return (
    <div className='text-black'>
      <h3 className='text-lg font-semibold mb-4'>프로필 수정하기</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-3 mb-3'>
          {watch('image') ? (
            <Image
              src={watch('image')}
              className='rounded-md'
              width={70}
              height={70}
              alt='프로필'
            />
          ) : (
            <Avatar className='w-16 h-16' />
          )}
          <Controller
            name='file'
            control={control}
            render={({ field }) => (
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange(field)}
              />
            )}
          />
          {errors.file && <p className='text-red-500'>{errors.file.message}</p>}
          <p className='font-semibold'>닉네임</p>
          <input
            className='w-full h-11 border rounded-xl px-4 py-2'
            {...register('nickname')}
          />
          {errors.nickname && (
            <p className='text-red-500'>{errors.nickname.message}</p>
          )}
          <p className='font-semibold'>현재 비밀번호</p>
          <input
            className='w-full h-11 border rounded-xl px-4 py-2'
            type='password'
            {...register('currentPassword')}
          />
          {errors.currentPassword && (
            <p className='text-red-500'>{errors.currentPassword.message}</p>
          )}
          <p className='font-semibold'>새 비밀번호</p>
          <input
            className='w-full h-11 border rounded-xl px-4 py-2'
            type='password'
            {...register('newPassword')}
          />
          {errors.newPassword && (
            <p className='text-red-500'>{errors.newPassword.message}</p>
          )}
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
