import { SystemStatusRepository } from '@modules/SystemStatus/infra/typeorm/repositories/SystemStatusRepository';
import { ISystemStatusRepository } from '@modules/SystemStatus/repositories/ISystemStatusRepository';

class CreateSystemStatus {
  private systemStatusRepository: ISystemStatusRepository;

  constructor() {
    this.systemStatusRepository = new SystemStatusRepository();
  }

  public async execute(): Promise<void> {
    const systemStatus = await this.systemStatusRepository.create();

    await this.systemStatusRepository.save(systemStatus);
  }
}

export { CreateSystemStatus };
