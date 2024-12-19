import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import ReviewDashboard from './_components/ReviewDashboard';
import { getBestAndPendingReviewsServer } from './_lib/getBestAndPendingReviewsServer';

export default async function ReviewsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['reviews', 'best'],
    queryFn: getBestAndPendingReviewsServer,
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ReviewDashboard />
    </HydrationBoundary>
  );
}
