import { LoginForm } from './_components/login-form';

export default function LoginPage() {
  return (
    <div className='flex flex-col justify-center items-center mt-[72px]'>
      <p className='mb-2.5 text-base font-medium'>
        모여서 읽고 싶은 지금, 모읽지
      </p>
      <h2 className='text-2xl font-bold mb-12'>로그인</h2>
      <LoginForm />
    </div>
  );
}
