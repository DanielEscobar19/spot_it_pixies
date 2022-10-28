import Layout from './Layout'
import './css/gameRoom/gameRoom.css'
import './css/common/common.css'

import { useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';

export default function GameRoom() {
  return (
    <>
    <Layout/>
        <section class="container-principal">
            <section id="seccion-izquierda">
                <section id="subseccion-nombres">
                    <div class="tarjeta-nombres">
                        <div class="nombre-jugador">
                            <p class="h6">Jugador 1</p>
                        </div>
                        <div class="numero-jugador"><p class="h6">1</p></div>
                    </div>
                    <div class="tarjeta-nombres">
                        <div class="nombre-jugador">
                            <p class="h6">Jugador 1</p>
                        </div>
                        <div class="numero-jugador"><p class="h6">1</p></div>
                    </div>
                    <div class="tarjeta-nombres">
                        <div class="nombre-jugador">
                            <p class="h6">Jugador 1</p>
                        </div>
                        <div class="numero-jugador"><p class="h6">1</p></div>
                    </div>
                    <div class="tarjeta-nombres">
                        <div class="nombre-jugador">
                            <p class="h6">Jugador 1</p>
                        </div>
                        <div class="numero-jugador"><p class="h6">1</p></div>
                    </div>
                    <div class="tarjeta-nombres">
                        <div class="nombre-jugador">
                            <p class="h6">Jugador 1</p>
                        </div>
                        <div class="numero-jugador"><p class="h6">1</p></div>
                    </div>
                    <div class="tarjeta-nombres">
                        <div class="nombre-jugador">
                            <p class="h6">Jugador 1</p>
                        </div>
                        <div class="numero-jugador"><p class="h6">1</p></div>
                    </div>
                    <div class="tarjeta-nombres">
                        <div class="nombre-jugador">
                            <p class="h6">Jugador 1</p>
                        </div>
                        <div class="numero-jugador"><p class="h6">1</p></div>
                    </div>
                    <div class="tarjeta-nombres">
                        <div class="nombre-jugador">
                            <p class="h6">Jugador 1</p>
                        </div>
                        <div class="numero-jugador"><p class="h6">1</p></div>
                    </div>
                </section>
                <section id="subseccion-eventos">
                    <div id="cuadro-eventos" class="overflow-auto">
                        <div id="titulo-eventos">
                            <p class="h4">Events</p>
                        </div>
                        <div id="textbox-eventos" class="overflow-auto">
                            <p class="h6 evento"> El Jugador 1 realizó x acción</p>
                            <p class="h6 evento"> El Jugador 2 realizó x acción</p>
                            <p class="h6 evento"> El Jugador 3 realizó x acción</p>
                            <p class="h6 evento"> El Jugador 4 realizó x acción</p>
                            <p class="h6 evento"> El Jugador 5 realizó x acción</p>
                            <p class="h6 evento"> El Jugador 6 realizó x acción</p>
                            <p class="h6 evento"> El Jugador 7 realizó x acción</p>
                            <p class="h6 evento"> El Jugador 8 realizó x acción</p>
                            <p class="h6 evento"> El Jugador 9 realizó x acción</p>
                            <p class="h6 evento"> El Jugador 10 realizó x acción</p>
                        </div>
                    </div>
                </section>
            </section>
            <section id="seccion-derecha">
                <a class="btn " href="../views/Leaderboard/Leaderboard.html">Simulacion victoria</a>
                <section id="subseccion-circulos">
                    <div class="columna-circulos">
                        <p class="h2"> Top of the well</p>
                        <div class=" rounded-circle circulo-carta">
                            <div class="fila-imagenes-laterales">
                                    <img src="../img/common/estrella.png" class="imagen-carta"/>
                            </div>
                            <div class="fila-imagenes">
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                            </div>
                            <div class="fila-imagenes-centro">
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                            </div>
                            <div class="fila-imagenes">
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                            </div>
                            <div class="fila-imagenes-laterales">
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                            </div>
                        </div>
                        <p class="h4"> Cartas restantes: 15</p>
                    </div>
                    <div class="columna-circulos">
                        <p class="h2"> Nombre </p>
                        <div class="circulo-carta rounded-circle">
                            <div class="fila-imagenes-laterales">
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                            </div>
                            <div class="fila-imagenes">
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                            </div>
                            <div class="fila-imagenes-centro">
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                            </div>
                            <div class="fila-imagenes">
                                <img src="../img/common/estrella.png" class="imagen-carta"/> 
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                            </div>
                            <div class="fila-imagenes-laterales">
                                <img src="../img/common/estrella.png" class="imagen-carta"/>
                            </div>
                        </div>
                        <p class="h4" style="opacity: 0.0;"> Cartas restantes: 15</p>
                    </div>
                </section>
            </section>
        </section>
        </>
  );
}
