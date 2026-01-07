import type { Report } from '../State/ReportState/reportState';

export type Statistic =
  | 'VISIT'
  | 'REPORT_GENERATED'
  | 'REPORT_COPIED'
  | 'REPORT_SENT_ON_WHATSAPP'
  | 'SET_DARK_MODE'
  | 'SET_LIGHT_MODE';

export const ANALYTICS_URL = 'https://dov-analytics.omersm.workers.dev';
// export const ANALYTICS_URL = 'http://localhost:8787';

export const reportAnalytic = (statistic: Statistic) =>
  fetch(`${ANALYTICS_URL}/statistics`, {
    method: 'POST',
    body: JSON.stringify({ statistic }),
  });

export const sendReport = (report: Report) => {
  try {
    const formattedReport = {
      reporterName: report.name,
      reportTime: report.date.toISOString(),
      location: report.location,
      situation: report.situation,
      severity: report.severity,
      peopleDamaged: report.outcome.peopleDamaged,
      propertyDamaged: report.outcome.propertyDamaged,
      personalActivity: report.personalActivity,
      teamActivity: report.teamActivity,
      description: report.description,
      recommendations: report.recommendations,
    };

    if (formattedReport.description) {
      fetch(`${ANALYTICS_URL}/last-report`, {
        method: 'PUT',
        body: JSON.stringify(formattedReport),
      });
    }
  } catch (e) {
    console.error(e);
  }
};
