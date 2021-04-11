import { hash, compare } from 'bcryptjs';

import passHash from '@config/passHash';
import IHashProvider from '../models/IHashProvider';

export default class HashProvider implements IHashProvider {
	public async generateHash(payload: string): Promise<string> {
		return hash(payload, passHash.numberHash);
	}

	public async compareHash(payload: string, hashed: string): Promise<boolean> {
		return compare(payload, hashed);
	}
}
