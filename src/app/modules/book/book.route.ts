import express, { RequestHandler } from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';

import auth from '../../middlewares/auth/auth.middleware';

import { createBook, getAllBook, getBookById, updateBookId } from './book.controller';
import { bookValidation } from './book.validation';

const router = express.Router();
const checkAuth = auth as RequestHandler;
router.get('/all-book', getAllBook);
router.get('/:bookId', getBookById);

router.post(
	'/create-book',
	checkAuth,
	validateRequest(bookValidation.createBookZodSchema),
	createBook
);
router.patch(
	'/:bookId',
	checkAuth,
	validateRequest(bookValidation.updateBookZodSchema),
	updateBookId
);

export const bookRoutes = router;
