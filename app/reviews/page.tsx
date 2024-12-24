import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import ReviewDashboard from './_components/ReviewDashboard';
import { getBestAndPendingReviewsServer } from './_lib/getBestAndPendingReviewsServer';
import { getFilteredBookReviewsServer } from './_lib/getFilteredBookReviewsServer';

export default async function ReviewsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['reviews', 'best'],
    queryFn: getBestAndPendingReviewsServer,
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['reviews', 'filter', 'ALL'],
    queryFn: ({ pageParam = 0 }) =>
      getFilteredBookReviewsServer('ALL', pageParam),
    initialPageParam: 0,
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>
      <ReviewDashboard />
    </HydrationBoundary>
  );
}
