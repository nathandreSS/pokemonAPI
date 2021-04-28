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
	avatar_id: string;
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
		avatar_id,
	}: IRequest): Promise<User | null> {
		const existUserWithThisEmail = await this.usersRepository.findByEmail(
			email,
		);

		if (existUserWithThisEmail) {
			const { message, statusCode } = errorConfig.uniqueResource('User', 'email');
			throw new AppError(message, statusCode);
		}

		const cryptedPassword = await this.hashProvider.generateHash(password);
		const user = await this.usersRepository.create({
			username,
			password: cryptedPassword,
			email,
			avatar_id
		});

		return user;
	}
}

export default CreateUserService;
