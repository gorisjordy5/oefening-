import { workshop } from './workshop.js';
import { sources } from './design.js';

function Illustration({ type, caption }) {
  const drawings = {
    safety: <><rect x="20" y="25" width="140" height="95"/><path d="M35 45H140M35 65H140M35 85H110M175 75H210l-10-8m10 8-10 8"/><circle cx="270" cy="75" r="40"/><path d="m250 75 15 15 25-30"/></>,
    mark: <><rect x="45" y="20" width="230" height="130"/><path strokeWidth="5" d="M45 20V150"/><path d="M65 125H230M220 115l10 10-10 10M110 100V40l-8 10m8-10 8 10M240 20V150M247 35l20 20m-20 5 20 20m-20 5 20 20m-20 5 20 20"/></>,
    square: <><rect x="60" y="25" width="220" height="110"/><path d="M60 25 280 135M280 25 60 135M60 150H280M40 25V135M60 40H75V25"/></>,
    joint: <><rect x="65" y="25" width="22" height="120"/><rect x="87" y="65" width="200" height="22"/><path d="M60 76H145m-6-7 6 7-6 7M110 35V15H40V165H110V110M100 110h20m-20-75h20"/><path strokeDasharray="3 3" d="M87 65V87"/></>,
    cabinet: <><rect x="90" y="15" width="150" height="150"/><path d="M90 15 240 165M240 15 90 165M90 62H240M98 15V165M232 15V165"/></>,
    runner: <><path d="M30 20V145H330V20M30 120H330"/><rect x="55" y="40" width="250" height="55"/><path d="M55 85H305M40 100H55M305 100H320M55 30H305"/></>,
    hinge: <><rect x="100" y="15" width="140" height="150"/><circle cx="120" cy="40" r="12"/><circle cx="120" cy="140" r="12"/><path d="M120 40H70M120 140H70M265 45V135m-6-8 6 8 6-8M260 90H315m-8-6 8 6-8 6M50 60l30 20m-4-10 4 10-10-2"/></>,
    front: <><rect x="90" y="15" width="150" height="150"/><rect x="94" y="19" width="142" height="45"/><rect x="94" y="68" width="142" height="93"/><circle cx="165" cy="42" r="3"/><circle cx="218" cy="112" r="3"/><path d="M245 66H290M245 19H290M245 161H290"/></>,
    finish: <><rect x="40" y="70" width="150" height="55"/><path d="M50 110H175m-10-7 10 7-10 7M70 85l20-35 60 20-20 35ZM220 115V55H280V115ZM230 55V35H270V55M230 85H270"/></>,
    final: <><rect x="20" y="30" width="135" height="55"/><rect x="200" y="30" width="135" height="55"/><rect x="20" y="110" width="135" height="55"/><rect x="200" y="110" width="135" height="55"/><path d="M160 55H195M160 140H195M85 90V105M265 90V105"/><g className="drawing-text" stroke="none"><text x="38" y="64">Maatvoering</text><text x="215" y="64">Verbindingen</text><text x="40" y="144">Beweging</text><text x="222" y="144">Afwerking</text></g></>,
  };
  const labels = {
    safety: ['Plan + overleg', 'Vrijgave'], mark: ['Referentiekant · nerf ↑', 'Afvalzijde rechts'], square: ['Lengte × breedte', 'Diagonalen vergelijken'], joint: ['A → B / C', 'Voorboren · proefnaad'], cabinet: ['D · rug', 'C op 450'], runner: ['444 / 419', '12,5 per kant'], hinge: ['E · binnenzijde', 'Hoogte · zij · diepte'], front: ['F boven · E onder', 'Voegen 2 mm'], finish: ['Schuur met de nerf →', 'Proef + productblad'], final: ['Maten       Naden', 'Beweging   Afwerking'],
  };
  return <figure className="lesson-figure"><p className="small scroll-hint">↔ Verschuif de tekening. Met toetsenbord: Tab naar de tekening, daarna de pijltjestoetsen.</p><div className="drawing-scroll" role="region" aria-label="Bewerkingsschema — horizontaal verschuifbaar" tabIndex={0}><svg viewBox="0 0 360 235" role="img" aria-label={caption}><g className="drawing-lines">{drawings[type]}</g><g className="drawing-text"><text x="20" y="195">{labels[type][0]}</text><text x="20" y="220">{labels[type][1]}</text></g></svg></div><figcaption>{caption}</figcaption></figure>;
}

export default function WorkshopLesson({ id }) {
  const lesson = workshop[id];
  if (!lesson) throw new Error(`Onbekende les: ${id}`);
  const links = [...(lesson.sourceIndexes ?? []).map(index => [sources[index].title, sources[index].url]), ...(lesson.links ?? [])];
  return <>
    <h4>Wat heb je nodig?</h4><p>{lesson.tools}</p>
    <section className="lesson-status"><h4>Veilig werken · eerst lezen</h4><p>{lesson.safety}</p></section>
    <Illustration type={lesson.picture} caption={lesson.caption} />
    <h4>Zo werk je</h4><ol>{lesson.actions.map(action => <li key={action}><p>{action}</p></li>)}</ol>
    <section className="lesson-status"><h4>Controle vóór je verdergaat</h4><p>{lesson.check}</p></section>
    <section className="lesson-exercise"><h4>Opdracht · controleer je aanpak</h4><p>{lesson.question}</p><details><summary>Bekijk antwoord en bespreekcriteria</summary><p>{lesson.answer}</p><p className="small">Bespreek je redenering met je leerkracht. Je antwoord wordt niet opgeslagen.</p></details></section>
    {links.length > 0 && <section><h4>Bronnen en instructies</h4><p className="small">Officiële bronnen, geraadpleegd 11 november 2026. De lokale machinehandleiding en het gekozen productblad horen bij de vrijgave door de leerkracht.</p><ul className="lesson-sources">{links.map(([title, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{title}</a></li>)}</ul></section>}
  </>;
}
