import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
} from 'typeorm';

@Entity('avatars')
class Avatar {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Avatar;
