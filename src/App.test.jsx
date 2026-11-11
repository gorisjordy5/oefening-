import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App.jsx';

test('legt doelgroep, bouwopdracht en maatgrenzen leesbaar uit', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: 'Stap voor stap een nachttafel maken' })).toBeVisible();
  expect(screen.getByText('Voor leerlingen van de derde graad houtbewerking.')).toBeVisible();
  expect(screen.getByText('500 × 500 × 700 mm')).toBeVisible();
  expect(screen.getByRole('img', { name: 'Schematische nachttafel met één lade en één deur' })).toBeVisible();
  expect(screen.getByRole('link', { name: /Ontdek het project/ })).toHaveAttribute('href', '#project');
});
