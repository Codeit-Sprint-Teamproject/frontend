'use client';

import { useFormState } from 'react-dom';
import { FormButton } from '../../_components/form-button';
import { userLogIn } from '../_lib/login';
import { LoginFormInput } from './login-form-input';
import Link from 'next/link';

export const LoginForm = () => {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(userLogIn, initialState);
  return (
    <form action={dispatch} className='max-w-[380px]'>
      <div className='flex flex-col space-y-2'>
        <LoginFormInput errors={state?.errors} />
        <div className='h-6'>
          {state?.message && (
            <p className='text-sm text-error'>{state.message}</p>
          )}
        </div>
      </div>
      <div className='flex flex-col mt-[32px] gap-5'>
        <FormButton
          className='w-full h-12 p-2.5 text-base font-bold bg-black text-white rounded'
          disabled={false}
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
