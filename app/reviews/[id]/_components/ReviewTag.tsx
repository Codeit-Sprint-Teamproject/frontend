import { BookReviewTag } from '@/types/book';

const tagMessage = {
  BAD: '😕 기대 이하였어요',
  CS: '🤗따뜻한 위로를 받았어요',
  DP: '😔 결말이 아쉬웠어요',
  FIND: '🔍 새로운 것을 발견했어요',
  FUN: '🤩 정말 흥미진진했어요',
  KL: '📚 유익한 지식을 얻었어요',
  SAD: '😢 눈물이 날 뻔 했어요',
  TIME: '⏳ 시간 가는 줄 몰랐어요',
};

export default function ReviewTag({ tag }: { tag: string }) {
  const tags = tag.split(',');
  const messages = tags.map((tag) => tagMessage[tag as BookReviewTag]);

  return (
    <div className='flex flex-wrap gap-2.5'>
      {messages?.map((message, i) => (
        <p key={i} className='h-10 px-2.5 py-1.5 border rounded-sm'>
          {message}
        </p>
      ))}
    </div>
  );
}
