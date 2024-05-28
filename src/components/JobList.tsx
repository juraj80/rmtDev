import { JobItemType } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = { jobItems: JobItemType[]; isLoading: boolean };

export function JobList({ jobItems, isLoading }: JobListProps): JSX.Element {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem key={jobItem.id} jobItem={jobItem} />
        ))}
    </ul>
  );
}

export default JobList;
