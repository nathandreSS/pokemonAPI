import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserPasswordController from '../controllers/UserPasswordController';

const usersRouter = Router();
const usersController = new UsersController();
const userPasswordController = new UserPasswordController();

usersRouter.post('/', usersController.create);

usersRouter.get('/', ensureAuthenticated, usersController.index);

usersRouter.patch(
	'/password',
	ensureAuthenticated,
	userPasswordController.update,
);

export default usersRouter;
