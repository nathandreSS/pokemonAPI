import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import errorConfig from '@config/error';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/models/IHashProvider';

interface IRequest {
	id: string;
	password: string;
	newPassword: string;
}
@injectable()
class ChangePasswordService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ id, password, newPassword }: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			const { message, statusCode } = errorConfig.invalidId('User');
			throw new AppError(message, statusCode);
		}

		const passwordMatched = await this.hashProvider.compareHash(
			password,
			user.password,
		);

		if (!passwordMatched) {
			const { message, statusCode } = errorConfig.incorrectPassword;
			throw new AppError(message, statusCode);
		}
		const cryptedPassword = await this.hashProvider.generateHash(newPassword);
		const userUpdated = { ...user, password: cryptedPassword };
		return this.usersRepository.update(userUpdated);
	}
}

export default ChangePasswordService;
