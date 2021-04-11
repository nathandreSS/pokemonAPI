import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<User>;
	find(): Promise<User[]>;
	findById(id: string): Promise<User | undefined>;
	findByUsername(username: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	update(user: User): Promise<User>;
}
