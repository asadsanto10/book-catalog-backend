import { z } from 'zod';

const createBookZodSchema = z.object({
	body: z.object({
		title: z.string({ required_error: 'Title is required' }),
		description: z.string().optional(),
		author: z.string({ required_error: 'Author name is required' }),
		genre: z.string({ required_error: 'Genre is required' }),
		publicationDate: z.number({ required_error: 'Publication date is required' }),
	}),
});
const updateBookZodSchema = z.object({
	body: z.object({
		title: z.string({ required_error: 'Title is required' }).optional(),
		description: z.string().optional(),
		author: z.string({ required_error: 'Author name is required' }).optional(),
		genre: z.string({ required_error: 'Genre is required' }).optional(),
		publicationDate: z.number({ required_error: 'Publication date is required' }).optional(),
	}),
});

export const bookValidation = { createBookZodSchema, updateBookZodSchema };
