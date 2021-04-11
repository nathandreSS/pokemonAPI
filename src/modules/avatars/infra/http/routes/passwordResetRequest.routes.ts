import { Router } from 'express';

const passwordResetRequestRouter = Router();

// Manda um email para o usuário que requisitou perguntando se foi ele mesmo e se tiver sido clicar em um botão que redefinirá a senha
passwordResetRequestRouter.post('passwordResetRequest');

export default passwordResetRequestRouter;
