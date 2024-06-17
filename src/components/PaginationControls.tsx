import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsType = {
  onClick: (direction: "next" | "previous") => void;
  currentPage: number;
};

type PaginationButtonType = {
  onClick: () => void;
  direction: "next" | "previous";
  currentPage: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
}: PaginationControlsType) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onClick={() => onClick("previous")}
        />
      )}
      <PaginationButton
        direction="next"
        currentPage={currentPage}
        onClick={() => onClick("next")}
      />
    </section>
  );
}

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonType) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={onClick}
    >
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}

      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
    </button>
  );
}
