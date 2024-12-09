import Meeting from './Meeting';

export default function Meetings() {
  const meetings = [
    {
      name: '모임 1',
      gathering_date: new Date(2024, 11, 10),
      end_date: new Date(2024, 11, 24),
      capacity: 31,
    },
    {
      name: '모임 2',
      gathering_date: new Date(2024, 11, 20),
      end_date: new Date(2024, 11, 31),
      capacity: 15,
    },
    {
      name: '모임 3',
      gathering_date: new Date(2025, 0, 8),
      end_date: new Date(2025, 0, 24),
      capacity: 4,
    },
  ];
  return (
    <div className='flex flex-col gap-[15px] mt-[34px]'>
      {meetings.map((meeting, i) => (
        <Meeting key={i} meeting={meeting} />
      ))}
    </div>
  );
}
