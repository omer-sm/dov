import type { Dayjs } from 'dayjs';
import type { Report } from '../State/ReportState/reportState';

export const formatDate = (date: Dayjs) =>
  date
    .toDate()
    .toLocaleDateString('he', { year: '2-digit', month: '2-digit', day: '2-digit' });

export const formatTime = (date: Dayjs) =>
  date.toDate().toLocaleTimeString('he', { hour: 'numeric', minute: '2-digit' });

const translateSituation = (situation: Report['situation']) => {
  return situation === 'Routine' ? 'שגרה' : situation === 'Training' ? 'אימון' : 'חופשה';
};

const translateSeverity = (severity: Report['severity']) => {
  return severity === 'Light' ? 'קל' : severity === 'Medium' ? 'בינוני' : 'קשה';
};

const formatOutcome = (outcome: Report['outcome']) => {
  return `${outcome.peopleDamaged ? 'י' : 'א'}.נ.${
    outcome.propertyDamaged ? 'י' : 'א'
  }.נ`;
};

const reportFields: ((report: Report) => string)[] = [
  ({ platoon }) => `א. *מסגרת:* ${platoon}`,
  ({ date }) =>
    `ב. *תאריך:* ${formatDate(date)}`,
  ({ date }) =>
    `ג. *שעה:* ${formatTime(date)}`,
  ({ location }) => `ד. *מיקום:* ${location}`,
  () => 'ה. *סיווג האירוע:* בלמס',
  ({ situation }) => `ו. *מאפיין תחומי:* ${translateSituation(situation)}`,
  ({ description }) => `ז. *תיאור האירוע:* ${description}`,
  ({ outcome }) => `ח. *תוצאת האירוע:* ${formatOutcome(outcome)}`,
  ({ severity }) => `ט. *חומרת פגיעה:* ${translateSeverity(severity)}`,
];

export const formatReport = (report: Report) => {
  return reportFields.reduce((acc, curr) => acc + '\n' + curr(report), '').trimStart();
};
