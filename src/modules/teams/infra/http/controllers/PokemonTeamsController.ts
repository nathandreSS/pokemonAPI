import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddPokemonService from '@modules/teams/services/AddPokemonService';
import RemovePokemonService from '@modules/teams/services/RemovePokemonService';
import PokemonTeamRepository from '../../typeorm/repositories/PokemonTeamRepository';

export default class PokemonTeamsController {
	public async addPokemon(request: Request, response: Response): Promise<Response> {
		const { pokemon_id, team_id, color } = request.body;
		const user_id = request.user.id;
		const addPokemonService = container.resolve(AddPokemonService);
		const pokemonTeam = await addPokemonService.execute({
			user_id,
			pokemon_id,
			team_id,
			color,
		});

		return response.json(pokemonTeam);
	}

	public async removePokemon(request: Request, response: Response): Promise<Response> {
		const { pokemon_id, team_id } = request.body;
		const user_id = request.user.id;
		const removePokemonService = container.resolve(RemovePokemonService);
		const team = await removePokemonService.execute({
			user_id,
			pokemon_id,
			team_id,
		});

		return response.status(204).json();
	}

	public async findByTeam(request: Request, response: Response): Promise<Response> {
		const { team_id } = request.params;
		const pokemonTeamRepository = new PokemonTeamRepository();
		const {pokemons_team, count} = await pokemonTeamRepository.findByTeam(team_id);
		response.setHeader('X-total-count', count);
		response.setHeader('Access-Control-Expose-Headers', 'X-total-count');
		return response.json(pokemons_team)
		
	}
}
