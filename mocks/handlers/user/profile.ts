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
    startDate: '2024-12-10',
    endDate: '2024-12-24',
    minCapacity: 5,
    maxCapacity: 30,
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
    // 임시 이미지 설정
    User.profile = '/heart.png';
  }
  return HttpResponse.json(
    {
      message: '프로필 수정 완료',
      user: User,
    },
    { status: 200 },
  );
});

export const myProfile = [getProfile, updateProfile];
