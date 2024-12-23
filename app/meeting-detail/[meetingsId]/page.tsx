'use client';

import MeetingDetails from './_components/MeetingsDetails';

interface MeetingPageProps {
  params: {
    meetingsId: string;
  };
}

export default function MeetingDetailPage({ params }: MeetingPageProps) {
  const gatheringId = Number(params.meetingsId);

  if (isNaN(gatheringId)) {
    return <div>Wrong Meeting ID</div>;
  }

  return <MeetingDetails gatheringId={gatheringId} />;
}
