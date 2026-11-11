import { afterEach, expect, test, vi } from 'vitest';
import { emptyProgress, readProgress, STORAGE_KEY, validateProgress, writeProgress } from './storage.js';

afterEach(() => { vi.restoreAllMocks(); localStorage.clear(); });

test('zonder opslag en met beschadigde JSON begint de cursus leeg', () => {
  expect(readProgress()).toEqual({ ...emptyProgress(), storageError: false });
  localStorage.setItem(STORAGE_KEY, '{kapot');
  expect(readProgress().completed).toEqual([]);
});
test('herstelt alleen bestaande codes en verwijdert dubbels', () => {
  expect(validateProgress({ version: 1, currentId: 'verwijderd', completed: ['materiaal-verkennen', 'materiaal-verkennen', null, 'verwijderd'] })).toEqual({ currentId: 'materiaal-verkennen', completed: ['materiaal-verkennen'] });
  expect(validateProgress({ version: 1, completed: 'geen lijst' })).toEqual(emptyProgress());
});
test('onbekende versies en ongeldige structuren beginnen veilig opnieuw', () => {
  for (const value of [null, [], 42, { version: 2, currentId: 'materiaal-vergelijken' }]) expect(validateProgress(value)).toEqual(emptyProgress());
});
test('bewaart en herstelt uitsluitend versie, positie en afgewerkte codes', () => {
  const state = { currentId: 'materiaal-vergelijken', completed: ['materiaal-verkennen'] };
  expect(writeProgress({ ...state, naam: 'voorbeeld' })).toBe(true);
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toEqual({ version: 1, ...state });
  expect(readProgress()).toEqual({ ...state, storageError: false });
});
test('geblokkeerde en volle opslag geven een foutresultaat zonder crash', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
  expect(readProgress()).toEqual({ ...emptyProgress(), storageError: true });
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota'); });
  expect(writeProgress(emptyProgress())).toBe(false);
});
