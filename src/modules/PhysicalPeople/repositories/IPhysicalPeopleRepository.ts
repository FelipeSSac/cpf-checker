import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';

import { IPhysicalPerson } from '../entities/PhysicalPerson';

import { ICreatePhysicalPersonDTO } from '../dtos/ICreatePhysicalPersonDTO';
import { IIndexPhysicsPeopleDTO } from '../dtos/IIndexPhysicsPeopleDTO';

interface IPhysicalPeopleRepository {
  index(data: IIndexPhysicsPeopleDTO): Promise<IPaginatedResponse<IPhysicalPerson>>;
  findByCPF(cpf: string): Promise<IPhysicalPerson | undefined>;
  findById(id: string): Promise<IPhysicalPerson | undefined>;
  getBlacklistedQuantity(): Promise<number>;
  create(data: ICreatePhysicalPersonDTO): IPhysicalPerson;
  save(data: IPhysicalPerson): Promise<IPhysicalPerson>;
  remove(data: IPhysicalPerson): Promise<void>;
}

export { IPhysicalPeopleRepository };
