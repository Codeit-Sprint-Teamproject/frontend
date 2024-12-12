import { HttpResponse, http } from 'msw';

const User = {
  userId: 1,
  userName: '테스트1',
  email: 'aa@test.com',
  profile: '',
};
const meetingList = [
  {
    id: 1,
    name: '[매일 30분 읽기] 한강 디에션셜 함께 읽어요!',
    content: '★ 한강 작가의 장편소설, 단편소설, 시, 산문을 한 권으로 만난다!',
    goalDays: 15,
    readingTimeGoal: 30,
    startDate: new Date(2024, 11, 10),
    endDate: new Date(2024, 11, 24),
    minCapacity: 5,
    maxCapacity: 35,
    capacity: 31,
    gatheringStatus: 'RECRUITING',
    createdTime: '2024-12-10T14:38:36.805101',
    updatedTime: '2024-12-10T14:38:36.805101',
    bookTitle: '한강',
    bookImage: '/book.png',
    publisher: '문학동네',
    publishDate: '2023-06-01',
    star: '9.8',
  },
];
const readingList = [
  {
    bookProfile: '/book.png',
    readingDate: '2024-12-11',
  },
];

const getProfile = http.get('/api/profile', () => {
  return HttpResponse.json({
    user: User,
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
    User.userName = userName as string;
  }
  if (profile) {
    User.profile = '/next.svg';
  }
  return HttpResponse.json(
    {
      message: '프로필 수정 완료',
      user: User,
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
