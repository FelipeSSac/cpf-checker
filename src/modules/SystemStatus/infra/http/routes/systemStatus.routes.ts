import { Router } from 'express';
import { SystemStatusController } from '../controllers/SystemStatusController';

const systemStatusRouter = Router();
const systemStatusController = new SystemStatusController();

systemStatusRouter.get('/', systemStatusController.show);

export { systemStatusRouter };
