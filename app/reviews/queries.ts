const reviewKeys = {
  all: ['reviews'],
  best: () => [...reviewKeys.all, 'best'],
  details: () => [...reviewKeys.all, 'detail'],
  detail: (id: string) => [...reviewKeys.details(), id],
  filters: () => [...reviewKeys.all, 'filter'],
  filter: (filter: string) => [...reviewKeys.filters(), filter],
  books: () => [...reviewKeys.all, 'book'],
  book: (title: string, page: number) => [...reviewKeys.books(), title, page],
};

export default reviewKeys;
