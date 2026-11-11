export const chapters = [
  { id: 'materiaal', title: 'Materiaal', steps: [
    { id: 'materiaal-verkennen', title: 'Hout en plaatmateriaal verkennen', text: 'Leerdoel: je herkent massief hout, multiplex, MDF en spaanplaat en legt uit wat vezelrichting doet met de maatvastheid.' },
    { id: 'materiaal-vergelijken', title: 'Materialen vergelijken', text: 'Leerdoel: je onderbouwt de materiaalkeuze van onze nachttafel met eigenschappen, toepassingen en beperkingen.' },
  ] },
  { id: 'voorbereiding', title: 'Werktekening en voorbereiding', steps: [
    { id: 'voorbereiding-tekening', title: 'Het project bekijken', text: 'Leerdoel: je verbindt de aanzichten, maatvoering, verbindingen, zaaglijst en beslagkeuze van één referentieontwerp.' },
  ] },
  { id: 'veiligheid', title: 'Gereedschappen en veiligheid', steps: [
    { id: 'veiligheid-overleg', title: 'Je werkplek voorbereiden', text: 'Leerdoel: je kiest gereedschap en bespreekt risico’s en toestemming voordat je begint.' },
  ] },
  { id: 'bewerken', title: 'Aftekenen, zagen en verbinden', steps: [
    { id: 'bewerken-volgorde', title: 'Onderdelen aftekenen', text: 'Leerdoel: je gebruikt één referentiekant, onderdeelcodes en de juiste zichtnerf.' },
    { id: 'bewerken-zagen', title: 'Op maat zagen', text: 'Leerdoel: je controleert eindmaten en haaksheid na een vrijgegeven zaagbewerking.' },
    { id: 'bewerken-verbinden', title: 'Verbindingen voorbereiden', text: 'Leerdoel: je past droog en maakt een gecontroleerde proefverbinding.' },
  ] },
  { id: 'montage-afwerking', title: 'Montage en afwerking', steps: [
    { id: 'montage-overzicht', title: 'De kast haaks monteren', text: 'Leerdoel: je monteert A, B, C en D tot een haakse kast.' },
    { id: 'montage-lade', title: 'Ladebak en rolgeleiders', text: 'Leerdoel: je monteert G, H en I en test de Blum STANDARD 230M4000.' },
    { id: 'montage-deur', title: 'Deur en scharnieren', text: 'Leerdoel: je plaatst E met 71B3550 en 173H7100 en stelt de deur af.' },
    { id: 'montage-front', title: 'Ladefront en knoppen', text: 'Leerdoel: je lijnt F uit op de deur en controleert alle bewegingen.' },
    { id: 'afwerking-schuren', title: 'Schuren en beschermen', text: 'Leerdoel: je maakt een afwerkingsproef en beschermt de multiplexvlakken en randen.' },
    { id: 'afwerking-terugblik', title: 'Je nachttafel controleren', text: 'Leerdoel: je controleert maten, verbindingen, beweging en afwerking en bespreekt verbeteringen.' },
  ] },
];

export const steps = chapters.flatMap(chapter => chapter.steps.map(step => ({ ...step, chapterId: chapter.id, chapterTitle: chapter.title })));
export function adjacentStep(id, direction) {
  const index = steps.findIndex(step => step.id === id);
  return index < 0 ? undefined : steps[index + direction];
}
export function progress(completed) {
  const count = steps.filter(step => completed.includes(step.id)).length;
  return { count, total: steps.length, percent: Math.round(count / steps.length * 100) };
}
