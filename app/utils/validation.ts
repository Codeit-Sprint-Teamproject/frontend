import { z } from 'zod';

// 모임 스키마
export const meetingSchema = z.object({
  location: z.string().min(1, { message: '모임 장소를 선택해주세요.' }),
  type: z.string().min(1, { message: '서비스 종류를 선택해주세요.' }),
  name: z.string().min(1, { message: '모임 이름을 입력해주세요.' }),
  dateTime: z.date({ required_error: '모임 날짜 및 시간을 선택해주세요.' }),
  capacity: z
    .number({ required_error: '모집 정원을 입력해주세요.' })
    .min(5, '모집 정원은 최소 5명 이상이어야 합니다.'),
  image: z.instanceof(File).optional(),
  registrationEnd: z.date({
    required_error: '모집 마감 날짜 및 시간을 선택해주세요.',
  }),
});

// 모임 생성 - 날짜 검증 로직
export const validateDates = (registrationEnd: Date, dateTime: Date) => {
  if (registrationEnd >= dateTime) {
    throw new Error('모임 날짜는 모집 마감 날짜 이후여야 합니다.');
  }
};
