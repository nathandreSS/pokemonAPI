import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import avatarsRouter from '@modules/avatars/infra/http/routes/avatars.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordResetRequestRouter from '@modules/users/infra/http/routes/passwordResetRequest.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/avatars', avatarsRouter);
routes.use('/passwordResetRequest', passwordResetRequestRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
