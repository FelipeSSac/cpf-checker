import { container } from 'tsyringe';

import { IServerStatusProvider } from './entities/IServerStatusProvider';
import { ServerStatusProvider } from './implementations/ServerStatusProvider';

container.register<IServerStatusProvider>(
  'ServerStatusProvider',
  ServerStatusProvider,
);
