import React from 'react';
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
      className='w-[380px] h-11 px-2.5 py-1.5 focus-visible:ring-transparent'
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
          <p key={error} className='text-error'>
            {error}
          </p>
        ))}
      </div>
    )}
  </div>
);
