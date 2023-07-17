import { Schema, model } from 'mongoose';

import { IBook, IBookModel } from './book.interface';

const BookSchema = new Schema<IBook>(
	{
		userId: { type: Schema.Types.ObjectId, required: true },
		title: { type: String, required: true },
		description: { type: String },
		author: { type: String, required: true },
		genre: { type: String, required: true },
		publicationDate: { type: Date, required: true },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

export const Book = model<IBook, IBookModel>('Books', BookSchema);
