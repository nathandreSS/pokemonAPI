import { Repository, getRepository, IsNull } from 'typeorm';

import IPokemonTeamRepository from '@modules/teams/repositories/IPokemonTeamRepository';

import IAddPokemonDTO from '@modules/teams/dtos/IAddPokemonDTO';
import PokemonTeam from '../entities/PokemonTeam';
import IRemovePokemonDTO from '@modules/teams/dtos/IRemovePokemonDTO';


class PokemonTeamRepository implements IPokemonTeamRepository {
	private ormRepository: Repository<PokemonTeam>;

	constructor() {
		this.ormRepository = getRepository(PokemonTeam);
	}

	public async addPokemon({
		pokemon_id,
		team_id,
		color,
	}: IAddPokemonDTO): Promise<PokemonTeam> {
		const pokemon_team = this.ormRepository.create({
			pokemon_id,
			team_id,
			color,
		});

		return this.ormRepository.save(pokemon_team);
	}

	public async findByTeam(team_id: string): Promise<{pokemons_team: PokemonTeam[], count: number}> {
		const [pokemons_team, count] = await this.ormRepository.findAndCount({where: {team_id}, order: {created_at: 'ASC'}});
		return {pokemons_team, count}
	}

	public async findFirstPokemon(team_id: string): Promise<PokemonTeam | undefined> {
		const pokemon = await this.ormRepository.findOne({where: {team_id}, order: {created_at: 'ASC'}});
		return pokemon;
	}

	public async removePokemon({pokemon_id, team_id}: IRemovePokemonDTO): Promise<void> {
		this.ormRepository.delete({pokemon_id, team_id});
	}
}

export default PokemonTeamRepository;
