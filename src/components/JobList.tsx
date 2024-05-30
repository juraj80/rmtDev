import { useActiveId } from "../lib/hooks";
import { JobItemType } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = { jobItems: JobItemType[]; isLoading: boolean };

export function JobList({ jobItems, isLoading }: JobListProps): JSX.Element {
  const activeId = useActiveId();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  );
}

export default JobList;
