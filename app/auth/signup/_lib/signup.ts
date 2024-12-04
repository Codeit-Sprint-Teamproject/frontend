'use server';

import { validateSignupData } from './validation';
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
      message: 'Validation failed',
    };
  }

  const { userName, email, password, confirmPassword } = validationResult.data!;

  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: ['비밀번호가 일치하지 않습니다.'],
      },
      message: 'Password mismatch',
    };
  }

  const response = await fetch('http://54.180.31.176/api/auths/signUp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, email, password }),
  });
  //Api 아직 완성이 안됬습니다!
  if (response.status === 500) {
    const responseData = await response.json();

    if (responseData.message === 'Duplicate email') {
      return {
        errors: {
          email: ['이메일이 이미 존재합니다.'],
        },
        message: '이메일 중복',
      };
    }

    return {
      message: '회원가입 실패',
    };
  }

  if (!response.ok) {
    return {
      message: '회원가입 실패',
    };
  }
  redirect('/auth/login');
}
