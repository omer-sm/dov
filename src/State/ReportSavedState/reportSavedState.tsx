import { proxy, subscribe } from "valtio"
import { reportState } from "../ReportState/reportState"
import { saveReport } from "../ReportState/storageHandler"

const SAVE_TIME_MS = 1000;

export const reportSavedState = proxy<{reportSaved: boolean}>({
    reportSaved: true
});

let currTimeout: number | undefined;

subscribe(reportState, () => {
  if (currTimeout !== undefined) {
    clearTimeout(currTimeout);
    reportSavedState.reportSaved = false;
  }

  currTimeout = setTimeout(() => {
    saveReport(reportState);
    reportSavedState.reportSaved = true;
  }, SAVE_TIME_MS);
});
