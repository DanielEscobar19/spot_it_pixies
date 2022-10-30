import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import Timer from '../components/Timer'
import '../css/pages/gameRoom.css'
import '../css/common/common.scss'


import cards from "../cards.json"
import arrayShuffle from 'array-shuffle';


export default function GameRoom() {
    const[shuffledCards, setShuffledCards] = useState(() => {
        let unshuffledCards = cards;
        for (let i = 0; i < unshuffledCards.length; i += 1) {
            unshuffledCards[i].simbolos = arrayShuffle(unshuffledCards[i].simbolos);
        }
        return arrayShuffle(unshuffledCards);
    });
    const [activarAnimacion, setActivarAnimacion] = useState(false);
    const [cartaActualOponente, setCartaActualOponente] = useState(56);
    const [cartaActualJugador, setCartaActualJugador] = useState(0);
    const[cantidadCartasJugador, setCantidadCartasJugador] = useState(56);
    const [acertoSimbolo, setAcertoSimbolo] = useState(true);
    const [puedeElegirCarta, setPuedeElegirCarta] = useState(true);

    

    useEffect(() => {
        setAcertoSimbolo(acertoSimbolo => {
            if (acertoSimbolo == false) {
                alert("Elegiste un símbolo incorrecto, tienes un cooldown de 5 segundos");
                    setPuedeElegirCarta(false);
                    setTimeout(
                        ()=>{
                            alert("Ya el cooldown ha terminado, puedes elegir un simbolo");
                            setPuedeElegirCarta(true);
                        },
                        5000
                    );
            }
            else {
                return acertoSimbolo;
            }
        });
    }, [acertoSimbolo])

    



    function verificarRelacion(numeroSimbolo, simbolosCartaOponente) {
        let simboloEncontrado = false;
        for (let i = 0; i < simbolosCartaOponente.length; i += 1) {
            if (numeroSimbolo == simbolosCartaOponente[i]) {
                setActivarAnimacion(true);
                simboloEncontrado = true;
                setAcertoSimbolo(true);
                setTimeout(function () {
                    setCartaActualOponente(cartaActualJugador);
                    setCartaActualJugador(cartaActualJugador+1);
                    setCantidadCartasJugador(cantidadCartasJugador -1);
                    setActivarAnimacion(false);
                }, 1200);
                break;
            }
        }
        console.log("simbolo encontrado:" + simboloEncontrado);
        if (simboloEncontrado == false) {
            setAcertoSimbolo(false);
        }
    }

    function timeoutEleccion(index) {
        if (puedeElegirCarta) {
            verificarRelacion(shuffledCards[cartaActualJugador].simbolos[index], shuffledCards[cartaActualOponente].simbolos);
        }
        else {
            alert("Tienes un cooldown de 5 segundos");
        }
    }


  return (
    <>
    <Layout/>
        <section className="container-principal">
            <section id="seccion-izquierda">
                <section id="subseccion-nombres">
                    <div className="tarjeta-nombres">
                        <div className="nombre-jugador">
                            <p className="h6">Jugador 1</p>
                        </div>
                        <div className="numero-jugador"><p className="h6">1</p></div>
                    </div>
                </section>
                <section id="subseccion-eventos">
                    <div id="cuadro-eventos" className="overflow-auto">
                        <div id="titulo-eventos">
                            <p className="h4">Events</p>
                        </div>
                        <div id="textbox-eventos" className="overflow-auto">
                            <p className="h6 evento"> El Jugador 1 realizó x acción</p>
                        </div>
                    </div>
                </section>
            </section>
            <section id="seccion-derecha">
                <a className="btn " href="../views/Leaderboard/Leaderboard.html">Simulacion victoria</a>
                <section id="subseccion-circulos">
                    <div className="columna-circulos">
                        <p className="h2"> Nombre Jugador</p>
                        <div id={activarAnimacion ? "carta-izquierda-slide" : "carta-izquierda-spawn"} className=" rounded-circle circulo-carta">
                            <div className="fila-imagenes-laterales">
                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[0]}.png`} 
                                    onClick={function(e) {
                                        timeoutEleccion(0);      
                                    }}
                                    className="imagen-carta"/>
                            </div>
                            <div className="fila-imagenes">

                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[1]}.png`} 
                                onClick={function(e) {
                                    timeoutEleccion(1);         
                                }}
                                className="imagen-carta"/>

                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[2]}.png`} 
                                onClick={function(e) {
                                    timeoutEleccion(2);         
                                  }}
                                className="imagen-carta"/>

                            </div>
                            <div className="fila-imagenes-centro">

                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[3]}.png`}
                                 onClick={function(e) {
                                    timeoutEleccion(3);           
                                  }}
                                className="imagen-carta"/>

                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[4]}.png`} 
                                onClick={function(e) {
                                    timeoutEleccion(4); 
                                  }} 
                                className="imagen-carta"/>

                            </div>
                            <div className="fila-imagenes">

                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[5]}.png`} 
                                onClick={function(e) {
                                    timeoutEleccion(5);       
                                }}
                                className="imagen-carta"/>

                                <img src= {`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[6]}.png`} 
                                onClick={function(e) {
                                    timeoutEleccion(6); 
                                }} 
                                className="imagen-carta"/>

                            </div>
                            <div className="fila-imagenes-laterales">

                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[7]}.png`} 
                                onClick={function(e) {
                                    timeoutEleccion(7);         
                                }}
                                className="imagen-carta"/>
                            </div>
                        </div>

                        <p className="h4"> Cartas restantes: {cantidadCartasJugador}</p>
                    </div>
                    <div className="columna-circulos">
                        <p className="h2"> Tope de la pila </p>
                        <div className=" rounded-circle circulo-carta">
                            <div className="fila-imagenes-laterales">
                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[0]}.png`} className="imagen-carta"/>
                            </div>
                            <div className="fila-imagenes">
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[1]}.png`} className="imagen-carta"/>
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[2]}.png`} className="imagen-carta"/>
                            </div>
                            <div className="fila-imagenes-centro">
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[3]}.png`} className="imagen-carta"/>
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[4]}.png`} className="imagen-carta"/>
                            </div>
                            <div className="fila-imagenes">
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[5]}.png`} className="imagen-carta"/>
                                <img src= {`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[6]}.png`} className="imagen-carta"/>
                            </div>
                            <div className="fila-imagenes-laterales">
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[7]}.png`} className="imagen-carta"/>
                            </div>
                        </div>
                        <p className="h4" style={{opacity: 0.0}}> Cartas restantes: 15</p>
                    </div>
                </section>
            </section>
        </section>
        </>
  );
}
