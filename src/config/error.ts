interface IError {
	message: string;
	statusCode: number;
}
export default {
	// BAD REQUEST
	uniqueResource(entity: string, field: string): IError {
		return { 
			message: `${AOrAn(entity)} ${entity} with that ${field} already exists`,
			statusCode: 400
		};
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

function AOrAn(word: string): string{
	const vowelRegex = '^[aieouAIEOU].*'
	const matched = word.match(vowelRegex);
	return matched ? 'An' : 'A';
}