import { z } from 'zod';

export const ApplicationSchema = z.object({
  resume: z
    .custom<FileList>(
      (files) => files instanceof FileList && files.length > 0,
      {
        message: 'Resume is required',
      }
    )
    .refine((files) => {
      if (!files || files.length === 0) return false;
      const file = files[0];
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      return allowedTypes.includes(file.type);
    }, 'Only PDF, DOC, or DOCX files are allowed')
    .refine((files) => {
      if (!files || files.length === 0) return false;
      const file = files[0];
      return file.size <= 5 * 1024 * 1024; // 5MB limit
    }, 'File size must be under 5MB'),
});

export type ApplyFormData = z.infer<typeof ApplicationSchema>;
