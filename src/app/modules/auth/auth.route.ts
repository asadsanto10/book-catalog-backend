import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';

import { createUser } from '../user/user.controller';
import { userValidation } from '../user/user.validation';
import { generateRefreshToken, loginUser } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(userValidation.createUserZodSchema), createUser);
router.post('/login', validateRequest(authValidation.loginUserZodSchema), loginUser);
router.post(
	'/refresh-token',
	validateRequest(authValidation.refreshTokenZodSchema),
	generateRefreshToken
);

export const authRoutes = router;
