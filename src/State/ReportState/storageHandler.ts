import dayjs from "dayjs"
import { situationState } from "../SituationState/situationState"
import { reportState, type Report } from "./reportState"

export const saveReport = (report: Report) => {
    localStorage.setItem('currentReport', JSON.stringify(report));
    localStorage.setItem('situationData', JSON.stringify(situationState));
}

export const loadReport = () => {
    const report = localStorage.getItem('currentReport');
    const situation = localStorage.getItem('situationData');

    if (report !== null) {
        const reportData: Report = JSON.parse(report);
        reportData.date = dayjs(reportData.date);
        Object.assign(reportState, reportData);
    }

    if (situation !== null) {
        const situationData = JSON.parse(situation);
        Object.assign(situationState, situationData);
    }
}