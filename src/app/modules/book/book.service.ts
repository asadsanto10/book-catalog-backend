import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IBook, IBookFilter } from './book.interface';
import { Book } from './book.model';
import { bookSearchTerm } from './book.variable';

const createBook = async (userId: string, bookData: IBook): Promise<IBook | null> => {
	const result = await Book.create({ ...bookData, userId });
	if (!result) {
		throw new Error('Failed to create new book');
	}
	return result;
};

const getAllBook = async (filter: IBookFilter): Promise<IBook[] | null> => {
	const { publicationDate, genre, searchTerm } = filter;

	const query = [];
	if (searchTerm) {
		query.push({
			$or: bookSearchTerm.map((field) => ({
				[field]: {
					$regex: searchTerm,
					$options: 'i',
				},
			})),
		});
	}

	if (publicationDate) {
		query.push({
			$expr: {
				$eq: [{ $year: '$publicationDate' }, Number(publicationDate)],
			},
		});
	}

	if (genre) {
		query.push({
			genre,
		});
	}

	const queryCondition = query.length > 0 ? { $and: query } : {};
	const result = await Book.find(queryCondition);
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
		throw new ApiError(
			httpStatus.NOT_FOUND,
			`You can't  edit other people's books, you can only edit your own books`
		);
	}

	const result = await Book.findOneAndUpdate({ _id: bookId }, payload, {
		new: true,
	});
	return result;
};

const deleteBookyId = async (BookId: string, userId: string): Promise<IBook | null> => {
	const isExistUserBook = await Book.findOne({ _id: BookId, userId });

	if (!isExistUserBook) {
		throw new ApiError(
			httpStatus.NOT_FOUND,
			`You can't delete other people's books, you can only delete your own books`
		);
	}
	const result = await Book.findByIdAndDelete(BookId);
	return result;
};

export const bookService = { createBook, getAllBook, getBookById, updateBookId, deleteBookyId };
