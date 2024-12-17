'use client';

import React, { useState } from 'react';
import { checkDuplicate } from '../_lib/duplicate-check';
import { Button } from '@/components/ui/button';

interface CheckDuplicateButtonProps {
  type: 'email' | 'userName';
  value: string;
  setError: (message: string[]) => void;
  onSuccess: () => void;
  onFailure: () => void;
}

export const CheckDuplicateButton = ({
  type,
  value,
  setError,
  onSuccess,
  onFailure,
}: CheckDuplicateButtonProps) => {
  const [statusMessage, setStatusMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const handleCheck = async () => {
    if (!value) {
      setError(['값을 입력해주세요.']);
      setStatusMessage('');
      setMessageColor('');
      onFailure();
      return;
    }

    const result = await checkDuplicate(type, value);

    if (result.isDuplicate) {
      setError([result.message]);
      setStatusMessage(result.message);
      setMessageColor('text-error');
      onFailure();
    } else {
      setError([]);
      setStatusMessage(result.message);
      setMessageColor('text-green-500');
      onSuccess();
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <Button
        onClick={handleCheck}
        type='button'
        className='w-20 px-2 py-1 bg-black text-white rounded'
      >
        중복 검사
      </Button>
      {statusMessage && <p className={` ${messageColor}`}>{statusMessage}</p>}
    </div>
  );
};
