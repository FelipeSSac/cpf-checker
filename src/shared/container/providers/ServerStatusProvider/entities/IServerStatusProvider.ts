import { IServerStatus } from '../interfaces/IServerStatus';

interface IServerStatusProvider {
  getSystemStatus(): IServerStatus
}

export { IServerStatusProvider };
