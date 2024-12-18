import { Progress } from '@/components/ui/progress';
import AvatarIcon from '@/public/AvatarIcon';
import StarBlankIcon from '@/public/StarBlankIcon';
import StarFillIcon from '@/public/StarFillIcon';

export default function MeetingReviews() {
  /* (희원) 임시 값 사용 -> 데이터 api 받아올 예정 */
  /* (희원) 일단 4.2면 4개 채워지는 방식으로 구현 */
  const starScore = 4.2;
  const stisfactionLevel = ['만족해요', '보통이에요', '아쉬웠어요'];
  const stisfactionValue = [98, 1, 1];

  const reviewDatas = [
    {
      userName: 'kimgathering',
      starScore: 5,
      reviewId: 1,
      createDate: '2024-12-09',
      reviewContent:
        '리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다.',
    },
    {
      userName: 'kimgathering',
      starScore: 4,
      reviewId: 2,
      createDate: '2024-12-10',
      reviewContent:
        '리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. ',
    },
    {
      userName: 'kimgathering',
      starScore: 2,
      reviewId: 3,
      createDate: '2024-12-11',
      reviewContent:
        '리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. ',
    },
    {
      userName: 'kimgathering',
      starScore: 3,
      reviewId: 4,
      createDate: '2024-12-18',
      reviewContent:
        '리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. 리뷰 내용입니다. ',
    },
  ];

  return (
    <>
      <div className='w-full'>
        <div className='py-[80px] px-[200px] flex flex-row items-center justify-between bg-[#F8F8F8]'>
          <div className='w-[200px] h-[120px] flex flex-col justify-center items-center'>
            <span className='text-[54px] font-bold'>4.2</span>
            <div className='flex flex-row'>
              {Array.from({ length: Math.floor(starScore) }).map((_, index) => (
                <StarFillIcon key={index} width={36} height={36} />
              ))}
              {Array.from({ length: 5 - Math.floor(starScore) }).map(
                (_, index) => (
                  <StarBlankIcon key={index} width={36} height={36} />
                ),
              )}
            </div>
          </div>
          <div className='w-[300px] h-[110px] flex flex-row gap-3 text-[18px] font-bold items-center justify-center'>
            <div className='flex flex-col gap-2 items-end'>
              {stisfactionLevel.map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}
            </div>
            <div className='flex flex-col gap-2'>
              {stisfactionValue.map((item, idx) => (
                <div className='flex flex-row items-center' key={idx}>
                  <Progress
                    value={item}
                    className='w-[137px] h-[14px] mr-[12px] bg-[#D9D9D9]'
                  />
                  <span>{item}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-[27px]'>
          <div>
            <span className='text-[18px] font-bold'>
              모임 리뷰 {reviewDatas.length}
            </span>
            <div className='mt-[20px]'>
              {reviewDatas.map((reviewData) => (
                <div
                  key={reviewData.reviewId}
                  className='p-[20px] h-[195px] border-b-2 border-gray-100'
                >
                  <div className='flex flex-row items-center'>
                    <AvatarIcon width={24} height={24} />
                    <span className='ml-[4px] mr-[24px]'>
                      {reviewData.userName}
                    </span>
                    {Array.from({
                      length: reviewData.starScore,
                    }).map((__, index) => (
                      <StarFillIcon key={index} width={16} height={16} />
                    ))}
                    {Array.from({
                      length: 5 - reviewData.starScore,
                    }).map((__, index) => (
                      <StarBlankIcon key={index} width={16} height={16} />
                    ))}
                  </div>
                  <div className='mt-[10px] flex flex-col'>
                    {/* (희원) 리뷰 더미데이터 사용 -> api로 데이터 받아올 예정 */}
                    <span>{reviewData.reviewContent}</span>
                    <span>{reviewData.reviewContent}</span>
                    <span>{reviewData.reviewContent}</span>
                    <span>{reviewData.reviewContent}</span>
                  </div>
                  <div className='mt-[10px] opacity-30'>
                    {reviewData.createDate}
                  </div>
                </div>
              ))}
            </div>
            {/* (희원) api 연결 전, alert로 동작확인 -> api 연결해서 데이터 추가로 불러올 예정 */}
            <button
              className='w-full h-[48px] mt-[36px] text-[22px] font-bold border-[1px] border-[rgba(0, 0, 0, 0.10)]'
              onClick={() => alert('데이터 추가로 불러오기')}
            >
              더보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
