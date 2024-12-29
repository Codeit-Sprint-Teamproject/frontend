'use client';

import { useBookContext } from '../../_components/BookContext';
import BookSearchModal from './BookSearchModal';
import Modal from '@/components/Modal';
import SearchIcon from '@/components/common/icons/SearchIcon';
import { useModalStore } from '@/store/modal';

export default function BookSelector() {
  const { isOpen, openModal, closeModal } = useModalStore();
  const { book, setBook } = useBookContext();
  const handleOpen = () => {
    openModal(<BookSearchModal onSelect={handleSelect} />);
  };
  const handleClose = () => {
    setBook({ id: null, title: null });
  };
  const handleSelect = () => {
    closeModal();
  };
  return (
    <div className='flex flex-col gap-[18px] p-5 bg-customGrey-50 rounded-sm'>
      <h3>
        어떤 책의 리뷰를 남기시겠어요? <span className='mr-3'>필수</span>
      </h3>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-customGrey-500'>최근 모임에서 읽은 책</p>
        <div className='flex flex-wrap gap-1.5'>
          <button className='border rounded-md px-1.5 py-2.5'>
            디 에션셸: 한강 (무선 보급판)
          </button>
          <button className='border rounded-md px-1.5 py-2.5'>
            고요한 우연
          </button>
          <button className='border rounded-md px-1.5 py-2.5'>
            트렌드 코리아 2025+
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-customGrey-500'>
          다른 책을 리뷰하고 싶으신가요?
        </p>
        <div className='h-11 px-1.5 py-2.5 border text-sm rounded-md bg-white cursor-pointer'>
          <div
            className='flex justify-between text-customGrey-300'
            onClick={handleOpen}
          >
            검색어를 입력해 주세요
            <SearchIcon className='stroke-customGrey-300' />
          </div>
        </div>
        {book?.title && <button>{book.title}</button>}
      </div>
      {isOpen && <Modal width='w-[526px] h-[693px]' onClose={handleClose} />}
    </div>
  );
}
