import { z } from 'zod';

const loginUserZodSchema = z.object({
	body: z.object({
		email: z
			.string({ required_error: 'Email number is required' })
			.email({ message: 'Must be a valid email' }),
		password: z.string({ required_error: 'Password is required' }),
	}),
});
const refreshTokenZodSchema = z.object({
	cookies: z.object({
		refreshToken: z.string({
			required_error: 'Refresh token is required',
		}),
	}),
});
export const authValidation = { loginUserZodSchema, refreshTokenZodSchema };
