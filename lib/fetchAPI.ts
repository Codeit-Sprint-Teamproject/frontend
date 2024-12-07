import Cookies from 'js-cookie';

//env 추가되면 정리 예정
const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || 'http://54.180.31.176';

export async function fetchAPI(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: FormData | string | Record<string, unknown>,
) {
  const token = Cookies.get('token');

  // if (!token) {
  //   window.location.href = '/login';
  //   return; // 일단은 이렇게 하고 나중에 router.push나 nextResponse.redirect로 구현해볼 예정
  // }

  const headers: HeadersInit = {
    accept: '*/*',
    Authorization: `Bearer ${token}`,
    ...(body &&
      !(body instanceof FormData) && { 'Content-Type': 'application/json' }),
  };

  const options: RequestInit = {
    method,
    headers,
    ...(body && {
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorMessage = await response.text();
      const error = new Error(errorMessage || 'Network response was not ok');
      throw error;
    }

    return response.status !== 204 ? await response.json() : null;
  } catch (error) {
    console.error('API 호출 에러:', error); //테스트용
    throw error;
  }
}
