import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IndexPhysicalPeopleService } from '@modules/PhysicalPeople/services/IndexPhysicalPeopleService';
import { CheckPhysicalPersonStatusService } from '@modules/PhysicalPeople/services/CheckPhysicalPersonStatusService';
import { CreatePhysicalPersonService } from '@modules/PhysicalPeople/services/CreatePhysicalPersonService';
import { UpdatePhysicalPersonService } from '@modules/PhysicalPeople/services/UpdatePhysicalPersonService';

class PhysicalPeopleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page,
      limit,
      is_blacklisted,
    } = request.query;

    const indexPhysicalPeopleService = container.resolve(
      IndexPhysicalPeopleService,
    );

    const physicalPeople = await indexPhysicalPeopleService.execute({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      is_blacklisted: is_blacklisted ? Boolean(is_blacklisted) : undefined,
    });

    return response.status(200).json(physicalPeople);
  }

  public async check(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const checkPhysicalPersonStatusService = container.resolve(
      CheckPhysicalPersonStatusService,
    );

    const status = await checkPhysicalPersonStatusService.execute({
      cpf,
    });

    return response.status(200).json({
      cpf,
      status,
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      cpf,
      is_blacklisted,
    } = request.body;

    const createPhysicalPersonService = container.resolve(
      CreatePhysicalPersonService,
    );

    const physicalPeople = await createPhysicalPersonService.execute({
      cpf,
      is_blacklisted,
    });

    return response.status(201).json(physicalPeople);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      is_blacklisted,
    } = request.body;
    const { cpf } = request.params;

    const updatePhysicalPersonService = container.resolve(
      UpdatePhysicalPersonService,
    );

    const physicalPeople = await updatePhysicalPersonService.execute({
      cpf,
      is_blacklisted,
    });

    return response.status(200).json(physicalPeople);
  }
}

export { PhysicalPeopleController };
