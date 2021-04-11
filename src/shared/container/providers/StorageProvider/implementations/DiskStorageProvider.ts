import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import IStorageProvider, { TPieceType } from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
	public async saveFile(file: string, pieceType: TPieceType): Promise<string> {
		fs.promises.rename(
			path.resolve(uploadConfig.folders.temp, file),
			path.resolve(uploadConfig.folders[pieceType], file),
		);

		return file;
	}

	public async deleteFile(file: string, pieceType: TPieceType): Promise<void> {
		const filePath = path.resolve(uploadConfig.folders[pieceType], file);
		try {
			await fs.promises.stat(filePath);
		} catch {
			return;
		}
		await fs.promises.unlink(filePath);
	}

	public async fileExists(
		file: string,
		pieceType: TPieceType,
	): Promise<boolean> {
		const filePath = path.resolve(uploadConfig.folders[pieceType], file);
		try {
			await fs.promises.stat(filePath);
		} catch {
			return false;
		}
		return true;
	}
}
