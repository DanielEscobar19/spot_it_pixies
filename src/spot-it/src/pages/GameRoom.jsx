import React, {useState, useEffect, useRef} from 'react';
import { useLocation } from "react-router-dom";
import Layout from './Layout'
import Timer from '../components/Timer'
import '../css/pages/gameRoom.css'
import '../css/common/common.scss'


import cards from "../cards.json"
import arrayShuffle from 'array-shuffle';
import InGameLeaderBoard from '../components/InGameLeaderBoard';
import GameChat from '../components/GameChat';


export default function GameRoom(props) {
    const location = useLocation();
    console.log(location);
    const[shuffledCards, ] = useState(() => {
        let unshuffledCards = cards;
        for (let i = 0; i < unshuffledCards.length; i += 1) {
            unshuffledCards[i].simbolos = arrayShuffle(unshuffledCards[i].simbolos);
        }
        return arrayShuffle(unshuffledCards);
    });
    const [activarAnimacion, setActivarAnimacion] = useState(false);
    const [cartaActualOponente, setCartaActualOponente] = useState(56);
    const [cartaActualJugador, setCartaActualJugador] = useState(55);
    const [cantidadCartasJugador, setCantidadCartasJugador] = useState(2);
    const [initialTime, setInitialTime] = useState(new Date());
    const [finalTime, setFinalTime] = useState(new Date());
    
    // TODO: distribute cards through players and no the same amount to every player
    location.state.playersConnected.map((player) => {
        player.cardsRemaining = cantidadCartasJugador;
        return player;
    }) 
    const [acertoSimbolo, setAcertoSimbolo] = useState(true);
    const [puedeElegirCarta, setPuedeElegirCarta] = useState(true);

    useEffect(() => {
        setInitialTime(new Date());
    },[]);

    useEffect(() => {
        setAcertoSimbolo(acertoSimbolo => {
            if (acertoSimbolo === false) {
                    setPuedeElegirCarta(false);
                    setTimeout(
                        ()=>{
                            setPuedeElegirCarta(true);
                        },
                        5000
                    );
            }
            else {
                return acertoSimbolo;
            }
        });
    }, [acertoSimbolo]);

    useEffect(()=>{
        setCartaActualJugador( () => {
            if (cartaActualJugador == 57) {
                setFinalTime(new Date());
            }
            return cartaActualJugador;
        });
    },[cartaActualJugador]);

    function verificarRelacion(numeroSimbolo, simbolosCartaOponente) {
        let simboloEncontrado = false;
        for (let i = 0; i < simbolosCartaOponente.length; i += 1) {
            if (numeroSimbolo === simbolosCartaOponente[i]) {
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
        if (simboloEncontrado === false) {
            setAcertoSimbolo(false);
        }
    }

    function timeoutEleccion(index) {
        if (puedeElegirCarta) {
            verificarRelacion(shuffledCards[cartaActualJugador].simbolos[index], shuffledCards[cartaActualOponente].simbolos);
        }
    }


  return (
    <>
    <Layout/>
        <section className="container-principal">

            <section id="seccion-izquierda">
                
                <InGameLeaderBoard players={location.state.playersConnected}/>

                <GameChat actualPlayer={location.state.actualPlayer}/>
            </section>
            <section id="seccion-derecha">
                <section id="seccion-timers">
                    <div id="cooldown-timer" className="timer">
                        {puedeElegirCarta ? "" : <div className='h5'> You chose the wrong symbol, hence you receive a cooldown penalty: <Timer/></div>}
                    </div>
                    <div id="match-timer" className="timer">
                        <h1><Timer/></h1>
                    </div>
                    <div className="timer"></div>
                </section>
                <section id="subseccion-circulos">
                    <div className="columna-circulos unselectable-text">
                        {cartaActualJugador < 57 ?
                        <>
                        <p className="h2">{location.state.actualPlayer.name}</p>
                        <div id={activarAnimacion ? "carta-izquierda-slide" : "carta-izquierda-spawn"} className=" rounded-circle circulo-carta">
                            <div className="fila-imagenes-laterales">
                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[0]}.png`} 
                                    onClick={function(e) {
                                        timeoutEleccion(0);      
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 
                            </div>
                            <div className="fila-imagenes">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[1]}.png`} 
                                    onClick={function(e) {
                                        timeoutEleccion(1);      
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[2]}.png`} 
                                    onClick={function(e) {
                                        timeoutEleccion(2);      
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 


                            </div>
                            <div className="fila-imagenes-centro">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[3]}.png`} 
                                    onClick={function(e) {
                                        timeoutEleccion(3);      
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 


                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[4]}.png`} 
                                    onClick={function(e) {
                                        timeoutEleccion(4);      
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 
                                    

                            </div>
                            <div className="fila-imagenes">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[5]}.png`} 
                                    onClick={function(e) {
                                        timeoutEleccion(5);      
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[6]}.png`} 
                                    onClick={function(e) {
                                        timeoutEleccion(6);      
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 

                            </div>
                            <div className="fila-imagenes-laterales">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[7]}.png`} 
                                    onClick={function(e) {
                                        timeoutEleccion(7);      
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 
                            </div>
                        </div>
                        <p className="h4">Remaining cards: {cantidadCartasJugador}</p>
                        </> 
                        :  "" }

                    </div>
                    <div className="columna-circulos  unselectable-text">
                        <p className="h2"> Top of the Well </p>
                        <div className=" rounded-circle circulo-carta">
                            <div className="fila-imagenes-laterales">
                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[0]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                            </div>
                            <div className="fila-imagenes">
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[1]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[2]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                            </div>
                            <div className="fila-imagenes-centro">
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[3]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[4]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                            </div>
                            <div className="fila-imagenes">
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[5]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                                <img src= {`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[6]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                            </div>
                            <div className="fila-imagenes-laterales">
                                <img src={`../img/common/cards-img/${shuffledCards[cartaActualOponente].simbolos[7]}.png`} className="imagen-carta" alt="Top of the well icon"/>
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
