import { inject, injectable } from 'tsyringe';

import Team from '@modules/teams/infra/typeorm/entities/Team';
import AppError from '@shared/errors/AppError';
import errorConfig from '@config/error';
import ITeamsRepository from '../repositories/ITeamsRepository';

interface IRequest {
	user_id: string;
	name: string;
	color: string;
}

@injectable()
class CreateTeamService {
	constructor(
		@inject('TeamsRepository')
		private teamsRepository: ITeamsRepository,
	) {}

	public async execute({
		user_id,
		name,
		color,
	}: IRequest): Promise<Team> {
		const existTeamWithThisName = await this.teamsRepository.findOne({
			user_id,
			id: null,
			name,
		});

		if (existTeamWithThisName) {
			const { message, statusCode } = errorConfig.uniqueResource('team', 'name');
			throw new AppError(message, statusCode);
		}

		const team = await this.teamsRepository.create({
			user_id,
			name,
			color,
		});

		return team;
	}
}

export default CreateTeamService;
