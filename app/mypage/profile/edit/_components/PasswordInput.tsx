import { useState } from 'react';
import PasswordEditForm from './PasswordEditForm';

export default function PasswordInput() {
  const [isEdit, setIsEdit] = useState(false);
  if (isEdit) {
    return <PasswordEditForm setIsEdit={setIsEdit} />;
  }
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-customGrey-800'>비밀번호</p>
      <div className='flex gap-3'>
        <input
          type='password'
          placeholder='●●●●●●●●'
          className='flex-1 h-11 px-1.5 py-2.5 border border-customGrey-200 text-customGrey-300 rounded-sm'
          disabled
        />
        <button
          className='h-11 p-2.5 bg-customGrey-800 text-white rounded-sm'
          onClick={() => setIsEdit(true)}
        >
          변경하기
        </button>
      </div>
    </div>
  );
}
