import { Table, TableHeader, TableRow, TableCell } from '../ui/table';
import { timeAgo } from '../../utils/timeAgo';
import type { Job } from '../../types/jobTypes';

type JobsTableProps = {
  jobs: Job[];
};

const JobsTable = ({ jobs }: JobsTableProps) => {
  return (
    <div className='p-6 bg-bg rounded-2xl shadow-md'>
      <h3 className='text-xl text-primary-800 font-semibold mb-4'>
        All Jobs with Number of Applications
      </h3>
      <Table>
        <TableHeader
          headers={[
            'Title',
            'Employer Name',
            'Employer Email',
            'No. Applications',
            'Posted',
          ]}
        />
        <tbody>
          {jobs.map((job, i) => (
            <TableRow key={job._id} isStriped={i % 2 === 0}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.createdBy.name}</TableCell>
              <TableCell>{job.createdBy.email}</TableCell>
              <TableCell align='center'>{job.applicationsCount ?? 0}</TableCell>
              <TableCell>{timeAgo(new Date(job.createdAt))}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default JobsTable;
