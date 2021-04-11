import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class UsersController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { username, password, email, phone, accessLevel } = request.body;
		const createUserService = container.resolve(CreateUserService);
		const user = await createUserService.execute({
			username,
			password,
			email,
		});

		return response.json(user);
	}

	public async index(request: Request, response: Response): Promise<Response> {
		const usersRepository = new UsersRepository();
		const users = await usersRepository.find();
		return response.json(users);
	}
}
