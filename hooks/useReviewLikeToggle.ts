import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { BookReviewListResponse } from '@/app/reviews/[id]/_lib/getBookReviews';
import { ReviewDetailResponse } from '@/app/reviews/[id]/_lib/getReviewDetail';
import { ReviewPageResponse } from '@/app/reviews/_lib/getBestAndPendingReviews';
import { BookReviewResponse } from '@/app/reviews/_lib/getFilteredBookReviews';
import { toggleReviewLike } from '@/app/reviews/_lib/toggleReviewLike';
import reviewKeys from '@/app/reviews/queries';

type Context = {
  previousFilterReviews?: InfiniteData<BookReviewResponse>;
  previousBestReviews?: ReviewPageResponse;
  previousDetailReview?: ReviewDetailResponse;
  previousBookReview?: BookReviewListResponse;
};

type Props = {
  id: number;
  isLiked: boolean;
  filter?: string;
  title?: string;
  page?: number;
};
export const useReviewLikeToggle = ({
  id,
  isLiked,
  filter,
  title,
  page,
}: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleReviewLike(id),
    onMutate: () => {
      const previousFilterReview = queryClient.getQueryData(
        reviewKeys.filter(filter || 'ALL'),
      );
      const previousBestReview = queryClient.getQueryData(reviewKeys.best());
      const previousDetailReview = queryClient.getQueryData(
        reviewKeys.detail(String(id)),
      );
      const previousBookReview = queryClient.getQueryData(
        reviewKeys.book(title ?? '', page || 0),
      );

      queryClient.setQueryData(
        reviewKeys.filter(filter || 'ALL'),
        (data: InfiniteData<BookReviewResponse> | undefined) => {
          if (!data) return data;
          const updatedPages = data.pages.map((page) => ({
            ...page,
            bookReviews: page.bookReviews.map((review) =>
              review.id === id
                ? {
                    ...review,
                    userLikeCk: !isLiked,
                    likes: isLiked ? review.likes - 1 : review.likes + 1,
                  }
                : review,
            ),
          }));
          return { ...data, pages: updatedPages };
        },
      );

      queryClient.setQueryData(
        reviewKeys.best(),
        (data: ReviewPageResponse | undefined) => {
          if (!data) return data;
          const updatedReviews = data.bookReviews?.map((review) =>
            review.id === id
              ? {
                  ...review,
                  userLikeCk: !isLiked,
                  likes: isLiked ? review.likes - 1 : review.likes + 1,
                }
              : review,
          );
          return { ...data, bookReviews: updatedReviews };
        },
      );
      queryClient.setQueryData(
        reviewKeys.detail(String(id)),
        (data: ReviewDetailResponse | undefined) => {
          if (!data) return data;

          return {
            ...data,
            bookReview: {
              ...data.bookReview,
              userLikeCk: !isLiked,
              likes: isLiked
                ? data.bookReview.likes - 1
                : data.bookReview.likes + 1,
            },
          };
        },
      );
      queryClient.setQueryData(
        reviewKeys.book(title || '', page || 0),
        (data: BookReviewListResponse | undefined) => {
          if (!data) return data;

          return {
            ...data,
            bookReviews: data.bookReviews.map((review) =>
              review.id === id
                ? {
                    ...review,
                    userLikeCk: !isLiked,
                    likes: isLiked ? review.likes - 1 : review.likes + 1,
                  }
                : review,
            ),
          };
        },
      );
      return {
        previousFilterReview,
        previousBestReview,
        previousDetailReview,
        previousBookReview,
      };
    },
    onError: (context: Context) => {
      if (context?.previousFilterReviews) {
        queryClient.setQueryData(
          reviewKeys.filters(),
          context.previousFilterReviews,
        );
      }
      if (context?.previousBestReviews) {
        queryClient.setQueryData(
          reviewKeys.best(),
          context.previousBestReviews,
        );
      }
      if (context?.previousDetailReview) {
        queryClient.setQueryData(
          reviewKeys.detail(String(id)),
          context.previousDetailReview,
        );
      }
      if (context?.previousBookReview) {
        queryClient.setQueryData(
          reviewKeys.book(title ?? '', page || 0),
          context.previousBookReview,
        );
      }
    },
  });
};
