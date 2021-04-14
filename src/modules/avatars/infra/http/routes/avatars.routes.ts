import { Router } from 'express';

import AvatarsController from '../controllers/AvatarsController';

const avatarsRouter = Router();
const avatarsController = new AvatarsController();


avatarsRouter.get('/', avatarsController.index);
avatarsRouter.get('/:id', avatarsController.read);



export default avatarsRouter;
