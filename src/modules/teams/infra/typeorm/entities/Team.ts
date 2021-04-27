import Avatar from '@modules/avatars/infra/typeorm/entities/Avatar';
import User from '@modules/users/infra/typeorm/entities/User';
import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

@Entity('teams')
class Team {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	user_id: string;

	@ManyToOne(() => User, user => user)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column()
	name: string;

	@Column()
	color: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Team;
