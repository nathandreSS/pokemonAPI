import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import Team from './Team';

@Entity('pokemons_teams')
class PokemonTeam {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	pokemon_id: string;

	@Column()
	team_id: string;

	@ManyToOne(() => Team)
	@JoinColumn({ name: 'team_id' })
	team: Team;

	@Column()
	color: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default PokemonTeam;
