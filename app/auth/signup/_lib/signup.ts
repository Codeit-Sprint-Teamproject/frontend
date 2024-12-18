'use server';

import { validateSignupData } from './signup-validation';
import { fetchAPIServer } from '@/lib/fetchAPI.server';
import { redirect } from 'next/navigation';

export type State = {
  error?: {
    userName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message: string | null;
};

export async function userSignup(prevState: State, formData: FormData) {
  const validationResult = validateSignupData(formData);

  if (!validationResult.success) {
    return {
      errors: validationResult.errors,
      message: '다시 시도해 주세요.',
    };
  }

  const { userName, email, password } = validationResult.data!;

  const response = await fetchAPIServer('/api/auths/signUp', 'POST', {
    userName,
    email,
    password,
  });

  if (response.status !== 200) {
    return {
      message: `회원가입 실패: ${response.message}`,
    };
  }

  redirect('/auth/login');
}
