import { useState, createContext, useEffect } from "react";

export const BookmarksContext = createContext(null);

export default function BookmarkContextProvider({ children }) {
  // setting initial state of bookmarkedIds with callback function
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("bookmarkedIds") || "[]")
  );

  const handleBookmarkedIds = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

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
