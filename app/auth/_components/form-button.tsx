'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

interface FormButtonProps {
  children: React.ReactNode;
  disabled: boolean;
  className?: string;
}

export const FormButton = ({
  className,
  children,
  disabled,
}: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button className={className} type='submit' disabled={disabled || pending}>
      {children}
    </Button>
  );
};
