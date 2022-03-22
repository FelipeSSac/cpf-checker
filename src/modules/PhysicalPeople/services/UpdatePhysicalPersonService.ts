import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IPhysicalPeopleRepository } from '../repositories/IPhysicalPeopleRepository';
import { IPhysicalPerson } from '../entities/PhysicalPerson';

interface IRequest {
  id: string;
  is_blacklisted: boolean;
}

@injectable()
class UpdatePhysicalPersonService {
  constructor(
    @inject('PhysicalPeopleRepository')
    private physicalPeopleRepository: IPhysicalPeopleRepository,
  ) {}

  public async execute({
    id,
    is_blacklisted,
  }: IRequest): Promise<IPhysicalPerson> {
    const physicalPersonExits = await this.physicalPeopleRepository.findById(id);

    if (!physicalPersonExits) {
      throw new AppError('CPF não encontrado!', 404);
    }

    physicalPersonExits.is_blacklisted = is_blacklisted;

    await this.physicalPeopleRepository.save(physicalPersonExits);

    return physicalPersonExits;
  }
}

export { UpdatePhysicalPersonService };
