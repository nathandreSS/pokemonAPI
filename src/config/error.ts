interface IError {
	message: string;
	statusCode: number;
}
export default {
	// BAD REQUEST
	uniqueUsername: {
		message: 'Username is already in use',
		statusCode: 400,
	},
	uniqueVideoTitle: {
		message: 'Video with this title already exists',
		statusCode: 400,
	},
	uniqueVideoUrl: {
		message: 'Video with this url already exists',
		statusCode: 400,
	},
	uniqueEmail: {
		message: 'Email is already in use',
		statusCode: 400,
	},
	// NOT FOUND
	invalidId(entity: string): IError {
		return { message: `${entity} not found`, statusCode: 404 };
	},
	// UNAUTHORIZED
	incorrectPassword: {
		message: 'Incorrect password',
		statusCode: 401,
	},

	invalidJWT: {
		message: 'Invalid JWT token',
		statusCode: 401,
	},
	missingJWT: {
		message: 'JWT token is missing',
		statusCode: 401,
	},
	unauthorized: {
		message: 'Unauthorized',
		statusCode: 401,
	},
	invalidAuthenctication: {
		message: 'Incorrect username/password combination',
		statusCode: 401,
	},
};
