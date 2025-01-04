import { useModalStore } from '@/store/modal';

export default function AlertModal({ message }: { message: string }) {
  const { closeModal } = useModalStore();
  return (
    <div className='w-full p-3 flex flex-col items-center gap-6'>
      <p className='text-lg text-customGrey-800 font-semibold'>{message}</p>
      <div className='w-1/2 flex'>
        <button
          className='flex-1 h-11 px-3 py-2 bg-customGreen-500 text-white rounded-sm'
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </div>
  );
}
