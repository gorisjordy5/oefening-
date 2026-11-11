export const chapters = [
  { id: 'materiaal', title: 'Materiaal', steps: [
    { id: 'materiaal-verkennen', title: 'Hout en plaatmateriaal verkennen', text: 'Leerdoel: je herkent massief hout, multiplex, MDF en spaanplaat en legt uit wat vezelrichting doet met de maatvastheid.' },
    { id: 'materiaal-vergelijken', title: 'Materialen vergelijken', text: 'Leerdoel: je onderbouwt de materiaalkeuze van onze nachttafel met eigenschappen, toepassingen en beperkingen.' },
  ] },
  { id: 'voorbereiding', title: 'Werktekening en voorbereiding', steps: [
    { id: 'voorbereiding-tekening', title: 'Het project bekijken', text: 'Leerdoel: je verbindt de aanzichten, maatvoering, verbindingen, zaaglijst en beslagkeuze van één referentieontwerp.' },
  ] },
  { id: 'veiligheid', title: 'Gereedschappen en veiligheid', steps: [
    { id: 'veiligheid-overleg', title: 'Je werkplek voorbereiden', text: 'Bespreek met je leerkracht welke gereedschappen je nodig hebt en welke werkplaatsafspraken gelden. Deze voorbeeldstap is geen instructie om zelfstandig een machine te gebruiken.' },
  ] },
  { id: 'bewerken', title: 'Aftekenen, zagen en verbinden', steps: [
    { id: 'bewerken-volgorde', title: 'De werkvolgorde verkennen', text: 'Bekijk samen hoe aftekenen, zagen en verbinden op elkaar volgen. De precieze verbindingen en werkmaten worden later uitgewerkt.' },
  ] },
  { id: 'montage-afwerking', title: 'Montage en afwerking', steps: [
    { id: 'montage-overzicht', title: 'Van onderdelen naar meubel', text: 'Kast, deur en lade vormen samen je nachttafel. De montage van het gekozen beslag volgt later met de bijbehorende fabrikantdocumentatie.' },
    { id: 'afwerking-terugblik', title: 'Terugkijken op je werk', text: 'Welke stap wil je nog oefenen? Bespreek je antwoord met de leerkracht. De volledige uitleg over schuren en afwerken volgt later.' },
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
