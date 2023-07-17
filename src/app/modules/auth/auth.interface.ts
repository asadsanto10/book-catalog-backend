export interface IUserRequestBody {
	email: string;
	password: string;
}

export interface IRefreshTokenCookie {
	refreshToken: string;
}

export interface ILoginUserResponse {
	accessToken: string;
	refreshToken?: string;
}
export type IRefreshTokenResponse = {
	accessToken: string;
};
