import { z } from 'zod';

export const profileSchema = z
  .object({
    nickname: z
      .string()
      .trim()
      .min(2, { message: '닉네임을 2자 이상 입력해주세요' })
      .max(25, { message: '닉네임은 25자를 초과할 수 없습니다.' }),
    file: z.optional(
      z.instanceof(File).refine((file) => file.type.startsWith('image/'), {
        message: '이미지 파일만 허용됩니다.',
      }),
    ),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .optional()
      .refine(
        (password) =>
          !password ||
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
            password,
          ),
        {
          message:
            '새 비밀번호는 최소 8자 이상이어야 하며, 소문자 1개, 숫자 1개, 특수문자 1개 이상 포함되어야 합니다.',
        },
      ),
  })
  .superRefine((data, ctx) => {
    const { currentPassword, newPassword } = data;
    if (newPassword && !currentPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['currentPassword'],
        message: '기존 비밀번호를 입력해야 새 비밀번호를 설정할 수 있습니다.',
      });
    }
    if (!newPassword && currentPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['newPassword'],
        message:
          '비밀번호를 변경하지 않을 경우, 기존 비밀번호를 입력하지 않아도 됩니다. ',
      });
    }
  });
