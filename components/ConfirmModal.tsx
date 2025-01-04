import { useModalStore } from '@/store/modal';

type Props = {
  title: string;
  content: string;
  onDelete: () => void;
};

export default function ConfirmModal({ title, content, onDelete }: Props) {
  const { closeModal } = useModalStore();
  const handleDelete = () => {
    onDelete();
    closeModal();
  };
  return (
    <div className='w-full px-3 pt-3 pb-1 flex flex-col items-center gap-6'>
      <div>
        <h3 className='font-bold text-lg'>{title}</h3>
        <p className='text-customGrey-500 text-sm text-center'>{content}</p>
      </div>
      <div className='w-full flex gap-2'>
        <button
          className='flex-1 h-11 px-3 py-2 border-[1.5px] rounded-sm text-customGrey-800'
          onClick={closeModal}
        >
          취소
        </button>
        <button
          className='flex-1 h-11 px-3 py-2 bg-customGreen-500 text-white rounded-sm'
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
