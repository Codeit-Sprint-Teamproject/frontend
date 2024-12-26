import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import BookReviewList from './_components/BookReviewList';
import ReviewDetail from './_components/ReviewDetail';
import { getBookReviewsServer } from './_lib/getBookReviewsServer';
import { ReviewDetailResponse } from './_lib/getReviewDetail';
import { getReviewDetailServer } from './_lib/getReviewDetailServer';

type Props = { params: { id: number } };

export default async function ReviewDetailPage({ params }: Props) {
  const queryClient = new QueryClient();
  const { id } = params;
  await queryClient.prefetchQuery({
    queryKey: ['reviews', 'detail', id],
    queryFn: () => getReviewDetailServer(id as number),
  });
  const reviewInfo = queryClient.getQueryData<ReviewDetailResponse>([
    'reviews',
    'detail',
    id,
  ]);
  const title = reviewInfo?.bookResponse.title;

  if (title) {
    await queryClient.prefetchQuery({
      queryKey: ['reviews', 'book', title, 0],
      queryFn: () => getBookReviewsServer(0, title),
    });
  }
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <div className='flex gap-[50px] pt-[60px]'>
        <ReviewDetail />
        <BookReviewList title={title} />
      </div>
    </HydrationBoundary>
  );
}
