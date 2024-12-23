'use client';

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import EyeIcon from '../../_svg/EyeIcon';
import EyeIconClosed from '../../_svg/EyeIconClosed';
import { FormInputField } from './login-form-input-field';

interface FormInputProps {
  errors?: {
    [key: string]: string[];
  };
}

export const LoginFormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex flex-col gap-[30px]'>
      <div>
        <p className='text-lg font-bold mb-3'>이메일</p>
        <FormInputField
          id='email'
          name='email'
          type='text'
          placeholder='abc@email.com'
          errors={errors?.email}
          disabled={pending}
        />
      </div>
      <div>
        <p className='text-lg font-bold mb-3'>비밀번호</p>
        <div className='relative'>
          <FormInputField
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='8자 이상의 비밀번호'
            errors={errors?.password}
            disabled={pending}
          />
          <button
            className='absolute top-[10px] right-4'
            onClick={togglePasswordVisibility}
            type='button'
          >
            {showPassword ? (
              <EyeIcon
                className={`transition-all duration-300 h-6 w-6 ${showPassword ? 'text-gray-700' : 'text-gray-400'}`}
              />
            ) : (
              <EyeIconClosed
                className={`transition-all duration-300 h-6 w-6 ${showPassword ? 'text-gray-700' : 'text-gray-400'}`}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
