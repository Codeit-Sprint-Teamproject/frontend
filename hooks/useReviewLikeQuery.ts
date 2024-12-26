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

export const useReviewLikeQuery = (id: number) => {
  const queryClient = useQueryClient();

  const { mutate: likeMutation } = useMutation({
    mutationFn: () => toggleReviewLike(id),
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'reviews') {
          if (queryKey[1] === 'filter') {
            const value: InfiniteData<BookReviewResponse> | undefined =
              queryClient.getQueryData(queryKey);

            if (value && value.pages) {
              const allReviews = value.pages.flatMap(
                (page) => page.bookReviews,
              );
              const index = allReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const pageIndex = Math.floor(index / 10);
                const snapshot = { ...value };
                value.pages = [...value.pages];
                value.pages[pageIndex] = {
                  ...value.pages[pageIndex],
                  bookReviews: [...value.pages[pageIndex].bookReviews],
                };
                snapshot.pages[pageIndex].bookReviews[index % 10] = {
                  ...snapshot.pages[pageIndex].bookReviews[index % 10],
                  userLikeCk: true,
                  likes:
                    snapshot.pages[pageIndex].bookReviews[index % 10].likes + 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
          if (queryKey[1] === 'best') {
            const value: ReviewPageResponse | undefined =
              queryClient.getQueryData(queryKey);

            if (value && value.bookReviews) {
              const index = value.bookReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const snapshot = { ...value };
                snapshot.bookReviews = [...value.bookReviews];
                snapshot.bookReviews[index] = {
                  ...snapshot.bookReviews[index],
                  userLikeCk: true,
                  likes: snapshot.bookReviews[index].likes + 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
          if (queryKey[1] === 'detail') {
            const value: ReviewDetailResponse | undefined =
              queryClient.getQueryData(queryKey);
            if (value && value.bookReview) {
              const snapshot = { ...value };
              snapshot.bookReview = {
                ...snapshot.bookReview,
                userLikeCk: true,
                likes: (snapshot.bookReview?.likes || 0) + 1,
              };
              queryClient.setQueryData(queryKey, snapshot);
            }
          }
          if (queryKey[1] === 'book') {
            const value: BookReviewListResponse | undefined =
              queryClient.getQueryData(queryKey);
            if (value && value.bookReviews) {
              const index = value.bookReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const snapshot = { ...value };
                value.bookReviews = [...value.bookReviews];
                snapshot.bookReviews[index] = {
                  ...snapshot.bookReviews[index],
                  userLikeCk: true,
                  likes: snapshot.bookReviews[index]?.likes + 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
        }
      });
    },
    onError: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'reviews') {
          if (queryKey[1] === 'filter') {
            const value: InfiniteData<BookReviewResponse> | undefined =
              queryClient.getQueryData(queryKey);

            if (value && value.pages) {
              const allReviews = value.pages.flatMap(
                (page) => page.bookReviews,
              );

              const index = allReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const pageIndex = Math.floor(index / 10);
                const snapshot = { ...value };
                value.pages = [...value.pages];
                value.pages[pageIndex] = {
                  ...value.pages[pageIndex],
                  bookReviews: [...snapshot.pages[pageIndex].bookReviews],
                };
                snapshot.pages[pageIndex].bookReviews[index % 10] = {
                  ...snapshot.pages[pageIndex].bookReviews[index % 10],
                  userLikeCk: false,
                  likes:
                    snapshot.pages[pageIndex].bookReviews[index % 10].likes - 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
          if (queryKey[1] === 'best') {
            const value: ReviewPageResponse | undefined =
              queryClient.getQueryData(queryKey);
            if (value && value.bookReviews) {
              const index = value.bookReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const snapshot = { ...value };
                snapshot.bookReviews = [...value.bookReviews];
                snapshot.bookReviews[index] = {
                  ...snapshot.bookReviews[index],
                  userLikeCk: false,
                  likes: snapshot.bookReviews[index].likes - 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
          if (queryKey[1] === 'detail') {
            const value: ReviewDetailResponse | undefined =
              queryClient.getQueryData(queryKey);
            if (value && value.bookReview) {
              const snapshot = { ...value };
              snapshot.bookReview = {
                ...snapshot.bookReview,
                userLikeCk: false,
                likes: (snapshot.bookReview?.likes || 0) - 1,
              };
              queryClient.setQueryData(queryKey, snapshot);
            }
          }
          if (queryKey[1] === 'book') {
            const value: BookReviewListResponse | undefined =
              queryClient.getQueryData(queryKey);
            if (value && value.bookReviews) {
              const index = value.bookReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const snapshot = { ...value };
                value.bookReviews = [...value.bookReviews];
                snapshot.bookReviews[index] = {
                  ...snapshot.bookReviews[index],
                  userLikeCk: false,
                  likes: snapshot.bookReviews[index]?.likes - 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
        }
      });
    },
  });

  const { mutate: unlikeMutation } = useMutation({
    mutationFn: () => toggleReviewLike(id),
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'reviews') {
          if (queryKey[1] === 'filter') {
            const value: InfiniteData<BookReviewResponse> | undefined =
              queryClient.getQueryData(queryKey);

            if (value && value.pages) {
              const allReviews = value.pages.flatMap(
                (page) => page.bookReviews,
              );
              const index = allReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const pageIndex = Math.floor(index / 10);
                const snapshot = { ...value };
                value.pages = [...value.pages];
                value.pages[pageIndex] = {
                  ...value.pages[pageIndex],
                  bookReviews: [...snapshot.pages[pageIndex].bookReviews],
                };
                snapshot.pages[pageIndex].bookReviews[index % 10] = {
                  ...snapshot.pages[pageIndex].bookReviews[index % 10],
                  userLikeCk: false,
                  likes:
                    snapshot.pages[pageIndex].bookReviews[index % 10].likes - 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
          if (queryKey[1] === 'best') {
            const value: ReviewPageResponse | undefined =
              queryClient.getQueryData(queryKey);

            if (value && value.bookReviews) {
              const index = value.bookReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const snapshot = { ...value };
                snapshot.bookReviews = [...value.bookReviews];
                snapshot.bookReviews[index] = {
                  ...snapshot.bookReviews[index],
                  userLikeCk: false,
                  likes: snapshot.bookReviews[index].likes - 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
          if (queryKey[1] === 'detail') {
            const value: ReviewDetailResponse | undefined =
              queryClient.getQueryData(queryKey);
            if (value && value.bookReview) {
              const snapshot = { ...value };
              snapshot.bookReview = {
                ...snapshot.bookReview,
                userLikeCk: false,
                likes: (snapshot.bookReview?.likes || 0) - 1,
              };
              queryClient.setQueryData(queryKey, snapshot);
            }
          }
          if (queryKey[1] === 'book') {
            const value: BookReviewListResponse | undefined =
              queryClient.getQueryData(queryKey);
            if (value && value.bookReviews) {
              const index = value.bookReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const snapshot = { ...value };
                value.bookReviews = [...value.bookReviews];
                snapshot.bookReviews[index] = {
                  ...snapshot.bookReviews[index],
                  userLikeCk: false,
                  likes: snapshot.bookReviews[index]?.likes - 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
        }
      });
    },
    onError: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'reviews') {
          if (queryKey[1] === 'filter') {
            const value: InfiniteData<BookReviewResponse> | undefined =
              queryClient.getQueryData(queryKey);

            if (value && value.pages) {
              const allReviews = value.pages.flatMap(
                (page) => page.bookReviews,
              );

              const index = allReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const pageIndex = Math.floor(index / 10);
                const snapshot = { ...value };
                value.pages = [...value.pages];
                value.pages[pageIndex] = {
                  ...value.pages[pageIndex],
                  bookReviews: [...value.pages[pageIndex].bookReviews],
                };
                snapshot.pages[pageIndex].bookReviews[index % 10] = {
                  ...snapshot.pages[pageIndex].bookReviews[index % 10],
                  userLikeCk: true,
                  likes:
                    snapshot.pages[pageIndex].bookReviews[index % 10].likes + 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
          if (queryKey[1] === 'best') {
            const value: ReviewPageResponse | undefined =
              queryClient.getQueryData(queryKey);

            if (value && value.bookReviews) {
              const index = value.bookReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const snapshot = { ...value };
                snapshot.bookReviews = [...value.bookReviews];
                snapshot.bookReviews[index] = {
                  ...snapshot.bookReviews[index],
                  userLikeCk: true,
                  likes: snapshot.bookReviews[index].likes + 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
          if (queryKey[1] === 'detail') {
            const value: ReviewDetailResponse | undefined =
              queryClient.getQueryData(queryKey);
            if (value && value.bookReview) {
              const snapshot = { ...value };
              snapshot.bookReview = {
                ...snapshot.bookReview,
                userLikeCk: true,
                likes: (snapshot.bookReview?.likes || 0) + 1,
              };
              queryClient.setQueryData(queryKey, snapshot);
            }
          }
          if (queryKey[1] === 'book') {
            const value: BookReviewListResponse | undefined =
              queryClient.getQueryData(queryKey);
            if (value && value.bookReviews) {
              const index = value.bookReviews.findIndex((r) => r.id === id);

              if (index > -1) {
                const snapshot = { ...value };
                value.bookReviews = [...value.bookReviews];
                snapshot.bookReviews[index] = {
                  ...snapshot.bookReviews[index],
                  userLikeCk: true,
                  likes: snapshot.bookReviews[index]?.likes + 1,
                };
                queryClient.setQueryData(queryKey, snapshot);
              }
            }
          }
        }
      });
    },
  });
  const handleLike = (isLike: boolean) => {
    if (isLike) {
      unlikeMutation();
    } else {
      likeMutation();
    }
  };

  return { handleLike };
};
