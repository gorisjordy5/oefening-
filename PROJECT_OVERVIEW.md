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
- Exacte houtsoort, constructie, werkmaten en Blum-beslag worden later bij de technische uitwerking bepaald. Montagegegevens volgen dan de documentatie van het gekozen beslag.

## Publicatie
Via GitHub Pages, bereikbaar met een gewone weblink. Bij de bouw wordt een workflow ingericht zodat elke merge naar de hoofdbranch `main` de site automatisch publiceert. De eerste versie heeft geen backend nodig.
