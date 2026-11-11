# Stap voor stap een nachttafel maken

## Doel
Een eenvoudige, interactieve cursus in slidevorm voor het project houtbewerking. Leerlingen doorlopen het maken van een nachttafel stap voor stap, van materiaalkennis tot de volledige uitvoering en afwerking.

## Doelgroep
Leerlingen van de derde graad houtbewerking.

## Eerste versie
- Overzichtelijke hoofdstukken met uitleg, afbeeldingen en korte opdrachten.
- Materiaalkennis: hout en plaatmateriaal.
- Voorbereiding: werktekening, afmetingen en materiaallijst.
- Gereedschappen, machines en veilig werken.
- Onderdelen aftekenen, zagen en verbinden.
- Kast, deur en lade monteren, beslag plaatsen, schuren en afwerken.
- Vorige en volgende stap, een hoofdstukoverzicht en zichtbare voortgang.
- Automatisch hervatten bij de laatst bekeken stap op dezelfde computer en in dezelfde browser.

## Nog niet
- Leerlingenaccounts en voortgang delen tussen computers.
- Een leerkrachtendashboard of centrale puntenregistratie.
- Andere meubelprojecten.

## Platform
Een website die leerlingen via een gewone weblink openen op hun vaste computer. Installatie door leerlingen is niet nodig.

## Frameworks en bouwstenen
React met Vite voor de interactieve cursus, stapnavigatie en lokale voortgang. De cursus krijgt een presentatieachtige opbouw binnen een website. Exacte pakketversies worden bij de uitvoering gekozen.

## Opslag
Alleen de laatst bekeken stap en afgewerkte stappen worden lokaal in het browsergeheugen bewaard, zonder account. De voortgang is alleen beschikbaar op hetzelfde toestel in dezelfde browser en verdwijnt als het browsergeheugen wordt gewist. Er worden geen namen, punten of andere persoonsgegevens opgeslagen of in de publieke repository opgenomen.

## Vormgeving
Gebruikt het design system in `design-system/`. De gebruiker kan later een ander ontwerp laten maken en het huidige laten vervangen.

## Eisen
- Een kastje met een deur en met één schuif erin verwerkt, liefst van het merk Blum voor het beslag.
- Maximale buitenmaten: 500 mm breed × 500 mm diep × 700 mm hoog.
- Onthouden waar de leerling zat; leerlingen blijven dezelfde computer gebruiken.
- Het uitgewerkte referentieontwerp uit issue #8 is een keuze voor controle door de leerkracht: berkenmultiplex, kast/fronten 18 mm, ladebak 16 mm en opgelegde rug 6 mm. Buitenmaat 480 × 452 × 650 mm inclusief 2 mm afstand achter de fronten; met knoppen van maximaal 30 mm uitsteek is de diepte maximaal 482 mm.
- Kast: stompe gelijmde en geschroefde naden, binnenbreedte 444 mm, kastdiepte 426 mm. Deur 476 × 446, ladefront 476 × 198; 2 mm voegen. Schot bovenzijde op 450 mm. Ladebak 419 breed × 400 diep × 116 hoog, bodem onderkant op 475 mm.
- Beslag: één set Blum STANDARD 230M4000 zonder extra BLUMOTION, twee scharnieren 71B3550 met twee platen 173H7100. Officiële bronlinks en raadpleegdatum staan in `src/design.js`; aanzichten, zaaglijst, verbindingen en controleopdrachten in `src/LessonContent.jsx`. Het zijn eigen tekeningen. De originele fabrikantdocumenten en proefmontage met werkelijk geleverd materiaal blijven leidend.
- De volledige cursus telt 13 stappen. De uitvoeringslessen in `src/workshop.js` en eigen schema’s in `src/WorkshopLesson.jsx` behandelen werkplek, aftekenen, zagen, verbindingen, haakse kast, ladegeleiders, deur, ladefront, schuren/blanke meubellak en eindcontrole. Machinehandelingen vragen lokale instructie en toestemming; productinstellingen komen uit het gekozen productblad. Opdrachten hebben bespreekcriteria zonder antwoord- of puntenopslag.

## Publicatie
Via GitHub Pages, bereikbaar met een gewone weblink. Bij de bouw wordt een workflow ingericht zodat elke merge naar de hoofdbranch `main` de site automatisch publiceert. De eerste versie heeft geen backend nodig.
