/**
 * bookTitle: string;
 * author: string;
 * publisher: string;
 * publishDate: string;
 * star: Number;
 */

interface BookInfoProps {
  bookTitle: string;
  author: string;
  publisher: string;
  publishDate: string;
  star: number;
}

const BookInfo = ({
  bookTitle,
  author,
  publisher,
  publishDate,
  star,
}: BookInfoProps) => {
  return (
    <>
      <div className='mt-[9px] py-[16px] px-[10px] flex flex-row border-[1px] border-[rgba(0, 0, 0, 0.10)]'>
        <div className='w-[87px] h-[132px] flex justify-center items-center bg-orange-300'>
          이미지 영역
        </div>
        <div className='ml-[18px]'>
          <span className='text-xl font-bold'>{bookTitle}</span>
          <div className='grid grid-cols-[1fr_2fr] mt-[9px]'>
            <span>저자</span>
            <span>{author}</span>
            <span>출판</span>
            <span>{publisher}</span>
            <span>발행일</span>
            <span>{publishDate}</span>
            <span>평점</span>
            <span>☆☆☆☆☆ {`${star}`}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookInfo;
