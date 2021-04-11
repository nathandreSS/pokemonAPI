import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import errorConfig from '@config/error';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/models/IHashProvider';

interface IRequest {
	username: string;
	password: string;
	email: string;
}
@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		username,
		password,
		email,
	}: IRequest): Promise<User | null> {
		const existUserWithThisUsername = await this.usersRepository.findByUsername(
			username,
		);
		const existUserWithThisEmail = await this.usersRepository.findByEmail(
			email,
		);

		if (existUserWithThisUsername) {
			const { message, statusCode } = errorConfig.uniqueUsername;
			throw new AppError(message, statusCode);
		}
		if (existUserWithThisEmail) {
			const { message, statusCode } = errorConfig.uniqueEmail;
			throw new AppError(message, statusCode);
		}

		const cryptedPassword = await this.hashProvider.generateHash(password);
		const user = await this.usersRepository.create({
			username,
			password: cryptedPassword,
			email,
		});

		return user;
	}
}

export default CreateUserService;
