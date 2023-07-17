import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import variable from '../../../config';
import ApiError from '../../../errors/apiError';
import { createToken, verifyToken } from '../../../helpers/jwt.helper';

import { User } from '../user/user.model';
import { ILoginUserResponse, IRefreshTokenResponse, IUserRequestBody } from './auth.interface';

const userLogin = async (loginData: IUserRequestBody): Promise<ILoginUserResponse | null> => {
	const { email, password } = loginData;

	// check use existing or not existing
	const isUserExist = await User.isUserExist(email);

	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}

	// check password is correct
	const isCorrectPassword = await User.isPasswordMatched(password, isUserExist.password);

	if (isUserExist.password && !isCorrectPassword) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
	}

	const { _id: userId, email: userEmail } = isUserExist as unknown as {
		_id: string;
		email: string;
	};

	const accessToken = createToken(
		{ userId, email: userEmail },
		variable.jwtSecret as Secret,
		variable.jwtExpiresIn as string
	);

	const refreshToken = createToken(
		{ userId, email: userEmail },
		variable.jwtRefreshSecret as Secret,
		variable.jwtRefreshExpiresIn as string
	);

	return {
		accessToken,
		refreshToken,
	};
};

const generateRefreshToken = async (token: string): Promise<IRefreshTokenResponse | null> => {
	const verifiedToken = verifyToken(token, variable.jwtRefreshSecret as Secret);
	if (!verifiedToken.userId) {
		throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
	}

	const isUserExist = await User.findById(verifiedToken.userId);
	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}

	// make new token
	const newAccessToken = createToken(
		{
			id: isUserExist._id,
			email: isUserExist.email,
		},
		variable.jwtRefreshSecret as Secret,
		variable.jwtRefreshExpiresIn as string
	);

	return {
		accessToken: newAccessToken,
	};
};

export const authService = { userLogin, generateRefreshToken };
