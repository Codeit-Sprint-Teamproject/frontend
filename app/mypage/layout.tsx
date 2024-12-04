import Sidebar from './_components/Sidebar';

type Props = { children: React.ReactNode };

export default function MypageLayout({ children }: Props) {
  return (
    <div className='flex flex-col items-center mt-24'>
      <div className='flex items-center gap-5'>
        <aside>
          <Sidebar />
        </aside>
        <main className='flex flex-col h-[790px]'>{children}</main>
      </div>
    </div>
  );
}
