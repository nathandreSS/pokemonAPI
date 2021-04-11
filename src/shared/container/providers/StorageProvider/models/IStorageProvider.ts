export type TPieceType =
	| 'temp'
	| 'photo'
	| 'locale'
	| 'document'
	| 'exposition'
	| 'news'
	| 'event';

export default interface IStorageProvider {
	saveFile(file: string, pieceType: TPieceType): Promise<string>;
	deleteFile(file: string, pieceType: TPieceType): Promise<void>;
	fileExists(file: string, pieceType: TPieceType): Promise<boolean>;
}
