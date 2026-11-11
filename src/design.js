// Eigen referentieontwerp, millimeters. Geen eerder vastgelegde gebruikerskeuzes.
export const design = {
  width: 480, height: 650, depth: 452,
  panel: 18, back: 6, bodyDepth: 426, frontClearance: 2, gap: 2,
  dividerTop: 450, drawerPanel: 16, drawerLength: 400,
  drawerSideHeight: 100, drawerBottom: 475,
  doorHeight: 446, drawerFrontHeight: 198,
  hingeInset: 5, hingeCup: 35, hingeDepth: 13,
  hingeCenters: [72, 378],
};
export const innerWidth = design.width - 2 * design.panel;
export const drawerWidth = innerWidth - 25;
export const parts = [
  { id: 'A', name: 'Kastzijden', count: 2, length: design.height, width: design.bodyDepth, thickness: 18, grain: 'verticaal' },
  { id: 'B', name: 'Bodem en bovenblad', count: 2, length: innerWidth, width: design.bodyDepth, thickness: 18, grain: 'breedterichting' },
  { id: 'C', name: 'Vaste tussenschotplaat', count: 1, length: innerWidth, width: design.bodyDepth, thickness: 18, grain: 'breedterichting' },
  { id: 'D', name: 'Opgeschroefde rug', count: 1, length: design.height, width: design.width, thickness: 6, grain: 'verticaal' },
  { id: 'E', name: 'Opliggende deur', count: 1, length: design.doorHeight, width: design.width - 4, thickness: 18, grain: 'verticaal' },
  { id: 'F', name: 'Opliggend ladefront', count: 1, length: design.drawerFrontHeight, width: design.width - 4, thickness: 18, grain: 'verticaal' },
  { id: 'G', name: 'Ladezijden', count: 2, length: design.drawerLength, width: design.drawerSideHeight, thickness: 16, grain: 'langs de lade' },
  { id: 'H', name: 'Binnenfront en achterstuk lade', count: 2, length: drawerWidth - 32, width: design.drawerSideHeight, thickness: 16, grain: 'breedterichting' },
  { id: 'I', name: 'Opgelegde ladebodem', count: 1, length: design.drawerLength, width: drawerWidth, thickness: 16, grain: 'langs de lade' },
];
export const sources = [
  { title: 'Blum STANDARD: modellen en inbouw (officiële brochure, p. 2)', url: 'https://d2.blum.com/services/BEC003/me193535_fl_dok_bau_%24sen-ca_%24aof_%24v1.pdf', note: '230M4000; bodem NL × (LW − 25); 12,5 mm zijdelings; minimaal 17 mm onder en 20 mm boven de lade. Brochure FL-487/1, 09.19; geraadpleegd 11 november 2026.' },
  { title: 'Blum catalogus 2024/2025: 110° scharnier (p. 76–77)', url: 'https://publications.blum.com/2024/catalogue/en/76/', note: '71B3550, opliggend, schroefpot. Volgende pagina: overlaytabel, Ø35, potdiepte 13, TB 5 en MD 0 geven 16 mm opleg. Minimale voeg bij 18 mm front en TB 5: 0,8 mm (radius 1 mm).' },
  { title: 'Blum: planning 110° (p. 77)', url: 'https://publications.blum.com/2024/catalogue/en/77/', note: 'Boorbeeld 45/9,5 en scharnierafmetingen; stelbereik en voegcontrole. Geraadpleegd 11 november 2026.' },
  { title: 'Blum: montageplaten (p. 152)', url: 'https://publications.blum.com/2024/catalogue/en/152/', note: '173H7100: afstand 0 mm, kruisplaat met excenter, bevestigingsraster 37/32. Geraadpleegd 11 november 2026.' },
  { title: 'Blum: aantal scharnieren (p. 718)', url: 'https://publications.blum.com/2024/catalogue/en/718/', note: 'Aantal hangt af van frontgewicht en hoogte; scharnieren zo ver mogelijk uit elkaar. Twee voor het lichte front van 446 × 476 × 18 mm; controleer het gewogen afgewerkte front bij de leerkracht.' },
];
