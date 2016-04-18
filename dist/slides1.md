***
!![Achtergrondafbeelding](media/Picture1.png)

# Webtechnologie 2

***
# Waarom krijg je dit vak?

![300](media/Afbeelding1.png)

***
# Weekindeling 

Week 1: 	Inleiding Javascript
Week 2:	    Inleiding Javascript deel 2
~~Week 2a:	Meivakantie~~
Week 3: 	Case
Week 4: 	Javascript interactie
Week 5: 	Javascript mobile
Week 6: 	Inlooples
Week 7: 	Beoordeling 
Week 8:	    Toets

***
# Eindopdracht

Case week 3
Opdracht week 5

# Kennistoets

Inhoud sheets (inclusief notities)
Documenten op Blackboard

***
# WAAROM JAVASCRIPT?

![250](https://media.giphy.com/media/ffJiLLtCk5Am4/giphy.gif)

***
# Voorbeelden van JS

Eenvoudig
⇨ [Inlogformulieren controleren](http://www.facebook.com)
⇨ [Autocomplete](http://www.google.com)
⇨ [Klok](http://randomibis.com/coolclock/)
⇨ [Lightbox](http://www.jacklmoore.com/colorbox/example1/)
Complex
⇨ [Photogallery (3D)](http://www.jqueryscript.net/demo/3D-Rotating-Carousel-Plugin-with-jQuery-three-js-Image-Gallery-Threejs/)
⇨ [3D Games](http://www.babylonjs.com/)
⇨ [Interactieve film](http://www.jacktorrancetrip.com/)
⇨ [Complexe websites](http://enfantsterrible.com/) [2](http://michelbergerbooze.com/)

***
# Hoe gebruik je JS?

We maken een nieuw HTML bestand: **index.html**
In de *body* van index.html type je het volgende:

```html
<script src="script.js"></script>
```

Maak ook een JavaScript bestand, **script.js**
met deze code:

```javascript
document.body.innerHTML = "Hello!";
```
***
Hello!

```javascript
document.body.innerHTML = "Hello!";
```
***
## Hello!

```javascript
document.body.innerHTML = "<h1>Hello!</h1>";
```
***
## Hello!

HTML:
```html
<body>
&nbsp;&nbsp;<script src="script.js"></script>
</body>
```

JS:
```javascript
document.body.innerHTML = "<h1>Hello!</h1>";
```
***
##red Hello!

HTML:
```html
<body>
&nbsp;&nbsp;<div id="mijnDiv"></div>
&nbsp;&nbsp;<script src="script.js"></script>
</body>
```

JS:
```javascript
document.getElementById("mijnDiv").innerHTML = "<h1>Hello!</h1>";
 &nbsp;
document.getElementById("mijnDiv").style.backgroundColor = "red"; 
```
***
# Console

Chrome:
**Ctrl+Shift+J** (Win)
**⌘+Shift+J** (Mac)

FireFox:
**Ctrl+Shift+K** (Win)
**⌘+Shift+K** (Mac)
***
# Console log

```javascript
console.log("Hello!");
```
***
# Variabelen

Elke keer dat je even tijdelijk iets wil bewaren in je script, maak je een variabele. 

'iets' kan zijn:
⇨ Een getal
⇨ Tekst
⇨ Een datum
⇨ Een afbeelding
⇨ De naam van een HTML element
⇨ Enz.
***
Een variabele aanmaken:

```javascript

```

Een waarde in die variabele stoppen:

```javascript

```

De variabele gebruiken om iets te doen:

```javascript

```
***
# Opdracht 1

⇨ Maak twee variabelen

⇨ Sla in elke variabele een getal op

⇨ Maak variabele 1 gelijk aan variabele 1 plus variabele 2

⇨ Toon variabele 1 in de console

```javascript


```
***
Rekenen met variabelen:

```javascript
var appels = 3;

var peren = 5;

appels = appels + peren;
```
***
# Prompt

```javascript
var naam = prompt('Hoe heet je?');

console.log(naam);
```
***
# Opdracht 2: Rekenmachine

⇨ Maak twee variabelen

⇨ Vraag (prompt) bij elke variabele om een getal

⇨ Vermenigvuldig de twee variabelen, en sla het resultaat op in variabele 1
**Tip: keer = &#42;**

⇨ Toon variabele 1 in de console
***
# Als dit waar is,

# doe dan dat
***
```javascript
if (dit waar is) {
 &nbsp;&nbsp;doe dan dat
}
```
***
```javascript
if (dit waar is) {
 &nbsp;&nbsp;doe dan dat
} else {
&nbsp;&nbsp;doe dan dat
}
```
***
```javascript
var getal = 3;
 &nbsp;
if (getal > 4) {
&nbsp;&nbsp;console.log('A');
} else {
&nbsp;&nbsp;console.log('B');
}
```
***
# if
```javascript
if (a > b)   // groter dan

if (a < b)   // kleiner dan
if (a == b)  // gelijk aan (twee = tekens!)
if (a != b)  // niet gelijk aan
if (a >= b)  // groter dan of gelijk aan
if (a <= b)  // kleiner dan of gelijk aan
```
***
# Opdracht 3: Repelsteeltje

⇨ Prompt om je naam en sla op in een variabele

⇨ Als de variabele gelijk is aan "Repelsteeltje", toon dan "Hoera!" in de console

⇨ Zoniet, toon dan "Fout!"
***
##red Hello!

HTML:
```html
<body>
&nbsp;&nbsp;<div id="mijnDiv"></div>
&nbsp;&nbsp;<script src="script.js"></script>
</body>
```

JS:
```javascript
document.getElementById("mijnDiv").innerHTML = "<h1>Hello!</h1>";
 &nbsp;
document.getElementById("mijnDiv").style.backgroundColor = "red"; 
```
***
![100](media/smile.jpg)

HTML:
```html
<img id="plaatje">
```

JS:
```javascript
var titel = document.getElementById("plaatje");
 &nbsp;
titel.src = "smile.jpg";
```
***
# Opdracht 4: Huiswerk

⇨ Maak een kopie van de bestanden van opdracht 3

⇨ Maak een img-tag met een id in de body van je HTML

⇨ Als de variabele gelijk is aan "Repelsteeltje", toon dan een plaatje

⇨ Zoniet, toon dan een ander plaatje

⇨ Google hoe je met JS de backgroundColor van de **body** verandert

⇨ Maak bij een juist antwoord de pagina groen, anders rood
***
# Huiswerk

⇨ Opdracht 4

⇨ Artikel 'Style Guide' op BB

