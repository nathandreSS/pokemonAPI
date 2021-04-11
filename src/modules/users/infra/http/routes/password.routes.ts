import { Router } from 'express';

const userPasswordRouter = Router();

// reseta a senha do usuário
userPasswordRouter.delete('password/:id');

export default userPasswordRouter;
