import type { Dayjs } from 'dayjs';
import type { Report } from '../State/ReportState/reportState';

export const formatDate = (date: Dayjs) =>
  date
    .toDate()
    .toLocaleDateString('he', { year: '2-digit', month: '2-digit', day: '2-digit' });

export const formatTime = (date: Dayjs) =>
  date.toDate().toLocaleTimeString('he', { hour: 'numeric', minute: '2-digit' });

const translatePersonalActivity = (personalActivity: Report['situation']) => {
  return personalActivity === 'Routine' ? 'שגרה' : personalActivity === 'Training' ? 'אימון' : 'חופשה';
};

const formatOutcome = (outcome: Report['outcome']) => {
  return `${outcome.peopleDamaged ? 'י' : 'א'}.נ.${
    outcome.propertyDamaged ? 'י' : 'א'
  }.נ`;
};

const reportFields: ((report: Report) => string)[] = [
  ({ situation }) => `*מאפיין תחומי* - ${situation}`,
  () => '*שם היחידה* - בט"ר דותן',
  ({name}) => `*שם המדווח* - ${name}`,
  ({name, phoneNumber}) => `*מספר טלפון ושם* - ${phoneNumber}, ${name}`,
  ({ date }) =>
    `*תאריך ושעת האירוע* - ${formatDate(date)} ${formatTime(date)}`,
  ({ location }) => `*מקום האירוע* - ${location}`,
  ({ description }) => `*תיאור האירוע* - ${description}`,
  ({ outcome }) => `*תוצאות האירוע* - ${formatOutcome(outcome)}`,
  ({situation: personalActivity}) => `*מאפיין פעילות הפרט* - ${translatePersonalActivity(personalActivity)}`,
  ({teamActivity}) => `*מאפיין פעילות היחידה* - ${teamActivity}`,
  ({recommendations}) => `*המלצות ראשוניות* - ${recommendations}`
];

export const formatReport = (report: Report) => {
  return reportFields.reduce((acc, curr) => acc + '\n' + curr(report), '').trimStart();
};
