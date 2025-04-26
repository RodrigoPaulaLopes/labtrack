import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/users/enums/roles.enum';

export const RolesDecorator = (...roles: Roles[]) => SetMetadata('roles', roles);
