import { personalActivities, personalActivityState } from './personalActivityState';

export const incrementSituationIndex = () => {
  personalActivityState.currentActivityIndex =
    (personalActivityState.currentActivityIndex + 1) % personalActivities.length;
};
