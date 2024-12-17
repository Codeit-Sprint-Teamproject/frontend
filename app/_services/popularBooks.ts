'use server';

import { fetchAPIServer } from '@/lib/fetchAPI.server';

export interface fetchPopularBooksProps {
  page: number;
  size: number;
}

export async function fetchPopularBooks({
  page,
  size,
}: fetchPopularBooksProps) {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  const endpoint = `/api/book/popular?${params.toString()}`;
  const data = await fetchAPIServer(endpoint, 'GET');

  if (data?.error) {
    throw new Error(data.error.message || 'Failed to fetch popular books');
  }

  return data;
}
