import React from 'react';
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
  console.log({ errors });

  return (
    <div className='relative flex flex-col gap-2'>
      <Input
        className={`w-[380px] h-11 px-2.5 py-1.5 text-sm rounded-lg focus-visible:ring-transparent transition-all ${
          errors.length && 'border-customRed '
        }`}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
      {errors.length > 0 && (
        <div className='absolute top-full mt-1 flex flex-col gap-1'>
          {errors.map((error: string) => (
            <p
              key={error}
              className='flex items-center gap-1.5 text-sm font-normal text-error'
            >
              <XIcon />
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
