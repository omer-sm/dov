export type Statistic =
  | 'VISIT'
  | 'REPORT_GENERATED'
  | 'REPORT_COPIED'
  | 'REPORT_SENT_ON_WHATSAPP'
  | 'SET_DARK_MODE'
  | 'SET_LIGHT_MODE';

export const ANALYTICS_URL = 'https://dov-analytics.omersm.workers.dev';

export const reportAnalytic = (statistic: Statistic) =>
  fetch(`${ANALYTICS_URL}/statistics`, {
    method: 'POST',
    body: JSON.stringify({ statistic }),
  });
