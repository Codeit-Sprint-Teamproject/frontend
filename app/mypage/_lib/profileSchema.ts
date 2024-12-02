import { z } from 'zod';

const profileSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(2, { message: '닉네임을 2자 이상 입력해주세요' })
    .max(25, { message: '닉네임은 25자를 초과할 수 없습니다.' }),
  image: z.optional(
    z.instanceof(File).refine((file) => file.type.startsWith('image/'), {
      message: '이미지 파일만 허용됩니다.',
    }),
  ),
});

export const validateProfile = (form: { nickname: string; image?: File }) => {
  const result = profileSchema.safeParse(form);
  if (!result.success) {
    const errors = result.error.errors.reduce(
      (acc, cur) => {
        const key = cur.path[0] as string;
        acc[key] = cur.message;
        return acc;
      },
      {} as Record<string, string>,
    );
    return errors;
  }
};
