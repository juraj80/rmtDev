import { createContext, useCallback, useMemo, useState } from "react";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { SortByType, PageDirection, JobItemType } from "../lib/types";

type JobItemsContextType = {
  jobItems: JobItemType[] | undefined;
  isLoading: boolean;
  currentPage: number;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  jobItemsSorted: JobItemType[];
  jobItemsSortedAndSliced: JobItemType[];
  sortBy: SortByType;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortByType) => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // dependency on other contexts
  const { debouncedSearchText } = useSearchTextContext();

  // state
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortByType>("relevant");

  // derived state / computed properties
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);

  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])]?.sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted?.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),

    [jobItemsSorted, currentPage]
  );

  // event handlers / actions
  const handleChangePage = useCallback(
    () => (directon: PageDirection) => {
      if (directon === "next") {
        setCurrentPage((prev) => prev + 1);
      } else {
        setCurrentPage((prev) => prev - 1);
      }
    },
    []
  );

  const handleChangeSortBy = useCallback(
    () => (newSortBy: SortByType) => {
      setCurrentPage(1);
      setSortBy(newSortBy);
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      jobItems,
      isLoading,
      currentPage,
      totalNumberOfResults,
      totalNumberOfPages,
      jobItemsSorted,
      jobItemsSortedAndSliced,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      isLoading,
      currentPage,
      totalNumberOfResults,
      totalNumberOfPages,
      jobItemsSorted,
      jobItemsSortedAndSliced,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
