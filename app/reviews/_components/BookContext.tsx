'use client';

import { createContext, useContext, useState } from 'react';

type BookType = {
  id: number | null;
  title: string | null;
};
type BookContextType = {
  book: BookType;
  setBook: (book: BookType) => void;
};

export const BookContext = createContext<BookContextType | null>(null);
export default function BookContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [book, setBook] = useState<BookType>({ id: null, title: null });

  return (
    <BookContext.Provider value={{ book, setBook }}>
      {children}
    </BookContext.Provider>
  );
}
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('BookContext must be used within BookProvider');
  }
  return context;
};
