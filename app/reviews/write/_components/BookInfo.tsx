import { SearchedBook } from '@/types/book';
import Image from 'next/image';

export default function BookInfo({ book }: { book: SearchedBook }) {
  const { title, image, author, publisher, publisherDate, star } = book;
  return (
    <div className='flex gap-2.5 p-2.5 border-b mt-3 cursor-pointer'>
      <Image src={image} width={90} height={135} alt='책 표지' />
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
        <p className='text-sm text-customGrey-500'>
          {/* TODO (유진) react-simple-star-rating 별점 표기할 예정 */}
          평점 <span className='text-customGrey-800'>{star}</span>
        </p>
      </div>
    </div>
  );
}
