import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import avatarsRouter from '@modules/avatars/infra/http/routes/avatars.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import pokemonTeamsRouter from '@modules/teams/infra/http/routes/pokemonTeams.routes';
import teamsRouter from '@modules/teams/infra/http/routes/teams.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/avatars', avatarsRouter);
routes.use('/teams/pokemon', pokemonTeamsRouter);
routes.use('/teams', teamsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
