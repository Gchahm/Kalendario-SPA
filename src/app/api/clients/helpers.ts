import * as moment from 'moment';

export function convertMoment(params = {}): any  {
  const result = {};
  Object.keys(params).forEach(prop => {
    if (params[prop] instanceof moment) {
      result[prop] = params[prop].toISOString();
    } else {
      result[prop] = params[prop];
    }
  });
  return result;
}
