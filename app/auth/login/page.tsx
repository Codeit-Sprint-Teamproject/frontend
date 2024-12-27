import { LoginForm } from './_components/login-form';
import Logo from '@/public/Logo';

export default function LoginPage() {
  return (
    <div className='flex flex-col justify-center items-center mt-[70px]'>
      <p className='mb-3 text-[14px] font-medium'>모여서 읽고 싶은 지금</p>
      <span className='mb-[51px]'>
        <Logo />
      </span>
      <LoginForm />
    </div>
  );
}
