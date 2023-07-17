import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import variable from '../../../config';
import sendResponse from '../../../shared/sendResponse';
import {
	ILoginUserResponse,
	IRefreshTokenCookie,
	IRefreshTokenResponse,
	IUserRequestBody,
} from './auth.interface';
import { authService } from './auth.service';

const cookieOptions = {
	secure: variable.nodeENV === 'production',
	httpOnly: true,
};

export const loginUser: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { ...loginData } = req.body as IUserRequestBody;
		const result = await authService.userLogin(loginData);

		const { refreshToken, ...othersToken } = result as ILoginUserResponse;

		// set cookie
		res.cookie('refreshToken', refreshToken, cookieOptions);

		sendResponse<ILoginUserResponse>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'User logged in successfully',
			data: othersToken,
		});
	} catch (error) {
		next(error);
	}
};

export const generateRefreshToken: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { refreshToken } = req.cookies as IRefreshTokenCookie;

		const result = await authService.generateRefreshToken(refreshToken);

		// set cookie
		res.cookie('refreshToken', refreshToken, cookieOptions);

		sendResponse<IRefreshTokenResponse>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'New access token generated successfully !',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
