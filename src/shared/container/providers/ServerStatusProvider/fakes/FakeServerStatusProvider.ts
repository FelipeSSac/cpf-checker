import { IServerStatusProvider } from '../entities/IServerStatusProvider';
import { IServerStatus } from '../interfaces/IServerStatus';

class FakeServerStatusProvider implements IServerStatusProvider {
  public getSystemStatus(): IServerStatus {
    return {
      server_uptime: 60,
      server_online_since: 'há 1 minuto',
    };
  }
}

export { FakeServerStatusProvider };
