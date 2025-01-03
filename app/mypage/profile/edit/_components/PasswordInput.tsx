import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { checkCurrentPassword } from '../_lib/checkCurrentPassword';
import { useProfileQuery } from '@/hooks/userProfileQuery';
import useUserStore from '@/store/userStore';
import { CheckIcon, XIcon } from 'lucide-react';

type Form = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function PasswordInput() {
  const { user } = useUserStore();
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<Form>({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const { updateProfileMutate } = useProfileQuery();
  const onSubmit = async (data: Form) => {
    try {
      await checkCurrentPassword(data.currentPassword);
      const formData = new FormData();
      const form = JSON.stringify({
        userName: user?.name,
        email: user?.email,
        password: data.newPassword,
      });
      formData.append('data', form);
      updateProfileMutate(formData, {
        onSuccess: () => {
          reset();
          setIsEdit(false);
        },
      });
    } catch (error) {
      setError('currentPassword', { message: (error as Error).message });
      return;
    }
  };

  if (isEdit) {
    return (
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <p className='text-customGrey-800'>현재 비밀번호</p>
          <input
            className='border border-customGrey-200 px-1.5 py-2.5 rounded-sm placeholder:text-sm'
            type='password'
            {...register('currentPassword', {
              required: '현재 비밀번호를 입력해주세요.',
            })}
            placeholder='현재 비밀번호를 입력해 주세요.'
          />
          {errors.currentPassword && (
            <p className='text-red-500'>{errors.currentPassword.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-customGrey-800'>새 비밀번호</p>
          <input
            className='border border-customGrey-200  px-1.5 py-2.5 rounded-sm placeholder:text-sm'
            type='password'
            {...register('newPassword', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자 이상이어야 합니다.',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
                message:
                  '비밀번호는 영문자와 숫자를 최소 1자 이상 포함해야 합니다.',
              },
            })}
            placeholder='새 비밀번호를 입력해 주세요.'
          />
          <div className='flex'>
            <div className='flex'>
              {!watch('newPassword') ? (
                <CheckIcon className='text-customGrey-300' />
              ) : errors.newPassword?.type === 'minLength' ? (
                <XIcon className='w-5 h-5 text-customRed' />
              ) : (
                <CheckIcon className='text-customGreen-500' />
              )}

              <p
                className={`text-sm ${
                  !watch('newPassword')
                    ? 'text-customGrey-300'
                    : errors.newPassword?.types?.minLength
                      ? 'text-customRed'
                      : 'text-customGreen-500'
                } `}
              >
                8자 이상
              </p>
            </div>
            <div className='flex'>
              {!watch('newPassword') ? (
                <CheckIcon className='text-customGrey-300' />
              ) : errors.newPassword?.types?.pattern ? (
                <XIcon className='w-5 h-5 text-customRed' />
              ) : (
                <CheckIcon className='text-customGreen-500' />
              )}
              <p
                className={`text-sm ${
                  !watch('newPassword')
                    ? 'text-customGrey-300'
                    : errors.newPassword?.types?.pattern
                      ? 'text-customRed'
                      : 'text-customGreen-500'
                } ml-2`}
              >
                영문/숫자/특수문자 3가지 모두 포함
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-customGrey-800'>새 비밀번호 확인</p>
          <input
            className='border border-customGrey-200  px-1.5 py-2.5 rounded-sm placeholder:text-sm'
            type='password'
            {...register('confirmNewPassword', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: (value) =>
                value === getValues('newPassword') ||
                '비밀번호가 일치하지 않습니다.',
            })}
            placeholder='새 비밀번호를 한번 더 입력해 주세요.'
          />
          <div className='flex'>
            {!watch('confirmNewPassword') ? (
              <CheckIcon className='text-customGrey-300' />
            ) : errors.confirmNewPassword?.message ? (
              <XIcon className='w-5 h-5 text-customRed' />
            ) : (
              <CheckIcon className='text-customGreen-500' />
            )}
            <p
              className={`text-sm ${
                !watch('confirmNewPassword')
                  ? 'text-customGrey-300'
                  : errors.confirmNewPassword?.message
                    ? 'text-customRed'
                    : 'text-customGreen-500'
              }`}
            >
              비밀번호 일치
            </p>
          </div>
        </div>
        <div className='flex justify-end item-center gap-[14px]'>
          <button
            type='button'
            className='h-8 p-2.5 text-sm'
            onClick={() => {
              setIsEdit(false);
              reset();
            }}
          >
            취소
          </button>
          <button
            className='h-8 text-sm p-2.5 bg-customGrey-900 text-white rounded-sm disabled:bg-customGrey-300'
            disabled={!isValid}
          >
            저장
          </button>
        </div>
      </form>
    );
  }
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-customGrey-800'>비밀번호</p>
      <div className='flex gap-3'>
        <input
          type='password'
          placeholder='●●●●●●●●'
          className='flex-1 h-11 px-1.5 py-2.5 border border-customGrey-200 text-customGrey-300 rounded-sm'
          disabled
        />
        <button
          className='h-11 p-2.5 bg-customGrey-800 text-white rounded-sm'
          onClick={() => setIsEdit(true)}
        >
          변경하기
        </button>
      </div>
    </div>
  );
}
