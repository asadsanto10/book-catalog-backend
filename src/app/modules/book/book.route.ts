import express, { RequestHandler } from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';

import auth from '../../middlewares/auth/auth.middleware';

import { createBook } from './book.controller';
import { bookValidation } from './book.validation';

const router = express.Router();
const checkAuth = auth as RequestHandler;
router.post(
	'/create-book',
	checkAuth,
	validateRequest(bookValidation.createBookZodSchema),
	createBook
);

export const bookRoutes = router;
