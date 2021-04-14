import Avatar from '../infra/typeorm/entities/Avatar';

export default interface IAvatarRepository {
	find(): Promise<Avatar[]>;
	findById(id: string): Promise<Avatar | undefined>;
}
