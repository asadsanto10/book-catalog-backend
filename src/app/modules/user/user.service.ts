/* eslint-disable no-param-reassign */
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: IUser): Promise<Partial<IUser> | null> => {
	const user = await User.create(userData);
	if (!user) {
		throw new Error('Failed to create user');
	}
	const { password, ...response } = user.toObject();
	return response;
};

export const userService = { createUser };
