import express, { RequestHandler } from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';

import auth from '../../middlewares/auth/auth.middleware';

import { createReview, getReviewBookById } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();
const checkAuth = auth as RequestHandler;
router.post(
	'/:bookId',
	checkAuth,
	validateRequest(ReviewValidation.createReviewZodSchema),
	createReview
);
router.get('/:bookId', getReviewBookById);

export const reviewRoutes = router;
