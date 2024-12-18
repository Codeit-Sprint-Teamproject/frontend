import React from 'react';
import CheckIcon from '../_svg/CheckIcon';
import XIcon from '../_svg/XIcon';
import { Input } from '@/components/ui/input';

interface FormInputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  errors?: string[];
  disabled: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInputField = ({
  id,
  name,
  type,
  placeholder,
  errors,
  disabled,
  onChange,
}: FormInputFieldProps) => (
  <div className='flex flex-col gap-2'>
    <Input
      className={`w-[380px] h-11 px-2.5 py-1.5 rounded-lg focus-visible:ring-transparent transition-all ${
        errors?.length
          ? errors[0] === '사용 가능합니다.'
            ? 'border border-green-500 focus:border-green-500'
            : 'border border-red-600 focus:border-red-600'
          : ''
      }`}
      id={id}
      name={name}
      type={type}
      required
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
    {errors && (
      <div>
        {errors.map((error: string) => (
          <p
            key={error}
            className={`flex items-center gap-1.5 ${
              error === '사용 가능합니다.' ? 'text-green-500' : 'text-error'
            }`}
          >
            {error === '사용 가능합니다.' ? (
              <CheckIcon className='w-4 h-4 text-green-500' />
            ) : (
              <XIcon className='w-4 h-4' />
            )}
            {error}
          </p>
        ))}
      </div>
    )}
  </div>
);
