const RATING = ['추천해요', '아쉬웠어요', '평가하지 않을래요'];
const TAGS = {
  CS: '🤗 따뜻한 위로를 받았어요',
  FUN: '🤩 정말 흥미진진했어요',
  SAD: '😢 눈물이 날 뻔 했어요',
  KL: '📚 유익한 지식을 얻었어요',
  TIME: '⏳ 시간 가는 줄 몰랐어요',
  FIND: '🔍 새로운 것을 발견했어요',
  DP: '😔 결말이 아쉬웠어요',
  BAD: '😕 기대 이하였어요',
};

export default function BookFeedback() {
  return (
    <div className='flex flex-col gap-[60px] h-[412px] p-5 bg-customGrey-50 rounded-sm'>
      <div>
        <h3 className='text-lg text-customGrey-800 font-bold mb-[18px]'>
          이 책을 추천하시나요?{' '}
          <span className='text-base text-customGrey-300 font-medium'>
            필수
          </span>
        </h3>
        <div className='flex gap-1.5'>
          {RATING.map((rating, i) => (
            <button
              key={i}
              className='px-3 py-2.5 text-customGrey-800 border rounded-full'
            >
              {rating}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className='text-lg text-customGrey-800 font-bold'>
          이 책을 읽고 어떤 감정을 느끼셨나요?
        </h3>
        <p className='text-customGrey-300 mb-[18px]'>최대 3개 선택 가능</p>
        <div className='flex flex-wrap gap-1.5'>
          {Object.entries(TAGS).map(([key, tag]) => (
            <button
              key={key}
              className='h-10 px-2.5 py-1.5 text-customGrey-800 border rounded-md'
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
