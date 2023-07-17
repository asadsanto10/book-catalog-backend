/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IReview } from './review.interface';
import { reviewService } from './review.service';

export const createReview: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { userId } = req.user;
		const { bookId } = req.params;
		const reviewData = req.body as IReview;
		const result = await reviewService.createReview(userId, bookId, reviewData);
		sendResponse<IReview>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'Review created successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getReviewBookById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { bookId } = req.params;
		const result = await reviewService.getReviewBookById(bookId);

		sendResponse<IReview[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Review fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
