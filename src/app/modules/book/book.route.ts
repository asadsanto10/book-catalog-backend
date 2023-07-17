import express, { RequestHandler } from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';

import auth from '../../middlewares/auth/auth.middleware';

import {
	createBook,
	deleteBookyId,
	getAllBook,
	getBookById,
	updateBookId,
} from './book.controller';
import { bookValidation } from './book.validation';

const router = express.Router();
const checkAuth = auth as RequestHandler;
router.post('/', checkAuth, validateRequest(bookValidation.createBookZodSchema), createBook);

router.get('/:bookId', getBookById);

router.patch(
	'/:bookId',
	checkAuth,
	validateRequest(bookValidation.updateBookZodSchema),
	updateBookId
);

router.delete('/:bookId', checkAuth, deleteBookyId);

router.get('/', getAllBook);
export const bookRoutes = router;
