import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useApplyToJobMutation } from '../../features/application/applicationApi';
import { useGetJobByIdQuery } from '../../features/job/jobApi';
import {
  ApplicationSchema,
  type ApplyFormData,
} from '../../schema/applicationSchema';
import type { ErrorType } from '../../types/errorType';

const ApplyForm = () => {
  const [applyToJob, { isLoading }] = useApplyToJobMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const { jobId } = useParams();
  const navigate = useNavigate();

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
      await applyToJob(formData).unwrap();
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

      setApiError(errorMessage);
    }
  };

  return (
    <div className='max-w-lg mx-auto bg-white  p-8 rounded-2xl shadow-lg mt-10'>
      {/* Title */}
      <h2 className='text-2xl font-bold text-primary-500 mb-6 text-center'>
        Apply for Job
      </h2>

      {/* Job Info */}
      {jobLoading ? (
        <p className='text-gray-500 text-center'>Loading job details...</p>
      ) : job ? (
        <div className='mb-6 p-4 '>
          <h3 className='text-lg font-semibold text-gray-900 '>{job.title}</h3>
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
            <span className='text-gray-400'>
              (pdf, doc, docx, maximum of 5MB)
            </span>
            <span className='text-red-500'>*</span>
          </label>
          <input
            type='file'
            accept='.pdf,.doc,.docx'
            {...register('resume')}
            className='w-full border border-gray-300 p-2 rounded-md bg-white text-sm'
          />
          {errors.resume && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.resume.message?.toString()}
            </p>
          )}
        </div>

        {/* API Error */}
        {apiError && (
          <p className='text-red-500 text-sm text-center'>{apiError}</p>
        )}

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50'
        >
          {isLoading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
