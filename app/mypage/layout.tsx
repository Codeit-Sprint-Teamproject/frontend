import Sidebar from './_components/Sidebar';

type Props = { children: React.ReactNode };

export default function MypageLayout({ children }: Props) {
  return (
    <div className='flex flex-col items-center pt-[60px]'>
      <div className='flex items-center gap-28'>
        <Sidebar />
        <main className='flex flex-col h-[790px]'>{children}</main>
      </div>
    </div>
  );
}
