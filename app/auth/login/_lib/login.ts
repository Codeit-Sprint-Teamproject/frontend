'use server';

import { setCookie } from '../../_utils/cookie';
import { validateLoginData } from './login-validation';
import { fetchAPIServer } from '@/lib/fetchAPI.server';

export async function userLogIn(formData: FormData): Promise<{
  user?: {
    id: number;
    name: string;
    email: string;
    profile: string | null;
    roles: string;
  };
  errors?: {
    email?: string[];
    password?: string[];
  };
  message: string;
}> {
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

  if (response.status !== 200) {
    try {
      const errorMessage = response.error?.message || '{}';
      const parsedError = JSON.parse(errorMessage);
      const detailedMessage =
        parsedError.message || '알 수 없는 오류가 발생했습니다.';

      let translatedMessage = '로그인 실패: 알 수 없는 오류가 발생했습니다.';
      if (detailedMessage === 'This user does not exist') {
        translatedMessage = '존재하지 않는 유저입니다.';
      } else if (detailedMessage === 'Login information mismatch') {
        translatedMessage = '로그인 정보가 일치하지 않습니다.';
      }

      return {
        message: translatedMessage,
      };
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : '알 수 없는 오류';
      return {
        message: `로그인 실패: ${errorMsg}`,
      };
    }
  }

  const {
    usersId,
    userName,
    email: userEmail,
    profile,
    roles,
    token,
  } = response.result;

  setCookie('token', token, {
    httpOnly: false,
    secure: false,
    maxAge: 60 * 60 * 24, // 1 day
  });

  return {
    user: {
      id: usersId,
      name: userName,
      email: userEmail,
      profile,
      roles,
    },
    message: '',
  };
}
