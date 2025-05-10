import type { Dayjs } from 'dayjs';
import { reportState } from './reportState';
import dayjs from 'dayjs';

export const roundTime = (time: Dayjs) => {
  const roundedMinute = Math.floor(time.minute() / 30) * 30;
  return time.startOf('hour').add(roundedMinute, 'minute');
};

export const clearReport = () => {
  Object.assign(reportState, {
    date: roundTime(dayjs()),
    location: '',
    description: '',
    outcome: {
      peopleDamaged: false,
      propertyDamaged: false,
    },
    severity: 'Light',
  });
};
