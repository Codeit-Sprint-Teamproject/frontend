import DropDown from '@/components/DropDown';

type Props = {
  tab: 'active' | 'completed' | 'created' | 'bookmark';
  completeReading: () => void;
  leaveMeeting: () => void;
  deleteMeeting: () => void;
  unlikeMeeting: () => void;
};
export default function MeetingDropDown({
  tab,
  completeReading,
  leaveMeeting,
  deleteMeeting,
  unlikeMeeting,
}: Props) {
  if (tab === 'completed') return null;
  if (tab === 'active') {
    return (
      <DropDown
        items={[
          { text: '독서 완료하기', onClick: completeReading },
          { text: '모임 나가기', onClick: leaveMeeting, isDelete: true },
        ]}
      />
    );
  }
  if (tab === 'created') {
    return (
      <DropDown
        items={[{ text: '삭제하기', onClick: deleteMeeting, isDelete: true }]}
      />
    );
  }
  if (tab === 'bookmark') {
    return (
      <DropDown
        items={[
          { text: '찜하기 해제', onClick: unlikeMeeting, isDelete: true },
        ]}
      />
    );
  }
}
