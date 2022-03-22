import { inject, injectable } from 'tsyringe';

import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';

import { IIndexPhysicsPeopleDTO } from '../dtos/IIndexPhysicsPeopleDTO';
import { IPhysicalPeopleRepository } from '../repositories/IPhysicalPeopleRepository';

import { IPhysicalPerson } from '../entities/PhysicalPerson';

@injectable()
class IndexPhysicalPeopleService {
  constructor(
    @inject('PhysicalPeopleRepository')
    private physicalPeopleRepository: IPhysicalPeopleRepository,
  ) {}

  public async execute({
    page,
    limit,
    is_blacklisted,
  }: IIndexPhysicsPeopleDTO): Promise<IPaginatedResponse<IPhysicalPerson>> {
    const physicalPeople = await this.physicalPeopleRepository.index({
      page,
      limit,
      is_blacklisted,
    });

    return physicalPeople;
  }
}

export { IndexPhysicalPeopleService };
