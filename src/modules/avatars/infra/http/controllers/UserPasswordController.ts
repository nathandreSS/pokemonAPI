import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ChangePasswordService from '@modules/users/services/ChangePasswordService';

export default class UserPasswordController {
	public async update(request: Request, response: Response): Promise<Response> {
		const { password, newPassword } = request.body;
		const { id } = request.user;
		const changePasswordService = container.resolve(ChangePasswordService);
		const userUpdated = await changePasswordService.execute({
			id,
			password,
			newPassword,
		});

		return response.json(userUpdated);
	}
}
