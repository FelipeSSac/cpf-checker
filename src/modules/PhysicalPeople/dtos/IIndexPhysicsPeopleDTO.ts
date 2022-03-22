import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';

interface IIndexPhysicsPeopleDTO extends IPaginatedRequest {
  is_blacklisted?: boolean;
}

export { IIndexPhysicsPeopleDTO };
