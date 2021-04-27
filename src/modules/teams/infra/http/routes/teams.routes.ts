import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.post('/', ensureAuthenticated, teamsController.create);

teamsRouter.put('/:id', ensureAuthenticated, teamsController.update);

teamsRouter.get('/', ensureAuthenticated, teamsController.read);

teamsRouter.delete('/:id', ensureAuthenticated, teamsController.delete);

export default teamsRouter;
