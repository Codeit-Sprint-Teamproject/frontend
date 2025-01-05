import ReviewList from './_components/ReviewList';

export default function MyReviewPage() {
  return (
    <div className='w-[750px] flex flex-col'>
      <h4 className='text-2xl text-customGrey-800 font-bold pb-6'>
        나의 게시글
      </h4>
      <div className='border-b border-customGrey-200'>
        <p className='w-[70px] font-bold border-b-[2px] border-black'>
          독서 리뷰
        </p>
      </div>
      <ReviewList />
    </div>
  );
}
