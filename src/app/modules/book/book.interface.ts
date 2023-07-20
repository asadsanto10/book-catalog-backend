import { Model, Types } from 'mongoose';

export interface IBook {
	userId: Types.ObjectId;
	title: string;
	description?: string;
	author: string;
	genre: string;
	publicationDate: Date;
}

export interface IBookFilter {
	searchTerm?: string;
	publicationDate?: string;
	genre?: string;
}

export type IBookModel = Model<IBook, Record<string, unknown>>;
