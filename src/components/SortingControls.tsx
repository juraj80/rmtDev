import { SortByType } from "../lib/types";

type SortingControlsPropsType = {
  sortBy: SortByType;
  onClick: (sortBy: SortByType) => void;
};

type SortingButtonPropsType = {
  children: React.ReactNode;
  sortBy: SortByType;
  onClick: () => void;
  active: boolean;
};

export default function SortingControls({
  sortBy,
  onClick,
}: SortingControlsPropsType) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        sortBy="relevant"
        onClick={() => onClick("relevant")}
        active={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        sortBy="recent"
        onClick={() => onClick("recent")}
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
