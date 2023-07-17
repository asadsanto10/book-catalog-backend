import { Model, Types } from 'mongoose';

export interface IBook {
	userId: Types.ObjectId;
	title: string;
	description?: string;
	author: string;
	genre: string;
	publicationDate: Date;
}

export type IBookModel = Model<IBook, Record<string, unknown>>;
