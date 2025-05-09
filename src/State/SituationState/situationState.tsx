import { amber, purple, teal } from '@mui/material/colors';
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import { reportState } from '../ReportState/reportState'
import type { Color } from '@mui/material'

interface Situation {
    text: string;
    color: Color;
    key: 'Routine' | 'Training' | 'Vacation';
}

export const situations: Situation[] = [
  {
    text: 'שגרה 📅',
    color: teal,
    key: 'Routine',
  },
  {
    text: 'אימון 🎯',
    color: amber,
    key: 'Training',
  },
  {
    text: 'חופשה 🏖️',
    color: purple,
    key: 'Vacation',
  },
];

export const situationState = proxy({
    currentSituationIndex: 0,
    currentSituation: situations[0]
});

subscribeKey(situationState, 'currentSituationIndex', (newSituationIndex) => {
    reportState.situation = situations[newSituationIndex].key;
    situationState.currentSituation = situations[newSituationIndex];
});