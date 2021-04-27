import { inject, injectable } from 'tsyringe';

import Team from '@modules/teams/infra/typeorm/entities/Team';
import AppError from '@shared/errors/AppError';
import errorConfig from '@config/error';
import ITeamsRepository from '../repositories/ITeamsRepository';

interface IRequest {
	user_id: string;
	id: string;
	name: string;
	color: string;
}
@injectable()
class UpdateTeamService {
	constructor(
		@inject('TeamsRepository')
		private teamsRepository: ITeamsRepository,
	) {}

	public async execute({ user_id, id, name, color }: IRequest): Promise<Team> {
		const team = await this.teamsRepository.findOne({user_id, id});

		if (!team) {
			const { message, statusCode } = errorConfig.invalidId('Team');
			throw new AppError(message, statusCode);
		}

		const teamUpdated = { ...team, name, color };
		return this.teamsRepository.update(teamUpdated);
	}
}

export default UpdateTeamService;
