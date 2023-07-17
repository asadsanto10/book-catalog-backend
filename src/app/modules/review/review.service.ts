import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { Book } from '../book/book.model';
import { IReview } from './review.interface';
import { Review } from './review.model';

const createReview = async (
	userId: string,
	bookId: string,
	reviewData: IReview
): Promise<IReview | null> => {
	const isExistBook = await Book.findById(bookId);

	if (!isExistBook) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Book not found!');
	}

	const result = await Review.create({ ...reviewData, userId, bookId });
	if (!result) {
		throw new Error('Failed to create review');
	}
	return result;
};

const getReviewBookById = async (bookId: string): Promise<IReview[] | null> => {
	const result = await Review.find({ bookId });
	return result;
};

export const reviewService = {
	createReview,
	getReviewBookById,
};
