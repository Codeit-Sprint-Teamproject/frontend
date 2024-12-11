import { MyReadingList } from './book';
import { MeetingList } from './meeting';

type UserProfile = {
  userId: number;
  userName: string;
  email: string;
  profile: string;
};

export type User = {
  user: UserProfile;
  gatheringList: MeetingList[];
  myReadingList: MyReadingList[];
};
