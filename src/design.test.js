import { expect, test } from 'vitest';
import { design as d, innerWidth, drawerWidth, parts, sources } from './design.js';

const part = id => parts.find(p => p.id === id);

test('buitenmaten inclusief uitstekende knoppen blijven onder de projectgrenzen', () => {
  expect(d.width).toBeLessThanOrEqual(500);
  expect(d.depth + 30).toBeLessThanOrEqual(500);
  expect(d.height).toBeLessThanOrEqual(700);
  expect(d.depth).toBe(d.panel + d.frontClearance + d.bodyDepth + d.back);
  expect(parts.every(p => p.count > 0 && p.length > 0 && p.width > 0 && p.thickness > 0)).toBe(true);
});

test('kast, frontvoegen en opgelegde rug sluiten rekenkundig aan', () => {
  expect(part('A').count).toBe(2);
  expect(part('B').count).toBe(2);
  expect(part('C').count).toBe(1);
  for (const id of ['B', 'C']) {
    expect(part(id).length + 2 * part('A').thickness).toBe(d.width);
    expect(part(id).width).toBe(d.bodyDepth);
  }
  expect(part('D')).toMatchObject({ length: d.height, width: d.width, thickness: d.back });
  expect(part('E').count).toBe(1);
  expect(part('F').count).toBe(1);
  expect(part('E').length + part('F').length + 3 * d.gap).toBe(d.height);
  for (const id of ['E', 'F']) expect(part(id).width + 2 * d.gap).toBe(d.width);
  expect(d.gap + d.doorHeight + d.gap).toBe(d.dividerTop);
});

test('ladebak volgt 230M breedteregel en heeft verticale en horizontale vrije ruimte', () => {
  expect(innerWidth - drawerWidth).toBe(25);
  expect(part('I')).toMatchObject({ length: d.drawerLength, width: drawerWidth, thickness: 16 });
  expect(part('G')).toMatchObject({ count: 2, length: d.drawerLength, width: d.drawerSideHeight, thickness: 16 });
  expect(part('H')).toMatchObject({ count: 2, length: drawerWidth - 2 * part('G').thickness, width: d.drawerSideHeight, thickness: 16 });
  expect(d.bodyDepth).toBeGreaterThanOrEqual(d.drawerLength + 3);
  expect(d.drawerBottom - d.dividerTop).toBeGreaterThanOrEqual(17);
  expect(d.height - d.panel - (d.drawerBottom + d.drawerPanel + d.drawerSideHeight)).toBeGreaterThanOrEqual(20);
});

test('scharnierplanning geeft 16 mm opleg en houdt potgaten binnen deur en onder schot', () => {
  expect(d.panel - d.gap).toBe(16);
  expect(d.hingeInset).toBe(5);
  expect(d.hingeCup).toBe(35);
  expect(d.hingeDepth).toBeLessThan(part('E').thickness);
  for (const center of d.hingeCenters) {
    expect(center - d.hingeCup / 2).toBeGreaterThan(d.gap);
    expect(center + d.hingeCup / 2).toBeLessThan(d.gap + d.doorHeight);
    expect(center + 16).toBeLessThan(d.dividerTop - d.panel);
  }
  expect(d.hingeCenters[0] - d.gap).toBe(70);
  expect(d.gap + d.doorHeight - d.hingeCenters[1]).toBe(70);
});

test('beslagbronnen verwijzen rechtstreeks naar officiële fabrikantdocumentatie', () => {
  expect(sources.length).toBeGreaterThanOrEqual(4);
  for (const source of sources) expect(new URL(source.url).hostname).toMatch(/(^|\.)blum\.com$/);
});
