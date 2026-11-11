# Stap voor stap een nachttafel maken

Een cursuswebsite voor leerlingen van de derde graad houtbewerking, gemaakt met React en Vite. De eerste versie bevat een startpagina met het project, een schematische nachttafel en de maximale buitenmaten. Cursusstappen en voortgang volgen later.

## Cursus openen

[Open de cursus](https://gorisjordy5.github.io/oefening-/). Leerlingen hebben geen account nodig. Elke merge naar `main` bouwt en publiceert de website automatisch via GitHub Actions. De workflow **Cursus publiceren** toont de voortgang; de link werkt zodra de eerste publicatie geslaagd is. GitHub Pages gebruikt GitHub Actions als bron.

## Lokaal werken

Gebruik Node.js 22.22.2 of hoger binnen versie 22, of een versie die voldoet aan `engines` in `package.json`.

| Doel | Commando |
|---|---|
| Pakketten installeren vanuit het lockbestand | `npm ci` |
| Website lokaal starten | `npm run dev` |
| Werkingstest | `npm test` |
| Testbrowser installeren | `npx playwright install --no-shell chromium` |
| Voor de browsertests: productieversie bouwen | `npm run build` |
| Echte browsertests, desktop en 320 px breed | `npm run test:e2e` |
| Productieversie bouwen naar `dist/` | `npm run build` |

De ontwikkelserver toont het lokale webadres onder `/oefening-/`. De productiebuild en tests gebruiken de bestaande huisstijl uit `design-system/`. Er is geen backend of account. De PR-workflow installeert via het lockbestand, voert tests uit en bouwt de website. De publicatieworkflow controleert dezelfde gebouwde app voor publicatie en voorkomt overlappende publicaties. Er is nog geen formatter of linter ingesteld.

Lokale verificatie: `npm ci` is uitgevoerd. Omdat de bestaande Windows-sessie Node niet in het zoekpad had, zijn de Vite-, Vitest- en Playwright-entrypoints rechtstreeks gestart met `C:/Program Files/nodejs/node.exe`; dit zijn dezelfde programma's achter de scripts hierboven. Open na een nieuwe Node-installatie een nieuwe terminal voor de gewone npm-commando's.

Resultaat: één Vitest-test en zes Playwright-tests geslaagd; productiebuild geslaagd. De browsertests zijn lokaal met de geïnstalleerde Edge uitgevoerd via een tijdelijke configuratie: de gedownloade Chromium gaf bij processtart `spawn UNKNOWN`. De PR-workflow controleert dezelfde tests met Chromium op Linux. Desktop en 320 px zijn ook visueel nagekeken. De browsercontrole start de gebouwde website via Vite Preview en controleert inhoud, navigatie, focus, horizontale overloop en opnieuw laden onder `/oefening-/`, inclusief scripts, stijlen en afbeeldingen zonder ontbrekende bestanden. De definitieve onlinecontrole volgt na de eerste merge en geslaagde publicatie.

## Oorspronkelijke projecttemplate

Dit is een startpunt voor een eigen app of website die je met AI bouwt. Je hebt geen programmeerervaring nodig. De AI schrijft de code; deze template zorgt ervoor dat je project een solide basis krijgt en dat je er later zelfstandig mee verder kan.

Je krijgt:

- **skills**: kant-en-klare werkwijzen die je AI stap voor stap door de juiste keuzes en handelingen leiden
- **een design system**: een vormgeving die je AI meteen kan gebruiken, en die je later eenvoudig kan laten vervangen

Op het einde heb je je eigen project op GitHub, een ontwerpdocument en een eerste lijst taken om verder aan te werken.

## Wat heb je nodig?

- een gratis GitHub-account
- toegang tot Claude Code of Codex
- een idee voor een app of website

## Zo begin je

Onderstaande stappen gebruiken **Claude Code**. Gebruik je **Codex**, volg dan de [aparte Codex-stappen](docs/CODEX.md). Die gebruiken zelfstandige skills in `.agents/skills/`, `$setup` in plaats van `/setup` en een meegeleverde `AGENTS.md`. De Claude-skills en -instellingen blijven apart behouden.

### 1. Maak je eigen project

Klik bovenaan deze pagina op **Use this template** en kies **Create a new repository**. Geef je project een naam. Kopieer daarna de URL van je nieuwe project.

### 2. Haal het project naar je laptop

Open Claude Code in de map waarin je wil werken en vraag:

```text
Kloon dit project naar mijn laptop: <plak hier de URL>
```

Ontbreekt er iets, zoals Git of de GitHub-tool `gh`? Dat is normaal. Vraag dan:

```text
Installeer wat er ontbreekt en help me aanmelden bij GitHub.
```

Open daarna Claude Code in de map van je project.

### 3. Maak je project duidelijk

```text
/setup
```

Je AI vraagt wat je wil maken en wat een eerste versie moet kunnen. Samen kiezen jullie een platform, bouwstenen en een manier om gegevens te bewaren. Het resultaat is het ontwerpdocument `PROJECT_OVERVIEW.md`.

### 4. Zet GitHub klaar

```text
/bootstrap-github
```

Vraag daarna aan je AI om bij te houden hoe je project in elkaar zit:

```text
Lees PROJECT_OVERVIEW.md en werk CLAUDE.md bij met de gekozen bouwstenen en de commando's om te bouwen en te testen. Zet er geen lijst in van wat getest moet worden. Maak het bestand aan als het nog niet bestaat. Schrijf nog geen applicatiecode.
```

### 5. Maak een lijst taken

```text
/create-issues Kijk in PROJECT_OVERVIEW.md. Maak issues aan om de eerste versie van deze app te realiseren.
```

### 6. Laat je AI eraan werken

Begin met de eerste twee nummers die je AI bij de vorige stap teruggaf. Zo zie je snel een resultaat:

```text
/work-issues 1 2
```

Bij een website zet je AI met die twee issues de basis en de publicatie op. Daarna gaat elke wijziging die in je app komt, vanzelf online.

### 7. Werk verder

Bekijk het resultaat, en start dan een nieuwe reeks met de volgende nummers:

```text
/work-issues 3 4 5
```

Wil je iets anders of verbeteren? Maak er nieuwe issues van met `/create-issues`.

## De skills

| Skill | Wat doet ze? | Wanneer gebruik je ze? |
|---|---|---|
| `/setup` | Maakt je project duidelijk, helpt keuzes maken en schrijft `PROJECT_OVERVIEW.md`. | Eén keer, helemaal in het begin. |
| `/bootstrap-github` | Zet sjablonen en labels voor issues en pull requests klaar op GitHub. | Eén keer, na `/setup`. |
| `/create-issues` | Maakt van een paar zinnen een of meer goed omschreven taken. | Telkens als je iets wil toevoegen of als er iets fout gaat. |
| `/work-issues` | Werkt een reeks issues af, van nieuwe branch tot samenvoegen in je app. | Telkens als je AI aan je app mag werken. |
| `/work-issue` | Werkt één issue uit, inclusief testen. | Meestal niet zelf: `/work-issues` roept deze op. |
| `/cleanup` | Ruimt branches op en sluit afgewerkte issues. | Meestal niet zelf: `/work-issues` roept deze op. |
| `/discuss` | Laat je overleggen met je AI, zonder dat die iets aanpast. | Als je eerst wil nadenken. |

In `CLAUDE.md` houdt je AI bij hoe je project in elkaar zit. Dat bestand maak je met de vraag uit stap 4.

## Wat zit er in deze map?

| Map of bestand | Inhoud |
|---|---|
| `.claude/skills/` | De skills. |
| `.claude/settings.json` | Wat je AI zonder te vragen mag doen. |
| `.claude/rules/` | Vaste regels voor je AI, bijvoorbeeld om commando's eenvoudig te houden. |
| `.agents/skills/` | Zelfstandige Codex-versies van de skills, met eigen sjablonen. |
| `AGENTS.md` | Vaste projectinstructies voor Codex. |
| `.codex/` | Codex-instellingen voor sandbox, automatische beoordeling en commandoregels. |
| `docs/CODEX.md` | Beginnen met Codex, toestemmingen en de eerste praktijktest. |
| `design-system/` | De vormgeving: kleuren, lettertypes en componenten. |
| `LICENSE` | De licentie van dit project. |

## Wat mag je AI zonder te vragen?

Dit gedeelte gaat over **Claude Code**. Voor Codex gelden de [toestemmingen in de Codex-handleiding](docs/CODEX.md#hoe-de-toestemmingen-werken).

Terwijl `/work-issues` loopt, wil je niet dat alles stilvalt omdat je AI op een toestemming wacht. Daarom bevat `.claude/settings.json` een beperkte lijst:

- **Mag zonder vragen:** bestanden in dit project aanpassen, de gewone Git- en GitHub-commando's, en de commando's om je app te installeren, te bouwen en te testen.
- **Mag nooit:** de geschiedenis op GitHub overschrijven (`git push --force`), niet-opgeslagen werk weggooien (`git reset --hard`, `git clean`) of je repo verwijderen.
- **Al de rest:** daarvoor vraagt je AI eerst toestemming.

Claude Code vraagt de eerste keer of je deze map vertrouwt, met een waarschuwing over deze lijst. De standaardkeuze is daar **No, exit**: kies met de pijltjestoets **Yes, I trust this folder**, anders gelden deze instellingen niet. Dat zijn ook de enige instellingen die je moet kennen: de lijst pas je aan door het je AI te vragen.

## Goed om te weten

- **Er gaat regelmatig iets mis, en dat is geen probleem.** Blijf praten met je AI en zoek samen naar een oplossing.
- **Bewaar geen leerlinggegevens in een publiek project.** Namen, punten en andere persoonsgegevens horen niet in een publieke repo of op een publieke site.
