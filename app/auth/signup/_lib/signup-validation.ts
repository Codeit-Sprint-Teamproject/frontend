import { z } from 'zod';

export const validateSignupData = (formData: FormData) => {
  const SignupSchema = z
    .object({
      userName: z.string().min(1, { message: '이름을 입력해 주세요.' }),
      email: z.string().email({ message: '올바른 이메일을 입력해 주세요.' }),
      password: z
        .string()
        .min(10, { message: '비밀번호는 10자 이상이어야 합니다.' })
        .refine((val) => /[a-z]/.test(val), {
          message: '비밀번호에는 최소 하나의 소문자가 포함되어야 합니다.',
        })
        .refine((val) => /\d/.test(val), {
          message: '비밀번호에는 최소 하나의 숫자가 포함되어야 합니다.',
        })
        .refine((val) => /[!@#$%^&*]/.test(val), {
          message:
            '비밀번호에는 최소 하나의 특수문자가 포함되어야 합니다 (!@#$%^&*).',
        }),
      confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          path: ['confirmPassword'],
          message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        });
      }
    });

  const formValues = {
    userName: formData.get('userName'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const result = SignupSchema.safeParse(formValues);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
