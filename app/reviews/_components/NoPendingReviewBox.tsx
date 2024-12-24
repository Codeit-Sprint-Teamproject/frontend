export default function NoPendingReviewBox() {
  return (
    <div className='flex flex-col'>
      <p className='font-bold mb-1'>새로운 리뷰를 기다리고 있어요!</p>
      <div className='w-[372px] h-[249px] bg-[#F6F6F6] text-center'>
        <h3 className='text-xl font-bold mt-12'>리뷰하고 싶은 책이 있나요?</h3>
        <p className='mt-3'>모읽지에서 작성해 보세요!</p>
        <button className='w-80 h-14 bg-[#C5C5C5] font-bold mt-14'>
          독서 리뷰 작성하기
        </button>
      </div>
    </div>
  );
}
