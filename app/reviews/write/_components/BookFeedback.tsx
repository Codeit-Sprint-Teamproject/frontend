import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { Form } from './ReviewForm';

const RATING = {
  SG: '추천해요',
  NG: '아쉬웠어요',
  NONE: '평가하지 않을래요',
};
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

type Props = {
  setValue: UseFormSetValue<Form>;
  getValues: UseFormGetValues<Form>;
};

export default function BookFeedback({ setValue, getValues }: Props) {
  const rating = getValues('rating') || '';
  const tags = getValues('tags') || [];

  const handleClick = (tag: string) => {
    if (tags.includes(tag)) {
      setValue(
        'tags',
        tags.filter((t) => t !== tag),
        { shouldValidate: true },
      );
    } else if (tags.length < 3) {
      setValue('tags', [...tags, tag], { shouldValidate: true });
    }
  };
  const applySelectedStyle = (tag: string) => {
    if (tags.includes(tag)) {
      return 'bg-customGreen-500 text-white';
    }
  };

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
          {Object.entries(RATING).map(([key, rate]) => (
            <button
              type='button'
              key={key}
              className={`px-3 py-2.5 text-customGrey-800 border rounded-full ${key === rating ? 'bg-customGreen-500 text-white' : ''}`}
              onClick={() => setValue('rating', key, { shouldValidate: true })}
            >
              {rate}
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
              type='button'
              key={key}
              className={`h-10 px-2.5 py-1.5 text-customGrey-800 border rounded-md ${applySelectedStyle(key)}`}
              onClick={() => handleClick(key)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
