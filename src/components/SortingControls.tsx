import { useJobItemsContext } from "../lib/hooks";
import { SortByType } from "../lib/types";

type SortingButtonPropsType = {
  children: React.ReactNode;
  sortBy: SortByType;
  onClick: () => void;
  active: boolean;
};

export default function SortingControls() {
  const { handleChangeSortBy, sortBy } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        sortBy="relevant"
        onClick={() => handleChangeSortBy("relevant")}
        active={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        sortBy="recent"
        onClick={() => handleChangeSortBy("recent")}
        active={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}

function SortingButton({
  children,
  sortBy,
  onClick,
  active,
}: SortingButtonPropsType) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--${sortBy} ${
        active ? "sorting__button--active" : ""
      }`}
    >
      {children}
    </button>
  );
}
