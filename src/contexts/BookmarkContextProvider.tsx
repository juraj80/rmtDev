import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItemExpandedType } from "../lib/types";

type BookmarksContextType = {
  bookmarkedIds: number[];
  handleBookmarkedIds: (id: number) => void;
  bookmarkedJobItems: JobItemExpandedType[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

export default function BookmarkContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);

  const handleBookmarkedIds = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleBookmarkedIds,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
