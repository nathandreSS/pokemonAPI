import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import errorConfig from '@config/error';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
	iat: number;
	exp: number;
	sub: string;
	accessLevel: number;
}
export default function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		const { message, statusCode } = errorConfig.missingJWT;
		throw new AppError(message, statusCode);
	}
	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, authConfig.jwt.secret) as ITokenPayload;

		const { sub, accessLevel } = decoded;

		request.user = {
			id: sub,
			accessLevel,
		};
		return next();
	} catch {
		const { message, statusCode } = errorConfig.invalidJWT;
		throw new AppError(message, statusCode);
	}
}
