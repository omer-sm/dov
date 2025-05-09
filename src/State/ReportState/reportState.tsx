import dayjs, { Dayjs } from 'dayjs'
import { proxy } from 'valtio';

interface Report {
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
}

export const reportState = proxy<Report>({
  platoon: '',
  date: dayjs(),
  location: '',
  situation: 'Routine',
  description: '',
  outcome: {
    peopleDamaged: false,
    propertyDamaged: false,
  },
  severity: 'Light',
});
