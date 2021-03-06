import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import errorConfig from '@config/error';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/models/IHashProvider';
import axios from 'axios';
import IAvatarRepository from '@modules/avatars/repositories/IAvatarsRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

@injectable()
class AuthenticateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('AvatarRepository')
		private avatarRepository: IAvatarRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		email,
		password,
	}: IRequest): Promise<any> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			const { message, statusCode } = errorConfig.invalidAuthenctication;
			throw new AppError(message, statusCode);
		}
		const cryptedPassword = user.password;
		const passwordMatched = await this.hashProvider.compareHash(
			password,
			cryptedPassword,
		);

		if (!passwordMatched) {
			const { message, statusCode } = errorConfig.invalidAuthenctication;
			throw new AppError(message, statusCode);
		}

		const { secret, expiresIn } = authConfig.jwt;
		const token = sign({}, secret, {
			subject: user.id,
			expiresIn,
		});

		const avatar = await this.avatarRepository.findById(user.avatar_id);
		return {token, username: user.username, avatar: avatar?.name};
	}
}

export default AuthenticateUserService;
