import { inject, injectable } from 'tsyringe';

import Team from '@modules/teams/infra/typeorm/entities/Team';
import AppError from '@shared/errors/AppError';
import errorConfig from '@config/error';
import ITeamsRepository from '../repositories/ITeamsRepository';

interface IRequest {
	user_id: string;
	id: string;
}

@injectable()
class DeleteTeamService {
	constructor(
		@inject('TeamsRepository')
		private teamsRepository: ITeamsRepository,
	) {}

	public async execute({
		user_id,
		id,
	}: IRequest): Promise<void> {
		const existTeamWithThisId = await this.teamsRepository.findOne({
			user_id,
			id,
		});

		if (!existTeamWithThisId) {
			const { message, statusCode } = errorConfig.invalidId('Team');
			throw new AppError(message, statusCode);
		}

		const team = await this.teamsRepository.delete(id);
	}
}

export default DeleteTeamService;