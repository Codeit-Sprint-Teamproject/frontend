export default function EmptyMeetingList({
  tab,
}: {
  tab: 'active' | 'completed' | 'created' | 'bookmark';
}) {
  const messages: Record<typeof tab, string> = {
    active: '참여중인 모임이 없습니다.',
    completed: '완료한 모임이 없습니다.',
    created: '내가 만든 모임이 없습니다.',
    bookmark: '찜한 모임이 없습니다.',
  };
  return (
    <div className='pt-[200px] pl-10'>
      <p className='text-lg text-customGrey-400 text-center'>{messages[tab]}</p>
    </div>
  );
}
