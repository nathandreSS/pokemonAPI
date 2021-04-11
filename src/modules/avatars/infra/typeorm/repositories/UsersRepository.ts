import { Repository, getRepository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';

class UserRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	public async create({
		username,
		email,
		password,
	}: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create({
			username,
			password,
			email,
		});

		return this.ormRepository.save(user);
	}

	public async find(): Promise<User[]> {
		return this.ormRepository.find();
	}

	public async findByUsername(username: string): Promise<User | undefined> {
		return this.ormRepository.findOne({ username });
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		return this.ormRepository.findOne({ email });
	}

	public async findById(id: string): Promise<User | undefined> {
		return this.ormRepository.findOne(id);
	}

	public async update(user: User): Promise<User> {
		return this.ormRepository.save(user);
	}
}

export default UserRepository;
