import { IBook } from './book.interface';
import { Book } from './book.model';

const createBook = async (userId: string, bookData: IBook): Promise<IBook | null> => {
	const result = await Book.create({ ...bookData, userId });
	if (!result) {
		throw new Error('Failed to create new cows');
	}
	return result;
};

export const bookService = { createBook };
