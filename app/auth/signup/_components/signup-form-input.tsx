'use client';

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import EyeIcon from '../../_svg/EyeIcon';
import { CheckDuplicateButton } from './signup-form-duplicateCheckButton';
import { FormInputField } from '@/app/auth/_components/form-input-field';

interface SignupFormInputProps {
  errors?: {
    [key: string]: string[];
  };
  setIsEmailValid: (isValid: boolean) => void;
  setIsUserNameValid: (isValid: boolean) => void;
}

export const SignupFormInput = ({
  errors,
  setIsEmailValid,
  setIsUserNameValid,
}: SignupFormInputProps) => {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userNameError, setUserNameError] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string[]>([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex flex-col gap-[30px]'>
      <div>
        <p className='text-lg font-bold mb-3'>이메일</p>
        <div className='flex space-x-2'>
          <FormInputField
            id='email'
            name='email'
            type='email'
            placeholder='abc@email.com'
            errors={errors?.email || emailError}
            disabled={pending}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CheckDuplicateButton
            type='email'
            value={email}
            setError={setEmailError}
            onSuccess={() => setIsEmailValid(true)}
            onFailure={() => setIsEmailValid(false)}
          />
        </div>
      </div>
      <div>
        <p className='text-lg font-bold mb-3'>비밀번호</p>
        <div className='relative flex w-[380px]'>
          <FormInputField
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='8자 이상의 비밀번호'
            errors={errors?.password}
            disabled={pending}
          />
          <button
            className='absolute top-3 right-2.5'
            onClick={togglePasswordVisibility}
            type='button'
          >
            <EyeIcon
              className={`transition-all duration-300 h-6 w-6 ${showPassword ? 'text-gray-700' : 'text-gray-400'}`}
            />
          </button>
        </div>
      </div>
      <div>
        <p className='text-lg font-bold mb-3'>비밀번호 확인</p>
        <div className='relative flex w-[380px]'>
          <FormInputField
            id='confirmPassword'
            name='confirmPassword'
            type={showPassword ? 'text' : 'password'}
            placeholder='비밀번호를 다시 입력하세요'
            errors={errors?.confirmPassword}
            disabled={pending}
          />
          <button
            className='absolute top-3 right-2.5'
            onClick={togglePasswordVisibility}
            type='button'
          >
            <EyeIcon
              className={`transition-all duration-300 h-6 w-6 ${showPassword ? 'text-gray-700' : 'text-gray-400'}`}
            />
          </button>
        </div>
      </div>
      <div>
        <p className='text-lg font-bold mb-3'>닉네임</p>
        <div className='flex space-x-2 mb-[30px]'>
          <FormInputField
            id='userName'
            name='userName'
            type='text'
            placeholder='10자 이내의 닉네임'
            disabled={pending}
            errors={errors?.userName || userNameError}
            onChange={(e) => setUserName(e.target.value)}
          />
          <CheckDuplicateButton
            type='userName'
            value={userName}
            setError={setUserNameError}
            onSuccess={() => setIsUserNameValid(true)}
            onFailure={() => setIsUserNameValid(false)}
          />
        </div>
      </div>
    </div>
  );
};
