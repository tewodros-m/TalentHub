import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useApplyToJobMutation } from '../../features/application/applicationApi';
import { useGetJobByIdQuery } from '../../features/job/jobApi';
import {
  ApplicationSchema,
  type ApplyFormData,
} from '../../schema/applicationSchema';
import type { ErrorType } from '../../types/errorType';
import { useAuth } from '../../hooks/useAuth';

const ApplyForm = () => {
  const [applyToJob, { isLoading }] = useApplyToJobMutation();

  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch job info
  const { data: job, isLoading: jobLoading } = useGetJobByIdQuery(jobId!, {
    skip: !jobId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyFormData>({
    resolver: zodResolver(ApplicationSchema),
  });

  const onSubmit = async (data: ApplyFormData) => {
    if (!jobId) return;

    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('resume', data.resume[0]);

    try {
      await applyToJob({ formData, userId: user!.id }).unwrap();
      toast.success('Application submitted successfully!');
      navigate('/applicant/dashboard');
    } catch (err) {
      console.error('Application failed', err);

      let errorMessage: string | null = null;

      if (err && (err as ErrorType)?.status === 'FETCH_ERROR') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage =
          (err as ErrorType).data?.message ||
          'Application failed. Please try again.';
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className='max-w-lg mx-auto bg-bg border border-primary-200 p-8 rounded-2xl shadow-lg mt-10'>
      <button
        onClick={() => navigate('/')}
        className=' fixed left-4 top-4 hover:left-3 transition-all duration-200'
      >
        <ArrowLeft className='mr-2 inline-block' />
        Back
      </button>
      {/* Title */}
      <h2 className='text-2xl font-bold text-primary-500 mb-6 text-center'>
        Apply for Job
      </h2>

      {/* Job Info */}
      {jobLoading ? (
        <p className='text-gray-500 text-center'>Loading job details...</p>
      ) : job ? (
        <div className='mb-6 p-4 '>
          <h3 className='text-lg font-semibold text-gray-700 '>{job.title}</h3>
          <p className='text-gray-600 mt-1'>{job.description}</p>
          <p className='text-sm text-secondary-500 mt-2'>
            {job.skills?.join(', ')}
          </p>
        </div>
      ) : (
        <p className='text-red-500 text-center mb-4'>Job not found.</p>
      )}

      {/* Application Form */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* Resume Upload */}
        <div>
          <label className='block text-sm font-medium text-gray-700  mb-1'>
            Upload Resume{' '}
            <span className='text-gray-500'>
              (pdf, doc, docx, maximum of 5MB)
            </span>
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='file'
            accept='.pdf,.doc,.docx'
            {...register('resume')}
            className='w-full border border-primary-300 p-2 rounded-md bg-bg text-sm hover:cursor-pointer'
          />
          {errors.resume && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.resume.message?.toString()}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full py-2 rounded bg-primary-500 dark:bg-primary-200 text-white font-medium hover:bg-primary-600 transition'
        >
          {isLoading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
