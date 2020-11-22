import {getApp, PermissionModels, User} from '@api/models/User';
import {Appointment} from '@api/models';

export const PERMISSION_VIEW = 'view';
export const PERMISSION_ADD = 'add';
export const PERMISSION_CHANGE = 'change';
export const PERMISSION_DELETE = 'delete';

export interface ModelPermissions {
  view: boolean;
  add: boolean;
  change: boolean;
  delete: boolean;
}

export interface AppointmentPermissions extends ModelPermissions {
  overlap: boolean;
}

export function userPermissions(user: User, model: PermissionModels): ModelPermissions {
  return {
    view: user.permissions.includes(`${getApp(model)}.${PERMISSION_VIEW}_${model}`),
    add: user.permissions.includes(`${getApp(model)}.${PERMISSION_ADD}_${model}`),
    change: user.permissions.includes(`${getApp(model)}.${PERMISSION_CHANGE}_${model}`),
    delete: user.permissions.includes(`${getApp(model)}.${PERMISSION_DELETE}_${model}`),
  };
}

export function appointmentPermissions(user: User): AppointmentPermissions {
  const model = Appointment.modelType;
  return {
    ...userPermissions(user, model),
    overlap: user.permissions.includes(`${getApp(model)}.overlap_${model}`),
  };
}
