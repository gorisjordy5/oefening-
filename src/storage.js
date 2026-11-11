import { steps } from './course.js';

export const STORAGE_KEY = 'nachttafel-voortgang';
export const emptyProgress = () => ({ currentId: steps[0].id, completed: [] });

export function validateProgress(value) {
  if (!value || value.version !== 1) return emptyProgress();
  const validId = id => steps.some(step => step.id === id);
  return {
    currentId: validId(value.currentId) ? value.currentId : steps[0].id,
    completed: Array.isArray(value.completed) ? [...new Set(value.completed.filter(validId))] : [],
  };
}

export function readProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    try {
      return { ...validateProgress(raw ? JSON.parse(raw) : null), storageError: false };
    } catch {
      return { ...emptyProgress(), storageError: false };
    }
  } catch {
    return { ...emptyProgress(), storageError: true };
  }
}

export function writeProgress(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, currentId: state.currentId, completed: state.completed }));
    return true;
  } catch {
    return false;
  }
}
