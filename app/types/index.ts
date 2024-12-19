export interface IMeeting {
  id: number;
  owner: string;
  name: string;
  content: string;
  goalDays: number;
  readingTimeGoal: number;
  startDate: string;
  endDate: string;
  minCapacity: number;
  maxCapacity: number;
  currentCapacity: number;
  gatheringStatus: 'RECRUITING' | 'FULL' | 'ACTIVE' | 'DELETED' | 'COMPLETED';
  createdTime: string;
  updatedTime: string;
  bookTitle: string;
  bookImage: string;
  publisher: string;
  publishDate: string;
  star: number;
  author: string;
  thumbnail: string;
  gatheringWeek: number;
}

export interface IPopularBooks {
  bookId: number;
  title: string;
  bookImage: string;
  gatheringCount: number;
}

export interface IFilterState {
  startDate: Date | null;
  recruitingOnly: boolean;
  targetTime: string | null;
}
