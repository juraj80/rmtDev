import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarkContextProvider";

interface BookmarkIconPropsType {
  id: number;
}

export default function BookmarkIcon({ id }: BookmarkIconPropsType) {
  const { bookmarkedIds, handleBookmarkedIds } = useContext(BookmarksContext);
  return (
    <button onClick={() => handleBookmarkedIds(id)} className="bookmark-btn">
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
