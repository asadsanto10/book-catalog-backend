/* eslint-disable no-console */
import cors from 'cors';

import express, { Application } from 'express';

import cookieParser from 'cookie-parser';
import { Server } from 'http';
import globalErrorHandler from './app/middlewares/globalError/globalErrorHandler.middleware';
import router from './app/routes/router';
import connect from './db/connect';
import { sigTerm, uncaughtException, unhandledRejection } from './rejectionHandel/rejectionHandel';

let server: Server;

const app: Application = express();
// server port
const port: number | string = process.env.PORT || 5005;

uncaughtException();

// database require
// eslint-disable-next-line @typescript-eslint/no-floating-promises
connect();

// parser
app.use(cors());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console.log(app.get('env'));

// route
const base = '/api/v1';
app.use(base, router);

// global error
app.use(globalErrorHandler);

// eslint-disable-next-line prefer-const
server = app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

// unhandled rejection
unhandledRejection(server);

// sigTerm detection
sigTerm(server);

export default app;
