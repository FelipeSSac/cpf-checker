import { ISystemStatus } from '@modules/SystemStatus/entities/ISystemStatus';
import { SystemStatus } from '@modules/SystemStatus/infra/typeorm/entities/SystemStatus';
import { ISystemStatusRepository } from '../ISystemStatusRepository';

class FakeSystemStatusRepository implements ISystemStatusRepository {
  private systemStatus: ISystemStatus[] = [];

  public async findLast(): Promise<ISystemStatus | undefined> {
    const systemStatus = this.systemStatus[this.systemStatus.length - 1];

    return systemStatus;
  }

  public async count(): Promise<ISystemStatus> {
    const lastStatus = await this.findLast();

    if (!lastStatus) {
      const systemStatus = new SystemStatus();

      Object.assign(systemStatus, {
        id: 0,
        total_checks: 1,
      });

      return systemStatus;
    }

    lastStatus.total_checks += 1;

    return lastStatus;
  }

  public async create(): Promise<ISystemStatus> {
    const lastStatus = await this.findLast();

    if (!lastStatus) {
      const systemStatus = new SystemStatus();

      Object.assign(systemStatus, {
        id: 0,
        total_checks: 0,
      });

      return systemStatus;
    }

    const systemStatus = new SystemStatus();

    Object.assign(systemStatus, {
      id: lastStatus.id + 1,
      total_checks: 0,
    });

    return systemStatus;
  }

  public async save(data: ISystemStatus): Promise<ISystemStatus> {
    const systemStatus = data;

    this.systemStatus.push(systemStatus);

    return systemStatus;
  }
}

export { FakeSystemStatusRepository };
