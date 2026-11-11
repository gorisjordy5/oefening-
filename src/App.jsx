import logo from '../design-system/assets/Logos/arcadia-logo.svg';
import { useState } from 'react';
import Course from './Course.jsx';

export default function App() {
  const [courseOpen, setCourseOpen] = useState(false);
  return <>
    <a className="skip-link" href="#inhoud">Ga naar de inhoud</a>
    <header className="course-header">
      <img src={logo} alt="Arcadia" width="136" height="30" />
      <span className="label">HOUTBEWERKING · DERDE GRAAD</span>
    </header>
    <main id="inhoud" tabIndex={-1}>
      <section className="intro" aria-labelledby="titel">
        <div>
          <p className="eyebrow label">VAN MATERIAAL TOT MEUBEL</p>
          <h1 id="titel" className="display">Stap voor stap een nachttafel maken</h1>
          <p className="lead">Een eigen meubel begint met een goed plan. In deze cursus leer je hoe je een nachttafel voorbereidt, maakt en afwerkt.</p>
          <p>Voor leerlingen van de derde graad houtbewerking.</p>
          <a className="ai-btn ai-btn--primary" href="#project">Ontdek het project <span aria-hidden="true">↓</span></a>
          <a className="ai-btn ai-btn--primary course-start" href="#cursus" onClick={() => setCourseOpen(true)}>Open de cursus →</a>
        </div>
        <figure className="furniture">
          <svg viewBox="0 0 360 380" role="img" aria-labelledby="kast-titel" aria-describedby="kast-beschrijving">
            <title id="kast-titel">Schematische nachttafel met één lade en één deur</title>
            <desc id="kast-beschrijving">Een recht kastje op korte poten. Bovenaan zit een lade, daaronder een deur. De tekening is een schets, geen werktekening.</desc>
            <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="none">
              <path className="cabinet-side" d="M76 70 127 39 295 39 295 303 252 333 76 333Z" />
              <path className="cabinet-front" d="M76 70H252V333H76Z" />
              <path d="M76 70 127 39M252 70 295 39M252 333 295 303" />
              <path d="M88 83H240V144H88ZM88 156H240V319H88Z" />
              <path d="M147 113H181M216 224V247M89 333V351H106V333M223 333V351H240V333M279 315V333" strokeLinecap="round" />
            </g>
          </svg>
          <figcaption className="small">Jouw project: één deur, één lade, helemaal zelf gemaakt.</figcaption>
        </figure>
      </section>
      <section id="project" className="project-section" aria-labelledby="project-titel">
        <p className="label eyebrow">HET PROJECT</p>
        <h2 id="project-titel" className="h2">Een klein meubel, veel vakmanschap</h2>
        <div className="project-grid">
          <article className="project-card"><h3 className="h3">Wat maak je?</h3><p>Een nachttafel met één deur en één lade. Je werkt van materiaalkennis en tekening naar montage en afwerking.</p></article>
          <article className="project-card"><h3 className="h3">Hoe groot wordt het?</h3><p>Maximale buitenmaten: <strong>500 × 500 × 700 mm</strong> (breedte × diepte × hoogte).</p></article>
          <article className="project-card"><h3 className="h3">Wat volgt er?</h3><p>De cursus wordt verder aangevuld met stappen, opdrachten en uitleg over veilig werken. Constructie en beslag worden later bepaald, bij voorkeur met Blum-beslag.</p></article>
        </div>
      </section>
      {courseOpen && <Course />}
    </main>
    <footer className="course-footer small">Arcadia · Leren door te maken</footer>
  </>;
}
