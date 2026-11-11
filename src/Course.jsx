import { useRef, useState } from 'react';
import { adjacentStep, chapters, progress, steps } from './course.js';
import { emptyProgress, readProgress, writeProgress } from './storage.js';

export default function Course() {
  const [state, setState] = useState(readProgress);
  const { currentId, completed, storageError } = state;
  const heading = useRef(null);
  const current = steps.find(step => step.id === currentId);
  const position = steps.indexOf(current) + 1;
  const done = completed.includes(currentId);
  const result = progress(completed);
  function update(next) {
    setState({ ...next, storageError: !writeProgress(next) });
  }
  function navigate(id) {
    update({ currentId: id, completed });
    heading.current?.focus();
  }
  function restart() {
    if (window.confirm('Opnieuw beginnen? Je laatst bekeken stap en alle afgewerkte stappen worden gewist.')) {
      update(emptyProgress());
      heading.current?.focus();
    }
  }
  return <section id="cursus" className="course-section" aria-label="Cursus">
    <div className="course-summary">
      <h2 className="h2">Jouw cursus</h2>
      <p aria-live="polite">{result.count} van {result.total} stappen afgewerkt ({result.percent}%)</p>
      <progress aria-label="Afgewerkte stappen" value={result.count} max={result.total} />
      <p className="small">Bekijken telt niet als afwerken. Je voortgang blijft alleen in deze browser op dit toestel bewaard en verdwijnt als je het browsergeheugen wist. We bewaren geen persoonsgegevens.</p>
      {storageError && <p role="status">Bewaren lukt niet in deze browser. Je kunt verder werken, maar je voortgang kan bij het sluiten of verversen verdwijnen.</p>}
      <button className="ai-btn ai-btn--secondary" onClick={restart}>Opnieuw beginnen</button>
    </div>
    <div className="course-layout">
      <nav className="chapter-overview" aria-label="Hoofdstukoverzicht">
        <h3 className="h3">Hoofdstukken</h3>
        <ol>{chapters.map(chapter => <li key={chapter.id}>
          <button className="chapter-button" aria-current={chapter.id === current.chapterId ? 'true' : undefined} onClick={() => navigate(chapter.steps[0].id)}>{chapter.title}</button>
          <ul>{chapter.steps.map(step => <li key={step.id}>
            <button className="step-button" aria-current={step.id === currentId ? 'step' : undefined} onClick={() => navigate(step.id)}>{step.title} <span className="small">{completed.includes(step.id) ? '✓ Afgewerkt' : 'Open'}</span></button>
          </li>)}</ul>
        </li>)}</ol>
      </nav>
      <article className="course-slide" aria-labelledby="stap-titel">
        <p className="label eyebrow">{current.chapterTitle}</p>
        <p className="small">Huidige positie: stap {position} van {steps.length}</p>
        <h3 id="stap-titel" ref={heading} tabIndex={-1} className="h2">{current.title}</h3>
        <p>{current.text}</p>
        <p className="sample-note small">Voorbeeldinhoud · De volledige cursus wordt nog aangevuld.</p>
        <button className="ai-btn ai-btn--primary" aria-pressed={done} onClick={() => update({ currentId, completed: done ? completed.filter(id => id !== currentId) : [...completed, currentId] })}>{done ? 'Stap weer openzetten' : 'Stap afgewerkt'}</button>
        <div className="step-navigation" aria-label="Stapnavigatie">
          <button className="ai-btn ai-btn--secondary" disabled={!adjacentStep(currentId, -1)} onClick={() => navigate(adjacentStep(currentId, -1).id)}>← Vorige</button>
          <button className="ai-btn ai-btn--secondary" disabled={!adjacentStep(currentId, 1)} onClick={() => navigate(adjacentStep(currentId, 1).id)}>Volgende →</button>
        </div>
      </article>
    </div>
  </section>;
}
