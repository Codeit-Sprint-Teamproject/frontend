'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { userSignup } from '../_lib/signup';
import TermsAgreement from './TermsAgreement';
import { SignupFormInput } from './signup-form-input';
import { FormButton } from '@/app/auth/_components/form-button';

export const SignupForm = () => {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(userSignup, initialState);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);

  const isFormValid = isEmailValid && isUserNameValid && isTermsAgreed;

  return (
    <form action={dispatch}>
      <div className='flex flex-col space-y-2'>
        <SignupFormInput
          errors={state?.errors}
          setIsEmailValid={setIsEmailValid}
          setIsUserNameValid={setIsUserNameValid}
        />
      </div>
      <TermsAgreement setIsTermsAgreed={setIsTermsAgreed} />
      <FormButton
        className='w-full h-12 p-2.5 font-bold bg-black rounded'
        disabled={!isFormValid}
      >
        가입하기
      </FormButton>
      {state?.message}
    </form>
  );
};
