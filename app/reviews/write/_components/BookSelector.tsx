'use client';

import PlusIcon from '../_svg/PlusIcon';
import ThinCheckIcon from '../_svg/ThinCheckIcon';
import BookSearchModal from './BookSearchModal';
import { useBookContext } from '@/app/reviews/_components/BookContext';
import Modal from '@/components/Modal';
import CloseIcon from '@/components/common/icons/CloseIcon';
import SearchIcon from '@/components/common/icons/SearchIcon';
import { useModalStore } from '@/store/modal';
import { MyMeetingBookReview } from '@/types/book';

export default function BookSelector({
  books,
}: {
  books: MyMeetingBookReview[];
}) {
  const { isOpen, openModal, closeModal } = useModalStore();
  const { book, setBook } = useBookContext();

  const handleOpen = () => {
    if (book.id && !book.gatheringId) {
      handleClose();
    } else {
      openModal(<BookSearchModal onSelect={handleSelect} />);
    }
  };
  const handleClose = () => {
    setBook({ id: null, title: null });
  };
  const handleSelect = () => {
    closeModal();
  };
  const handleToggle = (id: number, title: string, gatheringId: number) => {
    if (book.gatheringId === gatheringId) {
      setBook({ id: null, title: null, gatheringId: undefined });
      return;
    }
    setBook({ id, title, gatheringId });
  };
  return (
    <div className='flex flex-col gap-[18px] p-5 bg-customGrey-50 rounded-sm'>
      <h3 className='text-lg text-customGrey-800 font-bold'>
        어떤 책의 리뷰를 남기시겠어요?{' '}
        <span className='text-base text-customGrey-300 mr-3 font-medium'>
          필수
        </span>
      </h3>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-customGrey-500'>최근 모임에서 읽은 책</p>
        <div className='flex flex-wrap gap-1.5'>
          {books?.map(({ id, gatheringId, title }) => (
            <button
              key={gatheringId}
              className={`flex gap-2.5 text-customGrey-800 border rounded-md px-2.5 py-1.5 disabled:bg-customGrey-100 disabled:text-customGrey-300 ${book.gatheringId === gatheringId ? 'bg-customGreen-500 text-white' : ''}`}
              onClick={() => handleToggle(id, title, gatheringId)}
              disabled={!!book.id && !book.gatheringId}
            >
              {title}
              {book.gatheringId === gatheringId ? (
                <ThinCheckIcon />
              ) : (
                <PlusIcon className='w-6 h-6' />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-customGrey-500'>
          다른 책을 리뷰하고 싶으신가요?
        </p>
        <button
          className={`h-11 px-1.5 py-2.5 border text-sm rounded-md cursor-pointer disabled:bg-customGrey-100 ${!book.gatheringId && book.title ? 'border-2 border-customGreen-500 bg-customGreen-50 text-black' : 'border-customGrey-300 bg-white'}`}
          onClick={handleOpen}
          disabled={!!book.id && !!book?.gatheringId}
        >
          <div className='flex justify-between'>
            <p
              className={`${!book.gatheringId && book.title ? 'text-black' : 'text-customGrey-300'}`}
            >
              {!book.gatheringId && book?.title
                ? book.title
                : '검색어를 입력해 주세요'}
            </p>

            {!book.gatheringId && book?.title ? (
              <CloseIcon
                className='w-5 h-5 stroke-customGrey-300'
                onClick={handleClose}
              />
            ) : (
              <SearchIcon className='stroke-customGrey-300' />
            )}
          </div>
        </button>
      </div>
      {isOpen && <Modal width='w-[526px] h-[693px]' onClose={handleClose} />}
    </div>
  );
}
