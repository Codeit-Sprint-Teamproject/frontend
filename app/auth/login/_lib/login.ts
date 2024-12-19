'use server';

import { setCookie } from '../../_utils/cookie';
import { validateLoginData } from './login-validation';
import { fetchAPIServer } from '@/lib/fetchAPI.server';
import { redirect } from 'next/navigation';

export type State = {
  error?: {
    email?: string[];
    password?: string[];
  };
  message: string | null;
};

export async function userLogIn(prevState: State, formData: FormData) {
  const validationResult = validateLoginData(formData);

  if (!validationResult.success) {
    return {
      errors: validationResult.errors,
      message: '',
    };
  }

  const { email, password } = validationResult.data!;

  const response = await fetchAPIServer('/api/auths/signIn', 'POST', {
    email,
    password,
  });

  console.log('test:', response);
  if (response.status !== 200) {
    try {
      const errorMessage = response.error?.message || '{}';
      const parsedError = JSON.parse(errorMessage);
      const detailedMessage =
        parsedError.message || '알 수 없는 오류가 발생했습니다.';
      return {
        message: `로그인 실패: ${detailedMessage}`,
      };
    } catch (e) {
      console.error('JSON 파싱 오류:', e);
      return {
        message: '로그인 실패: 알 수 없는 오류가 발생했습니다.',
      };
    }
  } else {
    setCookie('token', response.result.token, {
      httpOnly: false,
      secure: true,
      maxAge: 60 * 60 * 24 * 1,
    });
    redirect('/');
  }
}
