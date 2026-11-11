import { render, cleanup } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import LessonContent from './LessonContent.jsx';
import { steps } from './course.js';
import { workshop } from './workshop.js';
import { design } from './design.js';

afterEach(cleanup);
test.each(steps)('$id heeft echte inhoud, illustratie en controleerbare opdracht', step => {
  const { container } = render(<LessonContent id={step.id} />);
  expect(container.textContent).not.toMatch(/Voorbeeldinhoud|wordt nog|volgt later|voorbeeldstap/);
  expect(container.querySelector('svg[role="img"]')).not.toBeNull();
  expect(container.querySelector('.lesson-exercise details p').textContent.length).toBeGreaterThan(100);
});
test('bewerkingen hebben materialen, veiligheid, volgorde en controle', () => {
  expect(Object.keys(workshop)).toEqual(steps.slice(3).map(step => step.id));
  for (const lesson of Object.values(workshop)) {
    expect(lesson.tools.length).toBeGreaterThan(30);
    expect(lesson.safety.length).toBeGreaterThan(100);
    expect(lesson.actions.length).toBeGreaterThanOrEqual(4);
    expect(lesson.check.length).toBeGreaterThan(100);
  }
});
test('montage sluit aan op referentieontwerp en officiële beslagbronnen', () => {
  const drawer = workshop['montage-lade'];
  const door = workshop['montage-deur'];
  expect(drawer.tools).toContain('230M4000');
  expect(drawer.actions.join(' ')).toContain(`${design.drawerBottom} mm`);
  expect(drawer.sourceIndexes).toContain(0);
  expect(door.tools).toContain('71B3550');
  expect(door.tools).toContain('173H7100');
  expect(door.actions.join(' ')).toContain(`${design.hingeCenters[0]} en ${design.hingeCenters[1]}`);
  expect(door.sourceIndexes).toEqual([1, 2, 3, 4]);
  expect(workshop['afwerking-terugblik'].check).toContain('geen centrale beoordeling');
});
