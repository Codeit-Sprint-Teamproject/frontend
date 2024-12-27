import React from 'react';
import CheckIcon from '../../_svg/CheckIcon';
import XIcon from '../../_svg/XIcon';
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
  errors = [],
  disabled,
  onChange,
}: FormInputFieldProps) => {
  const hasError = (message: string) => errors.includes(message);

  const getColorClass = (errorCondition: boolean, isInitial: boolean) => {
    if (isInitial) return 'text-gray-500';
    return errorCondition ? 'text-customRed' : 'text-customGreen-500';
  };

  const getIcon = (errorCondition: boolean, isInitial: boolean) => {
    if (isInitial) return CheckIcon;
    return errorCondition ? XIcon : CheckIcon;
  };

  const renderValidationMessage = (
    condition: boolean,
    message: string,
    isInitial: boolean,
  ) => (
    <div
      className={`flex items-center gap-[6px] ${getColorClass(condition, isInitial)}`}
    >
      {React.createElement(getIcon(condition, isInitial), {
        className: `w-4 h-4 ${getColorClass(condition, isInitial)}`,
      })}
      <p className='text-sm font-normal'>{message}</p>
    </div>
  );

  return (
    <div className='relative flex flex-col gap-2'>
      <Input
        className={`w-[380px] h-11 px-2.5 py-1.5 rounded-lg focus-visible:ring-transparent transition-all ${
          errors.length
            ? errors.includes('사용 가능합니다.')
              ? 'border border-customGreen-500 focus:border-customGreen-500'
              : 'border border-customRed focus:border-customRed'
            : 'border border-gray-300'
        }`}
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
      {id === 'password' && (
        <div className='flex gap-[13px]'>
          {renderValidationMessage(
            hasError('비밀번호는 8자 이상이어야 합니다.'),
            '8자 이상',
            errors.length === 0,
          )}
          {renderValidationMessage(
            hasError('비밀번호에는 최소 하나의 소문자가 포함되어야 합니다.') ||
              hasError('비밀번호에는 최소 하나의 숫자가 포함되어야 합니다.') ||
              hasError(
                '비밀번호에는 최소 하나의 특수문자가 포함되어야 합니다 (!@#$%^&*).',
              ),
            '영문/숫자/특수문자 3가지 모두 포함',
            errors.length === 0,
          )}
        </div>
      )}
      {id === 'confirmPassword' &&
        renderValidationMessage(
          hasError('비밀번호와 비밀번호 확인이 일치하지 않습니다.'),
          '비밀번호 일치',
          errors.length === 0,
        )}
      {errors.length > 0 && id !== 'password' && id !== 'confirmPassword' && (
        <div className='absolute top-full mt-1 flex flex-col gap-1'>
          {errors.map((error: string) => (
            <p
              key={error}
              className={`flex items-center gap-1.5 text-sm font-normal ${
                error === '사용 가능합니다.'
                  ? 'text-customGreen-500'
                  : 'text-customRed'
              }`}
            >
              {React.createElement(
                error === '사용 가능합니다.' ? CheckIcon : XIcon,
                {
                  className: `w-4 h-4 ${
                    error === '사용 가능합니다.'
                      ? 'text-customGreen-500'
                      : 'text-customRed'
                  }`,
                },
              )}
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
