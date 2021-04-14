import { Request, Response } from 'express';

import AvatarsRepository from '@modules/avatars/infra/typeorm/repositories/AvatarsRepository';

export default class AvatarsController {
	public async index(request: Request, response: Response): Promise<Response> {
		const avatarsRepository = new AvatarsRepository();
		const avatars = await avatarsRepository.find();
		return response.json(avatars);
	}
	public async read(request: Request, response: Response): Promise<Response> {
		const {id} = request.params;
		const avatarsRepository = new AvatarsRepository();
		const avatars = await avatarsRepository.findById(id);
		return response.json(avatars);
	}
}
