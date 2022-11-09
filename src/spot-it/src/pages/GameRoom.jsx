import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import Timer from '../components/Timer'
import '../css/pages/gameRoom.css'
import '../css/common/common.scss'
import { SOCKET_URL } from '../context/socket';


import arrayShuffle from 'array-shuffle';
import InGameLeaderBoard from '../components/InGameLeaderBoard';
import GameChat from '../components/GameChat';
import moment from "moment";
import io from 'socket.io-client';



export default function GameRoom(props) {
    const socket = io.connect(SOCKET_URL);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const[shuffledCards, setCards] = useState([]);

    const [activarAnimacion, setActivarAnimacion] = useState(false);
    const [cartaActualJugador, setCartaActualJugador] = useState(0);
    const [cantidadCartasJugador, setCantidadCartasJugador] = useState(0);
    const [initialTime, setInitialTime] = useState(moment());
    const [wellTop, setWellTop] = useState([]);
    
    // TODO: distribute cards through players and no the same amount to every player
    location.state.playersConnected.map((player) => {
        player.cardsRemaining = cantidadCartasJugador;
        player.victories = 0;
        player.bestTime = "You have to win to measure your best time!";
        return player;
    }) 
    const [acertoSimbolo, setAcertoSimbolo] = useState(true);
    const [puedeElegirCarta, setPuedeElegirCarta] = useState(true);


    useEffect(() => {
        setInitialTime(new Date());
        socket.emit("cliente-pedir-cartas","1");
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
            // TODO: check each player cards
            if (cartaActualJugador === 57) {
                let finalTime = moment();
                let hoursDiff = finalTime.diff(initialTime, "hours");
                let minutesDiff = finalTime.diff(initialTime, "minutes");
                let secondsDiff = finalTime.diff(initialTime, "seconds");
                location.state.playersConnected[0].bestTime = `${hoursDiff}:${minutesDiff}:${secondsDiff}`;
                navigate("/leaderboard", {replace : true, state : {
                    playersConnected : location.state.playersConnected, 
                    sessionName : location.state.sessionName, 
                    sessionPin :  location.state.sessionPin,
                    sessionTime : `${hoursDiff}:${minutesDiff}:${secondsDiff}`,
                }});
            }
            return cartaActualJugador;
        });
    },[
        cartaActualJugador, initialTime,
        location.state.playersConnected, location.state.sessionName,
        location.state.sessionPin, navigate
    ]);

    useEffect(() => {
        socket.on("servidor-enviar-cartas", (data) => {
            setCards(data[0]);
            setWellTop(data[1]);
            setCantidadCartasJugador(data[0].length);
        }) 
        
        socket.on("acerto-simbolo", (data) => {
            if (data[0] == true) {
                setActivarAnimacion(true);
                setAcertoSimbolo(true);
                setTimeout(function () {
                    setWellTop(shuffledCards[cartaActualJugador].simbolos);
                    setCartaActualJugador(cartaActualJugador + 1);
                    setCantidadCartasJugador(cantidadCartasJugador - 1);
                    setActivarAnimacion(false);
                }, 1200);
            }
            else {
                setAcertoSimbolo(false);
                setPuedeElegirCarta(false);
            }
        })        
    }, [socket])


    function enviarCartaSeleccionada(idSimbolo) {
        if (puedeElegirCarta) {
            socket.emit("simbolo_seleccionado", {simbolo: idSimbolo, carta: shuffledCards[cartaActualJugador].simbolos});
        }
    }

  return (
    <>
    <Layout/>
    {shuffledCards.length > 0 ?  
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
                                        //timeoutEleccion(0);      
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador].simbolos[0]);  
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 
                            </div>
                            <div className="fila-imagenes">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[1]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(1);      
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador].simbolos[1]);  
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[2]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(2);
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador].simbolos[2]);        
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 


                            </div>
                            <div className="fila-imagenes-centro">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[3]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(3);
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador].simbolos[3]);        
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 


                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[4]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(4); 
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador].simbolos[4]);       
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 
                                    

                            </div>
                            <div className="fila-imagenes">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[5]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(5);
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador].simbolos[5]);        
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[6]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(6); 
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador].simbolos[6]);       
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 

                            </div>
                            <div className="fila-imagenes-laterales">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador].simbolos[7]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(7);
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador].simbolos[7]);      
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
                                    <img src={`../img/common/cards-img/${wellTop[0]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                            </div>
                            <div className="fila-imagenes">
                                <img src={`../img/common/cards-img/${wellTop[1]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                                <img src={`../img/common/cards-img/${wellTop[2]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                            </div>
                            <div className="fila-imagenes-centro">
                                <img src={`../img/common/cards-img/${wellTop[3]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                                <img src={`../img/common/cards-img/${wellTop[4]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                            </div>
                            <div className="fila-imagenes">
                                <img src={`../img/common/cards-img/${wellTop[5]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                                <img src= {`../img/common/cards-img/${wellTop[6]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                            </div>
                            <div className="fila-imagenes-laterales">
                                <img src={`../img/common/cards-img/${wellTop[7]}.png`} className="imagen-carta" alt="Top of the well icon"/>
                            </div>
                        </div>
                        <p className="h4" style={{opacity: 0.0}}> Cartas restantes: 15</p>
                    </div>
                </section>
            </section>
        </section>
        : ""}
        </>
  );
}
