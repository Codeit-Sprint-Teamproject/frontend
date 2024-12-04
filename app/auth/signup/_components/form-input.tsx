'use client';

import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';

interface FormInputProps {
  errors?: {
    userName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
}

export const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();

  return (
    <div>
      <Input
        id='userName'
        name='userName'
        required
        placeholder='이름을 입력하세요'
        disabled={pending}
      />
      {errors?.userName && (
        <div>
          {errors.userName.map((error: string) => (
            <p key={error} className='text-rose-500'>
              {error}
            </p>
          ))}
        </div>
      )}
      <Input
        id='email'
        name='email'
        type='email'
        required
        placeholder='이메일을 입력하세요'
        disabled={pending}
      />
      {errors?.email && (
        <div>
          {errors.email.map((error: string) => (
            <p key={error} className='text-rose-500'>
              {error}
            </p>
          ))}
        </div>
      )}
      <Input
        id='password'
        name='password'
        type='password'
        required
        placeholder='비밀번호를 입력하세요'
        disabled={pending}
      />
      {errors?.password && (
        <div>
          {errors.password.map((error: string) => (
            <p key={error} className='text-rose-500'>
              {error}
            </p>
          ))}
        </div>
      )}
      <Input
        id='confirmPassword'
        name='confirmPassword'
        type='password'
        required
        placeholder='비밀번호를 다시 입력하세요'
        disabled={pending}
      />
      {errors?.confirmPassword && (
        <div>
          {errors.confirmPassword.map((error: string) => (
            <p key={error} className='text-rose-500'>
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
