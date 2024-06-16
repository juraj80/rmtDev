import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type paginationControlsType = {
  onClick: (direction: "next" | "previous") => void;
  currentPage: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
}: paginationControlsType) {
  return (
    <section className="pagination">
      <button
        onClick={() => onClick("previous")}
        className="pagination__button pagination__button--disabled"
      >
        <ArrowLeftIcon />
        Page {currentPage - 1}
      </button>
      <button onClick={() => onClick("next")} className="pagination__button">
        Page {currentPage + 1}
        <ArrowRightIcon />
      </button>
    </section>
  );
}
