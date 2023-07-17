/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import { bookService } from './book.service';

export const createBook: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { userId } = req.user;
		const bookData = req.body as IBook;
		const result = await bookService.createBook(userId, bookData);
		sendResponse<IBook>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'Book created successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllBook: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const result = await bookService.getAllBook();

		sendResponse<IBook[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Book fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getBookById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { bookId } = req.params;
		const result = await bookService.getBookById(bookId);

		sendResponse<IBook>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Book fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateBookId: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { bookId } = req.params;
		const updateData = req.body as Partial<IBook>;
		const { userId } = req.user;

		const result = await bookService.updateBookId(bookId, updateData, userId);
		sendResponse<IBook>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'Book updated successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
