# Spot It - Team Pixies

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/DanielEscobar19/spot_it_pixiese">
    <img src="resources/Spotit_pixies.jpg" alt="Logo" width="500" height="200">
  </a>

  <h2 align="center">Spot it! The Well</h3>
  <br>
  <h3 align="center">
  Repositorio para el proyecto grupal del curso de desarrollo web CI-0137.
  </p>
  <p align="center">
    <br />
    <a href="https://png.pngitem.com/pimgs/s/207-2073499_translate-platform-from-english-to-spanish-work-in.png">View Demo</a>
    ·
    <a href="https://github.com/DanielEscobar19/spot_it_pixies/issues">Report Bug</a>
    ·
    <a href="https://github.com/DanielEscobar19/spot_it_pixies/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla De Contenidos</summary>
  <ol>
    <li>
      <a href="#acerca-del-proyecto">Acerca Del Proyecto</a>
      <ul>
        <li><a href="#adaptaciones">Adaptaciones</a></li>
        <!--
        <li><a href="#librerias">Librerias</a></li> -->
      </ul>
    </li>
    <li>
      <a href="#reglas">Reglas</a>
    </li>
    <!-- <li><a href="#uso">Uso</a></li>
    -->
    <li><a href="#mapa-del-sitio">Mapa del Sitio</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#autores">Autores</a></li>
    <li><a href="#otras rutas">Otras rutas</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Acerca Del Proyecto

En este proyecto se desarrolla un mini juego, El Pozo (The Well), del juego Spot it. Se requiere contar con la capacidad de jugar en línea entre dos a ocho jugadores al mismo tiempo de modo que un jugador tenga el rol de anfitrión de la sesión y ésta cuente con un código que permite a los demás jugadores, invitados a participar en la misma partida.

El juego debe ser ejecutado mediante una plataforma web (servidor), respetando las reglas originales del juego; en adición, se espera implementar al menos dos adaptaciones extra que agregan funcionalidades (audiovisuales, cambio de reglas u otras) distintas a las que ya cuenta éste.

El sistema de juego debe contar con al menos la pantalla de créditos, ayuda, leaderboard (que contempla manejar una base de datos para registrar el ranking), salas de espera (anfitrión e invitados) y las pantallas principales del juego.

<p align="right"><a href="#spot-it---team-pixies">↑ volver al inicio</a></p>

### Adaptaciones

1. El contador de tiempo para las partidas, que sirve como un marcador de “mejor tiempo” para un jugador en el leaderboard y como contador para el chat de eventos.
   - Ejemplo - Durante la partida.  
   ![img](design/img/adap_MatchTime.jpg)
   - Ejemplo - Al final de la partida.  
   ![img](design/img/adap_MatchDuration.jpg)
   - Ejemplo - Leaderboard.  
   ![img](design/img/adap_BestTime.png)

2. Efectos de sonido y/o animación en el nombre del jugador, cuando "empareja" una carta.
   - Ejemplo - antes de emparejar.  
   ![img](design/img/adap_Spotit-Before.jpg)
   - Ejemplo - después de emparejar.  
   ![img](design/img/adap_Spotit-After.jpg)

3. Chat de eventos que marca un “historial” de los emparejamientos de cartas.
   - Ejemplo - Chat de eventos, incluye el uso del tiempo.  
   ![img](design/img/adapt_eventsChat.png)

<p align="right"><a href="#spot-it---team-pixies">↑ volver al inicio</a></p>

<!-- 
### Librerias

Librerias y frameworks usados para construir el proyecto:

[![Bootstrap][Bootstrap.com]][Bootstrap-url] (e.g)

<p align="right"><a href="#spot-it---team-pixies">↑ volver al inicio</a></p>
-->
<!-- GETTING STARTED -->
## Reglas

Coloca una carta boca abajo en el centro de la mesa y reparte el resto de las cartas boca abajo entre los jugadores. Todos los jugadores al mismo tiempo tratarán de encontrar un par de símbolos que se repitan. Si encuentras el símbolo lo dices en voz alta y la descartas en la pila central. Esta será la carta que utilizarás para buscar el próximo símbolo. El juego continúa hasta que uno de los jugadores se queda sin cartas. El primero en lograrlo gana el juego.

### Cartas

Spot it! Consta de 55 cartas, con 8 símbolos por carta de los 50 disponibles, solo hay un símbolo idéntico en común entre cada carta.

<!-- USAGE EXAMPLES
## Uso

<img src="resources/under-construction.png" alt="under construction" width="200" height="75">
-->

<!--SITEMAP-->
## Mapa Del Sitio

<img src="mapa del sitio/spotit_map.svg"  style="background-color:#fff" alt="mapa del sito spot it">

<p align="right"><a href="#spot-it---team-pixies">↑ volver al inicio</a></p>

<!-- ROADMAP -->
## Roadmap

- [x] Entregable 1
  - [x] Agregar Sketchs
  - [x] Agregar Mapa del sito
  - [x] Agregar readme.md
  - [x] Adaptaciones
  - [x] Agregar wireframes
  - [x] Agregar Acuerdos de diagramas
  - [x] Agregar readme.md de design
- [-]Entregable 2
- [-]Entregable 3

<!-- AUTORES -->
## Autores

| Nombre               | Contacto                        |
| :---                 | :---                            |
| Fabián Orozco        | fabian.orozcochaves@ucr.ac.cr   |
| Daniel Escobar       | daniel.escobargiraldo@ucr.ac.cr |
| Gabriel Bonilla      | gabriel.bonillarivera@ucr.ac.cr |
| Manuel Arroyo        | manuel.arroyoportilla@ucr.ac.cr |

## Otras rutas

- [Link del proyecto en github](https://github.com/DanielEscobar19/spot_it_pixies)  
- [Link del prototipo en figma](https://www.figma.com/proto/7EKI0R0xJH1RVGjZheae10/Proyecto_Web?node-id=16%3A31&scaling=scale-down&page-id=0%3A1&starting-point-node-id=16%3A31&show-proto-sidebar=1)

<p align="right"><a href="#spot-it---team-pixies">↑ volver al inicio</a></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/badge/Contributors-4-green?style=for-the-badge
[contributors-url]: https://github.com/DanielEscobar19/spot_it_pixies/graphs/contributors
[issues-shield]: https://img.shields.io/badge/Issues-0-orange?style=for-the-badge
[issues-url]: https://github.com/DanielEscobar19/spot_it_pixies/issues

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com