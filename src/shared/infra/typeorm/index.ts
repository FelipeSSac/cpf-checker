/* eslint-disable no-console */
import { createConnections } from 'typeorm';

import { CreateSystemStatus } from '@shared/handlers/CreateSystemStatus';

(async () => {
  console.log('[DB🎲] Trying connection to database...');

  await createConnections();

  const createSystemStatus = new CreateSystemStatus();
  createSystemStatus.execute();

  console.log('[DB🎲] Connected to database!');
})();
