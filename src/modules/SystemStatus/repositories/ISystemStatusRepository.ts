import { ISystemStatus } from '../entities/ISystemStatus';

interface ISystemStatusRepository {
  findLast(): Promise<ISystemStatus | undefined>;
  count(): Promise<ISystemStatus>;
  create(): Promise<ISystemStatus>;
  save(systemStatus: ISystemStatus): Promise<ISystemStatus>;
}

export { ISystemStatusRepository };
