import { Model, Types } from 'mongoose';

export interface IReview {
	bookId: Types.ObjectId;
	userId: Types.ObjectId;
	description: string;
}

export type IReviewModel = Model<IReview, Record<string, unknown>>;
