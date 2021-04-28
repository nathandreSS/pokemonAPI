import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';


import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';
import TeamsRepository from '@modules/teams/infra/typeorm/repositories/TeamsRepository';
import IPokemonTeamRepository from '@modules/teams/repositories/IPokemonTeamRepository';
import PokemonTeamRepository from '@modules/teams/infra/typeorm/repositories/PokemonTeamRepository';
import IAvatarRepository from '@modules/avatars/repositories/IAvatarsRepository';
import AvatarRepository from '@modules/avatars/infra/typeorm/repositories/AvatarsRepository';


container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);

container.registerSingleton<ITeamsRepository>(
	'TeamsRepository',
	TeamsRepository,
);

container.registerSingleton<IPokemonTeamRepository>(
	'PokemonTeamRepository',
	PokemonTeamRepository,
);

container.registerSingleton<IAvatarRepository>(
	'AvatarRepository',
	AvatarRepository,
);
