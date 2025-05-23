import dayjs, { Dayjs } from 'dayjs';
import { proxy } from 'valtio';
import { roundTime } from './utils';

export interface Report {
  platoon: string;
  date: Dayjs;
  location: string;
  situation: 'Routine' | 'Training' | 'Vacation';
  description: string;
  outcome: {
    peopleDamaged: boolean;
    propertyDamaged: boolean;
  };
  severity: 'Light' | 'Medium' | 'Severe';
  destinationPhone: string;
}

export const reportState = proxy<Report>({
  platoon: '',
  date: roundTime(dayjs()),
  location: '',
  situation: 'Routine',
  description: '',
  outcome: {
    peopleDamaged: false,
    propertyDamaged: false,
  },
  severity: 'Light',
  destinationPhone: '',
});
