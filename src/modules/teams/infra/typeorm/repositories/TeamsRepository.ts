import { Repository, getRepository, IsNull } from 'typeorm';

import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';

import Team from '../entities/Team';
import ICreateTeamDTO from '@modules/teams/dtos/ICreateTeamDTO';
import IUpdateTeamDTO from '@modules/teams/dtos/IUpdateTeamDTO';
import IFindTeamDTO from '@modules/teams/dtos/IFindTeamDTO';

class TeamsRepository implements ITeamsRepository {
	private ormRepository: Repository<Team>;

	constructor() {
		this.ormRepository = getRepository(Team);
	}

	public async create({
		user_id,
		name,
		color
	}: ICreateTeamDTO): Promise<Team> {
		const team = this.ormRepository.create({
			user_id,
			name,
			color,
		});

		return this.ormRepository.save(team);
	}

	public async findOne({user_id, id, name}: IFindTeamDTO): Promise<Team | undefined> {
		const team = await (id ?  this.findById(user_id, id) : this.findByName(user_id, String(name)));
		return team;
	}

	public async find(user_id: string): Promise<{teams: Team[], count: number}> {
		const [teams, count] = await this.ormRepository.findAndCount({
			where: {user_id}});
		
		return {teams, count}
	}

	public async update(team: IUpdateTeamDTO): Promise<Team> {
		return this.ormRepository.save(team);
	}

	public async delete(team_id: string): Promise<void> {
		this.ormRepository.delete(team_id);
	}

	private async findByName(user_id: string, name: string): Promise<Team | undefined> {
		const team = await this.ormRepository.findOne({user_id, name});
		return team;
	}

	private async findById(user_id: string, id: string): Promise<Team | undefined> {
		const team = await this.ormRepository.findOne({user_id, id});
		return team;
	}
}

export default TeamsRepository;
