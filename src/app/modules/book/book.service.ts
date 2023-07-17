import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IBook } from './book.interface';
import { Book } from './book.model';

const createBook = async (userId: string, bookData: IBook): Promise<IBook | null> => {
	const result = await Book.create({ ...bookData, userId });
	if (!result) {
		throw new Error('Failed to create new cows');
	}
	return result;
};

const getAllBook = async (): Promise<IBook[] | null> => {
	const result = await Book.find({});
	return result;
};

const getBookById = async (bookId: string): Promise<IBook | null> => {
	const result = await Book.findById(bookId);
	return result;
};

const updateBookId = async (
	bookId: string,
	payload: Partial<IBook>,
	userId: string
): Promise<IBook | null> => {
	const isExistUserBook = await Book.findOne({ _id: bookId, userId });

	if (!isExistUserBook) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Book not found !');
	}

	const result = await Book.findOneAndUpdate({ _id: bookId }, payload, {
		new: true,
	});
	return result;
};

export const bookService = { createBook, getAllBook, getBookById, updateBookId };
