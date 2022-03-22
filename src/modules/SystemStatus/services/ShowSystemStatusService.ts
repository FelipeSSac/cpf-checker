import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IServerStatusProvider } from '@shared/container/providers/ServerStatusProvider/entities/IServerStatusProvider';
import { IPhysicalPeopleRepository } from '@modules/PhysicalPeople/repositories/IPhysicalPeopleRepository';
import { ISystemStatusRepository } from '../repositories/ISystemStatusRepository';

import { ICheckSystemStatusDTO } from '../dtos/ICheckSystemStatusDTO';

@injectable()
class ShowSystemStatusService {
  constructor(
    @inject('SystemStatusRepository')
    private systemStatusRepository: ISystemStatusRepository,

    @inject('PhysicalPeopleRepository')
    private physicalPeopleRepository: IPhysicalPeopleRepository,

    @inject('ServerStatusProvider')
    private serverStatusProvider: IServerStatusProvider,
  ) {}

  public async execute(): Promise<ICheckSystemStatusDTO> {
    const systemStatus = await this.systemStatusRepository.findLast();

    if (!systemStatus) {
      throw new AppError('Nenhuma informação encontrada!', 404);
    }

    const total_blacklisted_physical_people = await this.physicalPeopleRepository
      .getBlacklistedQuantity();

    const {
      server_uptime,
      server_online_since,
    } = this.serverStatusProvider.getSystemStatus();

    return {
      server_uptime,
      server_online_since,
      total_blacklisted_physical_people,
      total_physical_person_checks_since_uptime: systemStatus.total_checks,
    };
  }
}

export { ShowSystemStatusService };
