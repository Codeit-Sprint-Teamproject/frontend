'use client';

import { Input } from '@/components/ui/input';

export default function MainPageBody() {
  // 더미 데이터
  // 베스트 서적 Top3
  const bestBooks = [
    { title: 'title1', content: 'content1', author: 'author1' },
    { title: 'title2', content: 'content2', author: 'author2' },
    { title: 'title3', content: 'content3', author: 'author3' },
  ];

  // 생성된 모임 목록
  // 장소, 서적, 모집마감일, 모임시작일, 모임종료일, 최소인원, 목표 독서시간 + ?
  // 카드에서 보여줄 데이터 : ?
  // 무한스크롤 미적용 - 적용예정
  const meetings = [
    { title: 'meeting-title1', content: 'content1', author: 'author1' },
    { title: 'meeting-title2', content: 'content2', author: 'author2' },
    { title: 'meeting-title3', content: 'content3', author: 'author3' },
    { title: 'meeting-title4', content: 'content4', author: 'author4' },
    { title: 'meeting-title5', content: 'content5', author: 'author5' },
    { title: 'meeting-title6', content: 'content6', author: 'author6' },
    { title: 'meeting-title7', content: 'content7', author: 'author7' },
    { title: 'meeting-title8', content: 'content8', author: 'author8' },
    { title: 'meeting-title9', content: 'content9', author: 'author9' },
    { title: 'meeting-title10', content: 'content10', author: 'author10' },
    { title: 'meeting-title11', content: 'content11', author: 'author11' },
    { title: 'meeting-title12', content: 'content12', author: 'author12' },
    { title: 'meeting-title13', content: 'content13', author: 'author13' },
    { title: 'meeting-title14', content: 'content14', author: 'author14' },
    { title: 'meeting-title15', content: 'content15', author: 'author15' },
    { title: 'meeting-title16', content: 'content16', author: 'author16' },
    { title: 'meeting-title17', content: 'content17', author: 'author17' },
    { title: 'meeting-title18', content: 'content18', author: 'author18' },
  ];

  return (
    <>
      <div className='mt-20 flex flex-col items-center justify-start'>
        <div className='flex flex-col items-center gap-4 mb-20'>
          <h2 className='text-4xl font-bold mb-4'>모여서 읽고 싶은 지금</h2>
          <Input
            className='w-[32.5625rem] h-[3.5rem]'
            placeholder='원하는 책과 관련된 모임을 검색해보세요!'
          />
        </div>
        <div className='w-[70rem] h-[30rem]'>
          <div className='mb-4'>
            <h2 className='text-xl font-bold'>Best 서적</h2>
            <h6 className='text-md text-gray-300'>모임을 많이 만든 책</h6>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 '>
            {bestBooks.map((book, idx) => (
              <div
                key={idx}
                className='h-[18rem] border rounded-lg shadow-md p-4 hover:shadow-lg bg-white'
              >
                <h3 className='text-lg font-semibold'>{book.title}</h3>
                <p className='text-sm text-gray-600'>{book.content}</p>
                <p className='text-sm text-gray-400 mt-2'>by {book.author}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='w-[70rem] h-[20rem] '>
          <div className='mb-4'>
            <h2 className='text-xl font-bold'>모임 목록</h2>
            <h6 className='text-md text-gray-300'>어디서든 독서를 시작해요</h6>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {meetings.map((meeting, idx) => (
              <div
                key={idx}
                className='h-[12.5rem] border rounded-lg shadow-md p-4 hover:shadow-lg bg-white'
              >
                <h3 className='text-lg font-semibold'>{meeting.title}</h3>
                <p className='text-sm text-gray-600'>{meeting.content}</p>
                <p className='text-sm text-gray-400 mt-2'>
                  by {meeting.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
