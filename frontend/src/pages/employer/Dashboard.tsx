import { useState } from 'react';
import {
  useGetEmployerJobsQuery,
  useDeleteJobMutation,
} from '../../features/job/jobApi';
import JobForm from '../../components/JobForm';
import type { Job } from '../../types/jobTypes';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from '../../components/ui/table';
import Modal from '../../components/ui/Modal';
import { SquarePen, Trash2 } from 'lucide-react';

const EmployerDashboard = () => {
  const { data: data = { results: 0, jobs: [] }, isLoading } =
    useGetEmployerJobsQuery();
  const [deleteJob] = useDeleteJobMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const jobs = data.jobs;

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      await deleteJob(id);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  return (
    <div>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold text-primary-600'>
          Employer Dashboard
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className='px-4 py-2 bg-primary-500 text-white rounded-lg shadow hover:bg-primary-600 transition'
        >
          + Post Job
        </button>
      </div>

      {/* Job List */}
      <div className='bg-bg shadow-md rounded-xl p-6'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          My Job Posts
        </h3>

        {isLoading ? (
          <p className='text-gray-500'>Loading jobs...</p>
        ) : jobs.length > 0 ? (
          <Table>
            <TableHeader
              headers={[
                'Title',
                'Description',
                'Skills',
                'Created At',
                'Actions',
              ]}
            />
            <tbody>
              {jobs.map((job, idx) => (
                <TableRow key={job._id} isStriped={idx % 2 !== 0}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>
                    <span className='truncate block max-w-xs'>
                      {job.description}
                    </span>
                  </TableCell>
                  <TableCell>
                    {job.skills.length > 0 ? job.skills.join(', ') : '—'}
                  </TableCell>
                  <TableCell>
                    {new Date(job.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align='right'>
                    <div className='space-x-2'>
                      <button
                        onClick={() => handleEdit(job)}
                        className='px-3 py-1.5 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition'
                      >
                        <SquarePen />
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className='px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className='text-gray-500'>No jobs posted yet.</p>
        )}
      </div>

      <Modal
        isOpen={showForm}
        onClose={handleFormClose}
        title={editingJob ? 'Edit Job' : 'Post a New Job'}
      >
        <JobForm
          initialData={editingJob || undefined}
          handleFormClose={handleFormClose}
        />
      </Modal>
    </div>
  );
};

export default EmployerDashboard;
