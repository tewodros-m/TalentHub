import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateJobMutation,
  useUpdateJobMutation,
} from '../features/job/jobApi';
import type { Job, RegisterJob } from '../types/jobTypes';
import { JobSchema } from '../schema/jobSchema';
import Input from './Input';
import type { ErrorType } from '../types/errorType';
import Button from './ui/Button';

interface JobFormProps {
  initialData?: Job; // optional initial values for editing
  handleFormClose?: () => void; // callback to close modal after success
}

const JobForm = ({ initialData, handleFormClose }: JobFormProps) => {
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterJob>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      skills: initialData?.skills?.join(', ') || '', // convert array → string
    },
    resolver: zodResolver(JobSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        skills: initialData.skills.join(', '),
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data: RegisterJob) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        skills: data.skills.split(',').map((s) => s.trim()), // convert string → array
      };

      if (initialData) {
        await updateJob({ id: initialData._id!, data: payload }).unwrap();
      } else {
        await createJob(payload).unwrap();
        reset();
      }
      if (handleFormClose) handleFormClose();
    } catch (err) {
      console.error('Failed to save job', err);
      let errorMessage: string | null = null;

      if (err && (err as ErrorType)?.status === 'FETCH_ERROR') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage =
          (err as ErrorType).data?.message || initialData
            ? 'Update failed. Please try again.'
            : 'Job posting failed. Please try again.';
      }

      setApiError(errorMessage);
    }
  };

  // clear error when user types
  const handleInputChange = () => {
    if (apiError) setApiError(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-md bg-bg p-4 rounded-lg  space-y-3 border border-primary-100'
    >
      <Input
        label='Title'
        id='title'
        placeholder='Web Developer'
        {...register('title', { onChange: handleInputChange })}
        error={errors.title?.message}
      />

      <div>
        <label
          htmlFor='description'
          className='block text-lg font-medium text-gray-600 mb-1'
        >
          Description
        </label>

        <textarea
          rows={5}
          {...register('description', { onChange: handleInputChange })}
          placeholder='Job Description'
          className={`w-full p-2 border rounded outline-none
              placeholder:text-gray-400 bg-bg
              ${
                errors.description
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-2 focus:ring-primary-600'
              }
              `}
          id='description'
        />
        {errors.description && (
          <p className='text-red-500 text-sm relative -top-1'>
            {errors?.description.message}
          </p>
        )}
      </div>

      <Input
        label='Skills'
        id='skills'
        placeholder='HTML, CSS, Reading'
        {...register('skills', { onChange: handleInputChange })}
        error={errors.skills?.message}
      />

      {apiError && <p className='text-red-500 text-sm '>{apiError}</p>}
      <div className='pt-2 flex gap-4'>
        <Button
          type='submit'
          variant='primary'
          isLoading={isCreating || isUpdating}
          className='w-full'
        >
          {initialData
            ? isUpdating
              ? 'Updating...'
              : 'Update Job'
            : isCreating
            ? 'Posting...'
            : 'Post Job'}
        </Button>

        <Button variant='outline' onClick={handleFormClose} className='w-full'>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
