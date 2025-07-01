import { amber, purple, teal } from '@mui/material/colors';
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import { reportState } from '../ReportState/reportState'
import type { Color } from '@mui/material'

interface PersonalActivity {
    text: string;
    color: Color;
    key: 'Routine' | 'Training' | 'Vacation';
}

export const personalActivities: PersonalActivity[] = [
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

export const personalActivityState = proxy({
    currentActivityIndex: 0,
    currentActivity: personalActivities[0]
});

subscribeKey(personalActivityState, 'currentActivityIndex', (newActivityIndex) => {
    reportState.personalActivity = personalActivities[newActivityIndex].key;
    personalActivityState.currentActivity = personalActivities[newActivityIndex];
});