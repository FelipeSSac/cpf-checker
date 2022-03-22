import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowSystemStatusService } from '@modules/SystemStatus/services/ShowSystemStatusService';

class SystemStatusController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showSystemStatusService = container.resolve(
      ShowSystemStatusService,
    );

    const systemStatus = await showSystemStatusService.execute();

    return response.status(200).json(systemStatus);
  }
}

export { SystemStatusController };
