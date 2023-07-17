import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { authRoutes } from '../modules/auth/auth.route';
import { bookRoutes } from '../modules/book/book.route';

const router = express.Router();

router.get('/health', (_req, res) => {
	res.json({ message: 'All ok' });
});

// router.use(userRoutes);
router.use('/auth', authRoutes);
router.use('/book', bookRoutes);

// not found route
router.use((req: Request, res: Response, next: NextFunction) => {
	res.status(httpStatus.NOT_FOUND).json({
		status: false,
		message: 'Route not found',
		errorMessage: [
			{
				path: req.originalUrl,
				message: 'API not found!',
			},
		],
	});
	next();
});

export default router;
