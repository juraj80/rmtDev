import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";

export const BookmarksContext = createContext(null);

export default function BookmarkContextProvider({ children }) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

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
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
