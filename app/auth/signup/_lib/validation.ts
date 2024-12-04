import { z } from 'zod';

export const validateSignupData = (formData: FormData) => {
  const SignupSchema = z.object({
    userName: z.string().min(1, { message: '이름을 입력해 주세요.' }),
    email: z.string().email({ message: '올바른 이메일을 입력해 주세요.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
    confirmPassword: z
      .string()
      .min(8, { message: '비밀번호 확인은 8자 이상이어야 합니다.' }),
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
