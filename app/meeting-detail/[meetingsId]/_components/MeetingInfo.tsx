import { useState } from 'react';
import BookInfo from './BookInfo';
import BookOpenIcon from '@/public/BookOpenIcon';
import ChevronDown from '@/public/ChevronDownIcon';
import UserIcon from '@/public/UserIcon';

const bookTitle = '디 에센셜: 한강(무선 보급판)';
const targetTime = 30;
const totalPages = 364;
const goalDays = 14;
const author = '한강';
const publisher = '문학동네';
const publishDate = '2024.06.01';
const star = 4.2;
const meetingLeader = 'kimgathering';
const expectedReadingAmount = targetTime * goalDays;

export default function MeetingInfo() {
  const [bookMoreInfo, setBooMoreInfo] = useState(false);

  const bookMoreInfoButtonHandler = () => {
    setBooMoreInfo(!bookMoreInfo);
  };

  return (
    <>
      <div className='w-full'>
        {/* 기간, 책 정보 */}
        <div>
          <h2 className='text-2xl font-bold'>{goalDays}일 동안</h2>
          <h2 className='text-2xl'>
            <span className='font-bold'>{`[${bookTitle}]`}</span>
            함께 읽어요
          </h2>
          <div className='p-[6px]'>
            <BookInfo
              bookTitle={bookTitle}
              author={author}
              publisher={publisher}
              publishDate={publishDate}
              star={star}
            />
          </div>
        </div>
        {/* 책소개 */}
        <div className='mt-[23px] border-b-[1px] border-[rgba(0, 0, 0, 0.10)]'>
          <h6 className='text-18px font-bold'>책소개</h6>
          <div
            className={`relative mt-[10px] ${bookMoreInfo ? '' : 'h-[130px] overflow-y-hidden'}`}
          >
            <p>
              작가의 핵심 작품들을 큐레이팅하여 한 권으로 엮은 스페셜 에디션 ‘디
              에센셜The essential’. 문학동네에서 출시하는 디 에센셜 한국작가
              편은 ‘센세이션’이라는 키워드 아래, 독자들에게 강렬한 독서 경험을
              선사하며 한국문학에 센세이션을 일으킨 작가를 선정한다. 작가의
              작품세계를 고루 조망해 수록작을 선정하고 표지와 편집을 새로이 한
              ‘디 에센셜 한국작가 편’을 한국문학에 입문하는 첫 책으로, 혹은
              한국작가를 재발견하는 기회로 두루 누려주시길 바란다.첫번째 작가는
              한강이다. 한강 작가는 1993년 등단 후 30년간 문학이 삶에 제기하는
              근본적인 물음─인간은 어떻게 서로를 믿고 사랑하는가, 세상은 왜
              이토록 아름다우며 동시에 잔인한가, 상실과 고통 앞에 인간은 무엇을
              할 수 있나─을 정면으로 마주한 작품을 다양한 장르로 써왔다. 소설과
              시뿐만 아니라 어른을 위한 동화나 자신이 직접 만들고 부른 노래와
              글을 함께 담은 산문집, 시와 소설이 어우러진 작품집 등을 꾸준히
              펴냈다. 뿐만 아니라 미디어 아트를 통한 비주얼 퍼포먼스 작업도
              이어가며 텍스트 밖으로 자신의 공간을 확장했다.한국인 최초로
              인터내셔널 부커상을 수상했으며, 아시아 최초로 노르웨이 ‘미래
              도서관’ 프로젝트 참여 작가로 선정되는 등의 쾌거를 이루며 국경을
              넘어 한국문학의 센세이션이자 상징인 이름이 된 그를 ‘디 에센셜
              한국작가 편’의 첫번째 작가로 선보인다.
            </p>
            {!bookMoreInfo && (
              <div className='absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-t from-white to-transparent pointer-events-none'></div>
            )}
          </div>
          {bookMoreInfo ? (
            <div
              onClick={() => bookMoreInfoButtonHandler()}
              className='cursor-pointer flex flex-row justify-end'
            >
              <span>접기</span>
              <ChevronDown width='24px' height='24px' />
            </div>
          ) : (
            <div
              onClick={() => bookMoreInfoButtonHandler()}
              className='cursor-pointer flex flex-row justify-end'
            >
              <span>더보기</span>
            </div>
          )}
        </div>
        {/* 목표 독서 시간 */}
        <div className='mt-[35px]'>
          <h2 className='text-2xl font-bold'>목표 독서 시간</h2>
          <h2 className='text-2xl'>
            <span className='font-bold'>하루 {targetTime}분, </span>
            완독하지 않아도 괜찮아요
          </h2>
        </div>
        {/* 독서 가이드 */}
        <div className='pb-[28px] border-b-[1px] border-[rgba(0, 0, 0, 0.10)]'>
          <div className='mt-[40px] '>
            <h6 className='text-[18px] font-bold'>독서 가이드</h6>
            <div className='mt-[10px] py-[16px] px-[12px] gap-[7px] flex flex-col bg-[#F8F8F8] text-[18px]'>
              <div className='flex flex-row items-center justify-start gap-[6px] text-[14px] text-gray-400'>
                <div className='flex flex-row py-[2px] px-[6px] rounded-[2px] bg-[#E0E0E0] gap-[4px] w-[45px] items-center justify-center'>
                  <BookOpenIcon width='14px' height='14px' />
                  <span className=''>책</span>
                </div>
                <span>{bookTitle}</span>
              </div>
              {/* 모임기간 x 목표독서시간 > 전체페이지수 = 완독할 가능성 높은 책 */}
              {expectedReadingAmount >= totalPages ? (
                <span className='font-bold text-[18px]'>
                  모임 기간 안에 완독할 가능성이 높은 책이에요!
                </span>
              ) : (
                <></>
              )}
              <span>전체 페이지 수 {totalPages}</span>
              <span>기간 내 예상 독서량 364페이지 이상</span>
            </div>
            <div className='mt-[20px] flex flex-col text-[18px]'>
              <span>하루 30분이면 대략 30 페이지 정도 읽을 수 있어요! </span>
              <span>
                우리의 목표는 완독이 아니라 꾸준한 독서 습관을 만드는 거예요
              </span>
            </div>
          </div>
        </div>
        {/* 모임장 소개 */}
        <div className='mt-[40px] pb-[28px] border-b-[1px] border-[rgba(0, 0, 0, 0.10)]'>
          <h3 className='text-[24px]'>
            <span className='font-bold'>모임장</span>을 소개할게요
          </h3>
          <div className='mt-[40px] flex flex-row justify-start items-center gap-[20px]'>
            <UserIcon width='60px' height='60px' />
            <h3 className='text-[24px]'>{meetingLeader}</h3>
          </div>
          <div className='mt-[36px] flex flex-col text-[18px]'>
            <span>안녕하세요!</span>
            <span>
              매일 조금씩 책을 읽으며 함께 좋은 독서 습관을 만들어 가요.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
