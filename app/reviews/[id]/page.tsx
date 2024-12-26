import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import ReviewDetail from './_components/ReviewDetail';
import { getReviewDetailServer } from './_lib/getReviewDetailServer';

type Props = { params: { id: number } };

export default async function ReviewDetailPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { id } = params;
  await queryClient.prefetchQuery({
    queryKey: ['reviews', 'detail', id],
    queryFn: () => getReviewDetailServer(id as number),
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ReviewDetail />
    </HydrationBoundary>
  );
}
