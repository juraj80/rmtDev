import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

interface BookmarkIconPropsType {
  id: number;
}

export default function BookmarkIcon({ id }: BookmarkIconPropsType) {
  const { bookmarkedIds, handleBookmarkedIds } = useBookmarksContext();

  return (
    <button
      onClick={(e) => {
        handleBookmarkedIds(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
