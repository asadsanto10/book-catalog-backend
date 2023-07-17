import { Model } from 'mongoose';

export interface IUser {
	email: string;
	password: string;
}

export type UserModel = {
	isUserExist(id: string): Promise<Pick<IUser, 'password'>>;

	isPasswordMatched(userPassword: string, savedPassword: string): Promise<boolean>;
} & Model<IUser>;
