import { AppError } from '@shared/errors/AppError';

import { FakePhysicalPeopleRepository } from '@modules/PhysicalPeople/repositories/fakes/FakePhysicalPeopleRepository';
import { FakeServerStatusProvider } from '@shared/container/providers/ServerStatusProvider/fakes/FakeServerStatusProvider';
import { FakeSystemStatusRepository } from '../repositories/fakes/FakeSystemStatusRepository';

import { ShowSystemStatusService } from './ShowSystemStatusService';

let fakeSystemStatusRepository: FakeSystemStatusRepository;
let fakePhysicalPeopleRepository: FakePhysicalPeopleRepository;
let fakeServerStatusProvider: FakeServerStatusProvider;

let showSystemStatusService: ShowSystemStatusService;

describe('ShowSystemStatusService', () => {
  beforeEach(() => {
    fakeSystemStatusRepository = new FakeSystemStatusRepository();
    fakePhysicalPeopleRepository = new FakePhysicalPeopleRepository();
    fakeServerStatusProvider = new FakeServerStatusProvider();

    showSystemStatusService = new ShowSystemStatusService(
      fakeSystemStatusRepository,
      fakePhysicalPeopleRepository,
      fakeServerStatusProvider,
    );
  });

  it('should be able to show system info', async () => {
    const systemStatus = await fakeSystemStatusRepository.create();

    await fakeSystemStatusRepository.save(systemStatus);

    const systemStatusData = await showSystemStatusService.execute();

    expect(systemStatusData).toHaveProperty('server_uptime');
    expect(systemStatusData).toHaveProperty('server_online_since');
    expect(systemStatusData).toHaveProperty('total_physical_person_checks_since_uptime');
    expect(systemStatusData).toHaveProperty('total_blacklisted_physical_people');
  });

  it('should not be able to show system info', async () => {
    await expect(
      showSystemStatusService.execute(),
    ).rejects.toBeInstanceOf(AppError);
  });
});
