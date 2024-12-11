'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { userSignup } from '../_lib/signup';
import { SignupFormInput } from './signup-form-input';
import { FormButton } from '@/app/auth/_components/form-button';

export const SignupForm = () => {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(userSignup, initialState);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(false);

  const isFormValid = isEmailValid && isUserNameValid;

  return (
    <form action={dispatch}>
      <div className='flex flex-col space-y-2'>
        <SignupFormInput
          errors={state?.errors}
          setIsEmailValid={setIsEmailValid}
          setIsUserNameValid={setIsUserNameValid}
        />
      </div>
      <FormButton disabled={!isFormValid}>회원가입</FormButton>
      {state?.message}
    </form>
  );
};
