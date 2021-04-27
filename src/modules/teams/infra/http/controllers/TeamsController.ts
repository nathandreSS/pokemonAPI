import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTeamService from '@modules/teams/services/CreateTeamService';
import TeamsRepository from '@modules/teams/infra/typeorm/repositories/TeamsRepository';
import UpdateTeamService from '@modules/teams/services/UpdateTeamService';
import DeleteTeamService from '@modules/teams/services/DeleteTeamService';
import PokemonTeamRepository from '../../typeorm/repositories/PokemonTeamRepository';

export default class TeamsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, color } = request.body;
		const user_id = request.user.id;
		const createTeamService = container.resolve(CreateTeamService);
		const team = await createTeamService.execute({
			name,
			color,
			user_id,
		});

		return response.json(team);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { name, color } = request.body;
		const { id } = request.params;
		const user_id = request.user.id;
		const updateTeamService = container.resolve(UpdateTeamService);
		const team = await updateTeamService.execute({
			user_id,
			id,
			name,
			color,
		});

		return response.json(team);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const user_id = request.user.id;
		const deleteTeamService = container.resolve(DeleteTeamService);
		const team = await deleteTeamService.execute({
			user_id,
			id,
		});

		return response.status(204).json();
	}

	public async read(request: Request, response: Response): Promise<Response> {
		const { id, name } = request.query;
		const user_id = request.user.id;
		const teamsRepository = new TeamsRepository();
		const pokemonTeamRepository = new PokemonTeamRepository();
		if(!id && !name){
			const {teams, count} = await teamsRepository.find(user_id);
			const teamsWithFirstPokemon = await Promise.all(teams.map(async t => ({...t, firstPokemon: await pokemonTeamRepository.findFirstPokemon(id)})));
			response.setHeader('X-total-count', count);
			response.setHeader('Access-Control-Expose-Headers', 'X-total-count');
			return response.json(teamsWithFirstPokemon)
		}

		const team = await teamsRepository.findOne({user_id, id: String(id), name: String(name)});
		return response.json(team);
	}
}
