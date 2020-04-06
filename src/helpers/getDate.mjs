import moment from 'moment';

const DATE_FORMAT = 'YYYY MM DD';

export function getDate() {
  return moment().format(DATE_FORMAT);
}
