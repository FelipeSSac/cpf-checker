import { getRepository, Repository } from 'typeorm';

import { ISystemStatus } from '@modules/SystemStatus/entities/ISystemStatus';
import { ISystemStatusRepository } from '@modules/SystemStatus/repositories/ISystemStatusRepository';
import { SystemStatus } from '../entities/SystemStatus';

class SystemStatusRepository implements ISystemStatusRepository {
  private repository: Repository<ISystemStatus>;

  constructor() {
    this.repository = getRepository(SystemStatus);
  }

  public async findLast(): Promise<ISystemStatus | undefined> {
    const systemInfo = await this.repository
      .createQueryBuilder('system_status')
      .orderBy('system_status.id', 'DESC')
      .getOne();

    return systemInfo;
  }

  public async count(): Promise<ISystemStatus> {
    const lastStatus = await this.findLast();

    if (!lastStatus) {
      const systemStatus = this.repository.create({
        id: 0,
        total_checks: 1,
      });

      return systemStatus;
    }

    lastStatus.total_checks += 1;

    return lastStatus;
  }

  public async create(): Promise<ISystemStatus> {
    const lastInfo = await this.findLast();

    if (!lastInfo) {
      const systemInfo = this.repository.create({
        id: 0,
        total_checks: 0,
      });

      return systemInfo;
    }

    const systemStatus = this.repository.create({
      id: lastInfo.id + 1,
      total_checks: 0,
    });

    return systemStatus;
  }

  public async save(systemStatus: ISystemStatus): Promise<ISystemStatus> {
    const systemInfo = await this.repository.save(systemStatus);

    return systemInfo;
  }
}

export { SystemStatusRepository };
