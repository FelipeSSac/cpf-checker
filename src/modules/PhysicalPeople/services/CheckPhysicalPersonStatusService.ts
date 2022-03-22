import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { ISystemStatusRepository } from '@modules/SystemStatus/repositories/ISystemStatusRepository';
import { IPhysicalPeopleRepository } from '../repositories/IPhysicalPeopleRepository';

interface IRequest {
  cpf: string;
}

@injectable()
class CheckPhysicalPersonStatusService {
  constructor(
    @inject('PhysicalPeopleRepository')
    private physicalPeopleRepository: IPhysicalPeopleRepository,

    @inject('SystemStatusRepository')
    private systemStatusRepository: ISystemStatusRepository,
  ) {}

  public async execute({
    cpf,
  }: IRequest): Promise<string> {
    const physicalPerson = await this.physicalPeopleRepository.findByCPF(cpf);

    if (!physicalPerson) {
      throw new AppError('CPF não encontrado!', 404);
    }
    const status = physicalPerson.is_blacklisted ? 'BLOCK' : 'FREE';

    const systemStatus = await this.systemStatusRepository.count();

    await this.systemStatusRepository.save(systemStatus);

    return status;
  }
}

export { CheckPhysicalPersonStatusService };
