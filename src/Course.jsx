import { useRef, useState } from 'react';
import { adjacentStep, chapters, progress, steps } from './course.js';

export default function Course() {
  const [currentId, setCurrentId] = useState(steps[0].id);
  const [completed, setCompleted] = useState([]);
  const heading = useRef(null);
  const current = steps.find(step => step.id === currentId);
  const position = steps.indexOf(current) + 1;
  const done = completed.includes(currentId);
  const result = progress(completed);
  function navigate(id) {
    setCurrentId(id);
    heading.current?.focus();
  }
  return <section id="cursus" className="course-section" aria-label="Cursus">
    <div className="course-summary">
      <h2 className="h2">Jouw cursus</h2>
      <p aria-live="polite">{result.count} van {result.total} stappen afgewerkt ({result.percent}%)</p>
      <progress aria-label="Afgewerkte stappen" value={result.count} max={result.total} />
      <p className="small">Bekijken telt niet als afwerken. Je voortgang blijft tijdens deze geopende sessie behouden.</p>
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
        <button className="ai-btn ai-btn--primary" aria-pressed={done} onClick={() => setCompleted(previous => done ? previous.filter(id => id !== currentId) : [...previous, currentId])}>{done ? 'Stap weer openzetten' : 'Stap afgewerkt'}</button>
        <div className="step-navigation" aria-label="Stapnavigatie">
          <button className="ai-btn ai-btn--secondary" disabled={!adjacentStep(currentId, -1)} onClick={() => navigate(adjacentStep(currentId, -1).id)}>← Vorige</button>
          <button className="ai-btn ai-btn--secondary" disabled={!adjacentStep(currentId, 1)} onClick={() => navigate(adjacentStep(currentId, 1).id)}>Volgende →</button>
        </div>
      </article>
    </div>
  </section>;
}
