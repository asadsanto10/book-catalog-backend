import { Schema, model } from 'mongoose';

import { IReview, IReviewModel } from './review.interface';

const ReviewSchema = new Schema<IReview>(
	{
		bookId: { type: Schema.Types.ObjectId, required: true },
		userId: { type: Schema.Types.ObjectId, required: true },
		description: { type: String, required: true },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

export const Review = model<IReview, IReviewModel>('Reviews', ReviewSchema);
