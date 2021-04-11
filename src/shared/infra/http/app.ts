import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import createConnection from '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';
import { profilePics } from '@config/upload';
import '@shared/container';
import routes from './routes';

const app = express();

createConnection();
const origin = 'http://localhost:3000'

app.use(express.json({ limit: '5mb' }));
app.use(cors({ origin }));
app.use('/files', express.static(profilePics));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			statusCode: err.statusCode,
			message: err.message,
		});
	}

	console.error(err);

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error',
	});
});

export default app;
