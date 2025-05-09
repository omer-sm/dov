import { situations, situationState } from './situationState';

export const incrementSituationIndex = () => {
  situationState.currentSituationIndex =
    (situationState.currentSituationIndex + 1) % situations.length;
};
