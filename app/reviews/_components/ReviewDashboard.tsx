import BestReviews from './BestReviews';
import PendingReviewBox from './PendingReviewBox';
import ReviewList from './ReviewList';
import UserInfo from './UserInfo';

export default function ReviewDashboard() {
  return (
    <div className='flex justify-evenly itmes-center mt-10'>
      <div className='flex flex-col gap-2'>
        <UserInfo />
        <PendingReviewBox />
      </div>
      <div className='flex flex-col items-center gap-11 px-[44.5px]'>
        <BestReviews />
        <ReviewList />
      </div>
    </div>
  );
}
