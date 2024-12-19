'use client';

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchMeetingDetails } from './meetingDetail';
import { IMeeting } from '@/app/types';
import { useParams } from 'next/navigation';

interface MeetingContextType {
  meetingData: IMeeting | undefined;
  loading: boolean;
  error: boolean;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

const MeetingProvider = ({ children }: { children: ReactNode }) => {
  const [meetingData, setMeetingData] = useState<IMeeting>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!params.meetingsId) {
        setError(true);
        setLoading(false);
        return;
      }
      try {
        const data = await fetchMeetingDetails(Number(params.meetingsId));
        setMeetingData(data.result);
        setLoading(false);
      } catch (err) {
        console.error('데이터를 가져오는 중 오류 발생:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.meetingsId]);

  return (
    <MeetingContext.Provider value={{ meetingData, loading, error }}>
      {children}
    </MeetingContext.Provider>
  );
};

const useMeetingContext = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error(
      'ERROR: useMeetingContext는 MeetingProvider 내부에서만 사용가능합니다.',
    );
  }
  return context;
};

export { MeetingProvider, useMeetingContext };
