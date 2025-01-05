import DropDown from '@/components/DropDown';

type Props = {
  tab: 'active' | 'completed' | 'created' | 'bookmark';
  completeReading: () => void;
  leaveMeeting: () => void;
};
export default function MeetingDropDown({
  tab,
  completeReading,
  leaveMeeting,
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
}
