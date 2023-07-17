import { z } from 'zod';

const createReviewZodSchema = z.object({
	body: z.object({
		description: z.string({ required_error: 'Description is required' }),
	}),
});

export const ReviewValidation = { createReviewZodSchema };
