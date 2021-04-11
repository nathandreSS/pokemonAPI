import Avatar from '@modules/avatars/infra/typeorm/entities/Avatar';
import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

@Entity('users')
class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@ManyToOne(() => Avatar)
	@JoinColumn({ name: 'avatar_id' })
	avatar_id: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default User;
