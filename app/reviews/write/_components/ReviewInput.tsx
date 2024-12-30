'use client';

import TextareaAutosize from 'react-textarea-autosize';

type Props = { content: string; setContent: (content: string) => void };
export default function ReviewInput({ content, setContent }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  return (
    <div className='relative flex flex-col'>
      {!content && (
        <h3 className='absolute left-10 top-5 text-lg font-bold'>
          리뷰를 작성해 주세요
        </h3>
      )}
      <TextareaAutosize
        className='h-[356px] border outline-none resize-none placeholder:text-sm pt-5 placeholder:pt-5'
        value={content}
        onChange={handleChange}
        placeholder={`
            🞄 책을 읽고 나서 어떤 기분이 들었나요?
            🞄 이 책에서 가장 기억에 남는 장면이나 문장이 있었나요?
            🞄 다른 사람들에게 이 책을 추천하고 싶다면, 어떤 이유인가요?
            🞄 책 속에서 가장 공감한 내용은 무엇인가요?
            🞄 아쉬웠던 점이 있다면 간단히 적어주세요.`}
        minRows={13}
      />
    </div>
  );
}
