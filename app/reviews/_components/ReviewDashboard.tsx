import BestReviews from './BestReviews';
import PendingReviewBox from './PendingReviewBox';
import ReviewList from './ReviewList';
import UserInfo from './UserInfo';

export default function ReviewDashboard() {
  return (
    <div className='flex justify-evenly itmes-center mt-14'>
      <div className='flex flex-col gap-5'>
        <UserInfo />
        <PendingReviewBox />
      </div>
      <div className='flex flex-col items-center gap-11'>
        <BestReviews />
        <ReviewList />
      </div>
    </div>
  );
}
