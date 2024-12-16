export type MeetingList = {
  id: number;
  name: string;
  content: number;
  goalDays: number;
  readingTimeGoal: number;
  startDate: Date;
  endDate: Date;
  minCapacity: number;
  maxCapacity: number;
  currentCapacity: number;
  gatheringStatus: string;
  createdTime: Date;
  updatedTime: Date;
  bookTitle: string;
  bookImage: string;
  publisher: string;
  publishDate: string;
  star: number;
};
export type MyMeetingList = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  bookTitle: string;
  bookImage: string;
  completeRate: number;
  readingTimeGoal: number;
  currentCapacity: number;
};
export type MyMeetingCount = {
  participatingCount: number;
  completedCount: number;
  myCreatedCount: number;
  myWishedCount: number;
};
