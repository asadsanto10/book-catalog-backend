/* eslint-disable func-names */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import mongoose, { Schema, model } from 'mongoose';
import variable from '../../../config';
import ApiError from '../../../errors/apiError';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
	const isExist = await this.$model('Users').findOne({
		email: this.email,
	});
	if (isExist) {
		throw new ApiError(httpStatus.CONFLICT, 'Email is already exists!');
	}

	// hass password
	this.password = await bcrypt.hash(this.password, Number(variable.bcryptSaltRounds));
	next();
});

userSchema.statics.isUserExist = async function (
	email: string
): Promise<{ id: string; password: string } | null> {
	const User = mongoose.model('Users');
	return User.findOne({ email }, { password: 1 });
};

userSchema.statics.isPasswordMatched = async function (
	userPassword: string,
	savedUserPassword: string
): Promise<boolean> {
	return bcrypt.compare(userPassword, savedUserPassword);
};

export const User = model<IUser, UserModel>('Users', userSchema);
