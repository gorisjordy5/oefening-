# Werken met Codex

Dit is een template waarmee collega's zonder programmeerervaring apps maken. Praat in de taal van de gebruiker, kort en zonder jargon. Leg technische keuzes eenvoudig uit en geef een aanbeveling. Stel bij het verkennen van een project één vraag tegelijk.

## Projectcontext

- Lees `PROJECT_OVERVIEW.md` als het bestaat. Daar staan doel, eerste versie, gekozen frameworks, opslag en publicatie.
- Gebruik het design system in `design-system/README.md`, tenzij het projectoverzicht iets anders kiest.
- De Codex-skills zijn zelfstandige bestanden in `.agents/skills/`. De Claude-werkwijze in `.claude/` blijft apart: pas die alleen aan als de gebruiker dat vraagt.
- Lees en volg `.agents/commandos.md` bij het uitvoeren van commando's, ook als subagent.

## Werkwijze

- `$setup` bespreekt het project en schrijft `PROJECT_OVERVIEW.md`, zonder applicatiecode.
- `$bootstrap-github` zet GitHub klaar. Werk daarna dit bestand bij met de gekozen bouwstenen en concrete build- en testcommando's, met behoud van deze afspraken. Zet er geen lijst in van wat getest moet worden: testen horen bij elk issue.
- `$create-issues` maakt concrete GitHub-taken. Applicatiewijzigingen verlopen normaal via een issue en `$work-issue` of `$work-issues`.
- `$work-issues` gebruikt voor elk issue een nieuwe subagent met een eigen context, zonder de conversatiegeschiedenis te kopiëren. Geef de werkmap, skillpaden, branch en alleen noodzakelijke eerdere resultaten mee. Werk na elkaar in dezelfde checkout. De hoofdagent coördineert en ontvangt korte resultaten. Dit is expliciete toestemming voor de in die skill beschreven delegatie.
- Maak nieuwe branches met `codex/` als voorvoegsel. Commit alleen bestanden die bij het werk horen. Behoud bestaande wijzigingen van de gebruiker.
- Een opdracht om issues uit te werken omvat de commits, push, pull request, controles, merge na geslaagde controles en cleanup uit de skill. Een opdracht om alleen te bespreken of issues te maken omvat die stappen niet.
- `$discuss` is uitsluitend overleg: niets wijzigen tot de gebruiker duidelijk tot actie wil overgaan.

## Kwaliteit en gegevens

- Gebruik de gekozen frameworks en schrijf relevante tests voor gewijzigde werking. Test zichtbare handelingen ook met de echte app, volgens de issue-skill.
- Rapporteer alleen echt uitgevoerde controles. Merge nooit met falende controles of onopgeloste conflicten.
- Bewaar geen geheimen, wachtwoorden of echte leerlinggegevens in code, issues of voorbeeldbestanden.
- Voer nooit force-pushes, `git reset --hard`, `git clean` of het verwijderen van de repository uit, ook niet via een andere argumentvolgorde of tool.

## Toestemmingen

De projectinstellingen staan in `.codex/config.toml`; uitleg en beperkingen in `docs/CODEX.md`. Organisatiebeleid en de actieve sessie kunnen strenger zijn. Wijzig zelf geen beveiligingsinstellingen of regels om een blokkade te omzeilen. Meld een geweigerde noodzakelijke handeling en de concrete reden.

## Projectspecifieke aanvullingen

- Doel: een interactieve cursus in slidevorm voor leerlingen van de derde graad houtbewerking, van materiaalkennis tot het maken en afwerken van een nachttafel.
- Platform en bouwstenen: een website met React en Vite, zodat leerlingen via een gewone weblink de cursus stap voor stap kunnen doorlopen.
- Opslag: de laatst bekeken stap en afgewerkte stappen blijven in het browsergeheugen op dezelfde computer en in dezelfde browser. Geen accounts, backend of persoonsgegevens in de eerste versie.
- Vormgeving: gebruik `design-system/` en de afspraken in `design-system/README.md`.
- Publicatie: GitHub Pages; bij het aanmaken van de app wordt automatische publicatie na elke merge naar `main` ingericht.
- Projecteisen: een nachttafel met één deur en één lade, bij voorkeur met Blum-beslag, maximaal 500 mm breed × 500 mm diep × 700 mm hoog. Exacte constructie en beslagkeuze volgen bij de technische uitwerking, op basis van de bijbehorende fabrikantdocumentatie.
- Ontwikkelen, testen en bouwen: React en Vite, met Vitest en Playwright. Node moet voldoen aan `engines` in `package.json`; CI gebruikt de recentste Node 22. Installeren: `npm ci`; ontwikkelen: `npm run dev`; werkingstest: `npm test`; Chromium installeren: `npx playwright install --no-shell chromium`; browsertests: `npm run test:e2e`; productiebuild: `npm run build`. Er is geen formatter of linter. Lokaal zijn dezelfde Vite-, Vitest- en Playwright-entrypoints met het absolute Node-pad uitgevoerd wegens het verouderde zoekpad in de Windows-sessie; `npm ci` is rechtstreeks geverifieerd. Zie README voor de omgeving en resultaten.
