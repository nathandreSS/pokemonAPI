import Team from '../infra/typeorm/entities/Team';
import ICreateTeamDTO from '../dtos/ICreateTeamDTO';
import IUpdateTeamDTO from '../dtos/IUpdateTeamDTO';
import IFindTeamDTO from '../dtos/IFindTeamDTO';

export default interface ITeamsRepository {
	create(data: ICreateTeamDTO): Promise<Team>;
	findOne(filters: IFindTeamDTO): Promise<Team | undefined>;
	find(user_id: string): Promise<{teams: Team[], count: number}>;
	update(data: IUpdateTeamDTO): Promise<Team>;
	delete(team_id: string): Promise<void>;
}
