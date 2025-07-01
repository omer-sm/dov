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

// const translateSeverity = (severity: Report['severity']) => {
//   return severity === 'Light' ? 'קל' : severity === 'Medium' ? 'בינוני' : 'קשה';
// };

const formatOutcome = (outcome: Report['outcome']) => {
  return `${outcome.peopleDamaged ? 'י' : 'א'}.נ.${
    outcome.propertyDamaged ? 'י' : 'א'
  }.נ`;
};

const reportFields: ((report: Report) => string)[] = [
  () => '*דיווח ראשוני לאירוע*',
  ({ situation }) => `*מאפיין תחומי* - ${translateSituation(situation)}`,
  () => '*שם היחידה* - בט"ר דותן',
  ({name}) => `*שם המדווח* - ${name}`,
  ({name, phoneNumber}) => `*מספר טלפון ושם* - ${phoneNumber}, ${name}`,
  ({ date }) =>
    `*תאריך ושעת האירוע* - ${formatDate(date)} ${formatTime(date)}`,
  ({ location }) => `*מקום האירוע* - ${location}`,
  ({ description }) => `*תיאור האירוע* - ${description}`,
  ({ outcome }) => `*תוצאות האירוע* - ${formatOutcome(outcome)}`,
  ({personalActivity}) => `*מאפיין פעילות הפרט* - ${personalActivity}`,
  ({teamActivity}) => `*מאפיין פעילות היחידה* - ${teamActivity}`,
  ({recommendations}) => `*המלצות ראשוניות* - ${recommendations}`
];

export const formatReport = (report: Report) => {
  return reportFields.reduce((acc, curr) => acc + '\n' + curr(report), '').trimStart();
};
