import { z } from 'zod';

export const JobSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .refine((val) => val.trim().split(/\s+/).length >= 10, {
      message: 'Description must be at least 10 words',
    }),
  skills: z
    .string()
    .min(1, 'Skill is required')
    .refine(
      (val) =>
        val
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean).length >= 2,
      {
        message: 'At least 2 skills are required',
      }
    ),
});
