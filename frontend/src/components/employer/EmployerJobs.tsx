import { useState } from 'react';
import { PlusIcon, SquarePen, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  useGetEmployerJobsQuery,
  useDeleteJobMutation,
} from '../../features/job/jobApi';
import JobForm from '../../components/employer/JobForm';
import type { Job } from '../../types/jobTypes';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from '../../components/ui/table';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { timeAgo } from '../../utils/timeAgo';
import { useAuth } from '../../hooks/useAuth';

const EmployerJobs = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const { user } = useAuth();

  const { data: data = { results: 0, jobs: [] }, isLoading } =
    useGetEmployerJobsQuery(user!.id);
  const [deleteJob] = useDeleteJobMutation();

  const jobs = data.jobs;

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      await deleteJob({ jobId: id, employerId: user!.id }).unwrap();
      toast.success('Job deleted successfully!');
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
    <div className='min-h-screen mb-10'>
      {/* Job List */}
      <div className='px-3 bg-bg min-h-screen rounded-2xl shadow-md'>
        <div className='flex justify-between pr-5 mb-1 items-center'>
          {/* Header */}
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            My Job Posts
          </h3>
          <Button variant='primary' onClick={() => setShowForm(true)}>
            <PlusIcon size={20} className='inline mr-1' />
            Post Job
          </Button>
        </div>

        {isLoading ? (
          <p className='text-gray-500'>Loading jobs...</p>
        ) : jobs.length > 0 ? (
          <Table>
            <TableHeader
              headers={['Title', 'Description', 'Skills', 'Posted', 'Actions']}
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
                    <span className='truncate block max-w-[200px]'>
                      {job.skills.length > 0 ? job.skills.join(', ') : '—'}
                    </span>
                  </TableCell>
                  <TableCell>{timeAgo(new Date(job.createdAt))}</TableCell>
                  <TableCell align='right'>
                    <div className='space-x-1'>
                      <Button
                        onClick={() => handleEdit(job)}
                        size='sm'
                        className='px-3 py-1.5 rounded-lg transition'
                        variant='secondary'
                      >
                        <SquarePen size={18} />
                      </Button>

                      <Button
                        onClick={() => handleDelete(job._id)}
                        size='sm'
                        className='px-3 py-1.5 rounded-lg transition'
                        variant='danger'
                      >
                        <Trash2 size={18} />
                      </Button>
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

export default EmployerJobs;
