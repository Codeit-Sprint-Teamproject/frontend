'use client';

import { useState } from 'react';
import { FormButton } from '../../_components/form-button';
import { userLogIn } from '../_lib/login';
import { LoginFormInput } from './login-form-input';
import useUserStore from '@/store/userStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const { setUser } = useUserStore();
  const [state, setState] = useState({ message: '', errors: {} });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const result = await userLogIn(formData);

      if (result.errors) {
        setState({ message: result.message, errors: result.errors });
      } else if (result.user) {
        setUser(result.user);
        router.push('/');
      } else if (result.message) {
        setState({ message: result.message, errors: {} });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setState({ message: '예상치 못한 오류가 발생했습니다.', errors: {} });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-[380px]'>
      <div className='flex flex-col space-y-2'>
        <LoginFormInput errors={state.errors} />
        <div className='h-6'>
          {state.message && (
            <p className='text-sm text-error'>{state.message}</p>
          )}
        </div>
      </div>
      <div className='flex flex-col mt-2 gap-5'>
        <FormButton
          disabled={false}
          className='w-full h-12 p-2.5 text-base font-bold bg-black text-white rounded'
        >
          로그인
        </FormButton>
        <div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
          <Link href='#' className='hover:underline'>
            아이디(이메일) 찾기
          </Link>
          <span className='text-gray-300'>|</span>
          <Link href='#' className='hover:underline'>
            비밀번호 찾기
          </Link>
          <span className='text-gray-300'>|</span>
          <Link href='/auth/signup' className='hover:underline'>
            회원가입
          </Link>
        </div>
      </div>
    </form>
  );
};
