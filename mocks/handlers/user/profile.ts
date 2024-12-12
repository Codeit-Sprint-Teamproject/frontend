import meetingList from '@/mocks/data/user/meetingList.json';
import readingList from '@/mocks/data/user/readingList.json';
import user from '@/mocks/data/user/user.json';
import { HttpResponse, http } from 'msw';

const getProfile = http.get('/api/profile', () => {
  return HttpResponse.json({
    user,
    gatheringList: meetingList,
    myReadingList: readingList,
  });
});

type PasswordCheckRequestBody = { password: string };

const updateProfile = http.put('/api/auths/edit/user', async ({ request }) => {
  const formData = await request.formData();
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token || !formData) {
    return HttpResponse.json({ message: '프로필 수정 실패' }, { status: 401 });
  }
  const userName = formData.get('userName');
  const profile = formData.get('profile');

  if (userName) {
    user.userName = userName as string;
  }
  if (profile) {
    user.profile = '/next.svg';
  }
  return HttpResponse.json(
    {
      message: '프로필 수정 완료',
      user,
    },
    { status: 200 },
  );
});

const checkPassword = http.post(
  '/api/auths/password/check',
  async ({ request }) => {
    const { password } = (await request.json()) as PasswordCheckRequestBody;
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (password.length < 8) {
      return HttpResponse.json(
        { message: '비밀번호 유효성 검사 오류' },
        { status: 400 },
      );
    }
    if (token === 'token' && password === 'test123$') {
      return HttpResponse.json(
        { success: true, message: '비밀번호 확인 완료' },
        { status: 200 },
      );
    }
    return HttpResponse.json(
      { message: '기존 비밀번호가 틀립니다.' },
      { status: 401 },
    );
  },
);

export const myProfile = [getProfile, updateProfile, checkPassword];
