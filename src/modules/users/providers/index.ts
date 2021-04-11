import { container } from 'tsyringe';
import IHashProvider from './models/IHashProvider';
import HashProvider from './implementations/HashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
