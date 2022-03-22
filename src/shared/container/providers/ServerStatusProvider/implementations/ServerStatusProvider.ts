import { ensureServerUptime } from '@shared/utils/ensureServerUptime';
import { ensureSinceTime } from '@shared/utils/ensureSinceTime';

import { IServerStatusProvider } from '../entities/IServerStatusProvider';
import { IServerStatus } from '../interfaces/IServerStatus';

class ServerStatusProvider implements IServerStatusProvider {
  public getSystemStatus(): IServerStatus {
    const {
      uptime: server_uptime,
      uptimeDate,
    } = ensureServerUptime();
    const server_online_since = ensureSinceTime(uptimeDate);

    return {
      server_uptime,
      server_online_since,
    };
  }
}

export { ServerStatusProvider };
