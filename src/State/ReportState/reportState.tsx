import dayjs, { Dayjs } from 'dayjs';
import { proxy } from 'valtio';
import { roundTime } from './utils';

export interface Report {
  platoon: string;
  date: Dayjs;
  location: string;
  name: string;
  phoneNumber: string;
  situation: string;
  description: string;
  outcome: {
    peopleDamaged: boolean;
    propertyDamaged: boolean;
  };
  severity: 'Light' | 'Medium' | 'Severe';
  recommendations: string;
  personalActivity: 'Routine' | 'Training' | 'Vacation';
  teamActivity: string;
  destinationPhone: string;
}

export const reportState = proxy<Report>({
  platoon: '',
  date: roundTime(dayjs()),
  location: '',
  name: '',
  phoneNumber: '',
  situation: '',
  description: '',
  outcome: {
    peopleDamaged: false,
    propertyDamaged: false,
  },
  severity: 'Light',
  recommendations: '',
  personalActivity: 'Routine',
  teamActivity: 'הכשרה',
  destinationPhone: '',
});
