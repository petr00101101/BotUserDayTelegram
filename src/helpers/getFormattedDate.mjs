import moment from 'moment';

const DATE_FORMAT = 'DD/MM/YYYY';

export function getFormattedDate() {
  return moment().format(DATE_FORMAT);
}
