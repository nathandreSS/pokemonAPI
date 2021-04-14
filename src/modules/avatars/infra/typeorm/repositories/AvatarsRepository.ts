import { Repository, getRepository } from 'typeorm';

import IAvatarsRepository from '@modules/avatars/repositories/IAvatarsRepository';

import Avatar from '../entities/Avatar';

class AvatarRepository implements IAvatarsRepository {
	private ormRepository: Repository<Avatar>;

	constructor() {
		this.ormRepository = getRepository(Avatar);
	}

	public async find(): Promise<Avatar[]> {
		return this.ormRepository.find();
	}

	public async findById(id: string): Promise<Avatar | undefined> {
		return this.ormRepository.findOne(id);
	}
}

export default AvatarRepository;
