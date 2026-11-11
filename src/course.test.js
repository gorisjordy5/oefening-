import { expect, test } from 'vitest';
import { adjacentStep, chapters, progress, steps } from './course.js';

test('stappen volgen hoofdstukvolgorde met unieke stabiele codes', () => {
  expect(steps.map(step => step.id)).toEqual(chapters.flatMap(chapter => chapter.steps.map(step => step.id)));
  expect(new Set(steps.map(step => step.id)).size).toBe(steps.length);
  expect(adjacentStep(steps[1].id, -1)).toEqual(steps[0]);
  expect(adjacentStep(steps[1].id, 1)).toEqual(steps[2]);
});
test('eerste, laatste en onbekende stap blijven binnen de cursus', () => {
  expect(adjacentStep(steps[0].id, -1)).toBeUndefined();
  expect(adjacentStep(steps.at(-1).id, 1)).toBeUndefined();
  expect(adjacentStep('onbekend', 1)).toBeUndefined();
});
test('voortgang telt alleen unieke bestaande afgewerkte stappen', () => {
  expect(progress([])).toEqual({ count: 0, total: 7, percent: 0 });
  expect(progress([steps[0].id, steps[0].id, 'onbekend'])).toEqual({ count: 1, total: 7, percent: 14 });
  expect(progress(steps.map(step => step.id)).percent).toBe(100);
});
