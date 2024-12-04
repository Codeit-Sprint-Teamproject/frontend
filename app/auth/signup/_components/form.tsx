'use client';

import { useFormState } from 'react-dom';
import { userSignup } from '../_lib/signup';
import { FormButton } from './form-button';
import { FormInput } from './form-input';

export const Form = () => {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(userSignup, initialState); // createSignup은 /src/app/signup/lib/signup.ts의 함수

  return (
    <form action={dispatch}>
      <div className='flex flex-col space-y-2'>
        <FormInput errors={state?.errors} />
      </div>
      <FormButton />
    </form>
  );
};
