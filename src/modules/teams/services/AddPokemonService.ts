import { inject, injectable } from 'tsyringe';

import Team from '@modules/teams/infra/typeorm/entities/Team';
import AppError from '@shared/errors/AppError';
import errorConfig from '@config/error';
import ITeamsRepository from '../repositories/ITeamsRepository';
import IPokemonTeamRepository from '../repositories/IPokemonTeamRepository';
import PokemonTeam from '../infra/typeorm/entities/PokemonTeam';

interface IRequest {
	user_id: string;
	pokemon_id: string;
	team_id: string;
	color: string;
}

@injectable()
class AddPokemonService {
	constructor(
		@inject('PokemonTeamRepository')
		private pokemonTeamRepository: IPokemonTeamRepository,

		@inject('TeamsRepository')
		private teamsRepository: ITeamsRepository,
	) {}

	public async execute({
		user_id,
		pokemon_id,
		team_id,
		color
	}: IRequest): Promise<PokemonTeam> {
		const userTeam = await this.teamsRepository.findOne({
			user_id,
			id: team_id,
			name: null
		});

		if (!userTeam) {
			const { message, statusCode } = errorConfig.unauthorized;
			throw new AppError(message, statusCode);
		}

		const pokemonTeam = await this.pokemonTeamRepository.addPokemon({
			pokemon_id,
			team_id,
			color,
		});

		return pokemonTeam;
	}
}

export default AddPokemonService;
