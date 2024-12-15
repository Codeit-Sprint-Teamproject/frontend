import { SignupForm } from './_components/signup-form';

export default function SignUpPage() {
  return (
    <div className='flex flex-col justify-center items-center mt-32'>
      <p className='mb-2.5'>모여서 읽고 싶은 지금, 모읽지</p>
      <h2 className='text-2xl font-bold mb-12'>회원가입</h2>
      <SignupForm />
    </div>
  );
}
