'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export const FormButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending}>
      {children}
    </Button>
  );
};
