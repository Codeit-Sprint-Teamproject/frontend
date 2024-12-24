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

export interface IMeetingDetail {
  data: {
    id: number;
    owner: string;
    name: string;
    content: string;
    gatheringWeek: number;
    endDate: string;
    startDate: string;
    minCapacity: number;
    maxCapacity: number;
    currentCapacity: number;
    createdTime: Date;
    updatedTime: Date;
    gatheringStatus: string;
    bookTitle: string;
    bookImage: string;
    publisher: string;
    publishDate: string;
    star: number;
    author: string;
    thumbnail: string;
    readingTimeGoal: number;
  };
}
export interface IMeetingInfo {
  id: number;
  name: string;
  content: string;
  readingTimeGoal: number;
  owner: string;
  bookTitle: string;
  bookImage: string;
  publisher: string;
  publishDate: string;
  star: number;
  author: string;
  introduce: string;
}
