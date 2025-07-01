import type { Dayjs } from 'dayjs';
import type { Report } from '../State/ReportState/reportState';

export const formatDate = (date: Dayjs) =>
  date
    .toDate()
    .toLocaleDateString('he', { year: '2-digit', month: '2-digit', day: '2-digit' });

export const formatTime = (date: Dayjs) =>
  date.toDate().toLocaleTimeString('he', { hour: 'numeric', minute: '2-digit' });

const translateSeverity = (severity: Report['severity']) => {
  return severity === 'Light' ? 'קל' : severity === 'Medium' ? 'בינוני' : 'קשה';
};

const translatePersonalActivity = (personalActivity: Report['situation']) => {
  return personalActivity === 'Routine' ? 'שגרה' : personalActivity === 'Training' ? 'אימון' : 'חופשה';
};

const formatOutcome = (outcome: Report['outcome']) => {
  return `${outcome.peopleDamaged ? 'י' : 'א'}.נ.${
    outcome.propertyDamaged ? 'י' : 'א'
  }.נ (${outcome.peopleDamaged ? 'יש' : 'אין'} נפגעים, ${outcome.propertyDamaged ? 'יש' : 'אין'} נזק)`;
};

const reportFields: ((report: Report) => string)[] = [
  ({severity, situation}) => `דיווח ראשוני לאירוע ${situation} ${translateSeverity(severity)}, בט"ר דותן`,
  () => '*שם היחידה* - בט"ר דותן',
  ({name}) => `*שם המדווח* - ${name}`,
  ({phoneNumber}) => `*מספר טלפון* - ${phoneNumber}`,
  ({ date }) =>
    `*תאריך האירוע* - ${formatDate(date)}`,
  ({date}) => `*שעת האירוע* - ${formatTime(date)}`,
  ({ location }) => `*מקום האירוע* - ${location}`,
  ({ situation }) => `*מאפיין תחומי* - ${situation}`,
  ({ outcome }) => `*תוצאות האירוע* - ${formatOutcome(outcome)}`,
  ({personalActivity}) => `*מאפיין פעילות הפרט* - ${translatePersonalActivity(personalActivity)}`,
  ({teamActivity}) => `*מאפיין פעילות היחידה* - ${teamActivity}`,
  ({ description }) => `*תיאור האירוע* - ${description}`,
  ({recommendations}) => `*המלצות ראשוניות* - ${recommendations}`
];

export const formatReport = (report: Report) => {
  return reportFields.reduce((acc, curr) => acc + '\n' + curr(report), '').trimStart();
};
