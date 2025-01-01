import { Rating } from 'react-simple-star-rating';
import { useBookContext } from '@/app/reviews/_components/BookContext';
import { SearchedBook } from '@/types/book';
import Image from 'next/image';

export default function BookInfo({ book }: { book: SearchedBook }) {
  const { book: selectedBook, setBook } = useBookContext();
  const { id, title, image, author, publisher, publisherDate, star } = book;
  return (
    <div
      className={`flex gap-2.5 p-2.5 border-b mt-3 cursor-pointer ${selectedBook.id === id ? 'bg-customGrey-100' : ''}`}
      onClick={() => setBook({ id, title })}
    >
      <Image
        src={image}
        width={90}
        height={135}
        className='w-[90px] h-[135px]'
        alt='책 표지'
      />
      <div className='flex flex-col'>
        <h3 className='text-customGrey-800 mb-2'>{title}</h3>
        <p className='text-sm text-customGrey-500'>
          저자 <span className='text-customGrey-800'>{author}</span>
        </p>
        <p className='text-sm text-customGrey-500'>
          출판 <span className='text-customGrey-800'>{publisher}</span>
        </p>
        <p className='text-sm text-customGrey-500'>
          발행 <span className='text-customGrey-800'>{publisherDate}</span>
        </p>
        <div className='flex items-center gap-2 text-sm text-customGrey-500'>
          평점
          <div className='flex items-center mb-1'>
            <Rating
              size={14}
              readonly
              initialValue={star / 2}
              fillColor='#262626'
              SVGstyle={{ display: 'inline' }}
            />
            <span className='text-customGrey-800 ml-[1px] pt-[1px]'>
              {star}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
