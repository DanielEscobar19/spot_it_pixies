import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext} from 'react';
import Layout from './Layout'
import Timer from '../components/Timer'
import '../css/pages/gameRoom.css'
import '../css/common/common.scss'
import socket from "../Socket";
import InGameLeaderBoard from '../components/InGameLeaderBoard';
import GameChat from '../components/GameChat';
import moment from "moment";
import  { GameContext } from '../context/Game'

export default function GameRoom(props) {
    const navigate = useNavigate();
    const {
        roomId, name, setFinalTime, ganador, setGanador, setMessagesList
    } = useContext(GameContext);
    const[shuffledCards, setCards] = useState([]);

    const [activarAnimacion, setActivarAnimacion] = useState(false);
    const [cartaActualJugador, setCartaActualJugador] = useState(0);
    const [cantidadCartasJugador, setCantidadCartasJugador] = useState(0);
    const [initialTime, setInitialTime] = useState(moment());
    const [wellTop, setWellTop] = useState([]);
    const [hayGanador, setHayGanador] = useState(false);
    const [acertoSimbolo, setAcertoSimbolo] = useState(true);
    const [puedeElegirCarta, setPuedeElegirCarta] = useState(true);

    useEffect(() => {
        setMessagesList([]);
    }, []);

    useEffect(() => {
        setInitialTime(new Date());
        // socket.emit("join-socket-room", roomId);
        socket.emit("cliente-pedir-cartas",roomId, name);
    },[roomId, name]);

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
        setHayGanador( () => {
            // TODO: check each player cards
            if (hayGanador === true) {
                let endTime = moment();
                const finalTime = endTime - initialTime;
                setFinalTime(finalTime);
                if (ganador === name) socket.emit("updateLeaderBoard", name, finalTime, roomId);
                navigate("/leaderboard");
            }
            return hayGanador;
        });
    },[
        hayGanador, initialTime,
        ganador,navigate, 
        name, setFinalTime,
        roomId
    ]);

    useEffect(() => {
        socket.on("servidor-enviar-cartas", (data) => {
            console.log("Cartas del mae ", data[0]);
            console.log("Cartas del pozo de evrga ", data[1]);

            setCards(data[0]);
            setWellTop(data[1]);
            setCantidadCartasJugador(data[0].length);
        }) 
        
        socket.on("acerto-simbolo", (data) => {
            if (data[0] === true) {
                setActivarAnimacion(true);
                setAcertoSimbolo(true);
                socket.emit("restar-carta-jugador", roomId, name, cantidadCartasJugador-1);
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
        
        socket.on("cambio-top-well", (data) => {
            // alert("Se cambia el tope del well");
            setWellTop(data);
        })

        socket.on("hay-ganador", (data, winnerName)=>{
            setHayGanador(data);
            setGanador(winnerName);
        })

    })


    function enviarCartaSeleccionada(idSimbolo) {
        if (puedeElegirCarta) {
            socket.emit("simbolo_seleccionado", {simbolo: idSimbolo, carta: shuffledCards[cartaActualJugador].simbolos
                , cantidadCartas: cantidadCartasJugador, sessionPin: roomId, name: name});
        }
    }

  return (
    <>
    <Layout/>
    {shuffledCards.length > 0 ?  
        <section className="container-principal">
            <section id="seccion-izquierda">
                
                <InGameLeaderBoard />

                <GameChat/>
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
                        <p className="h2">{name}</p>
                        <div id={activarAnimacion ? "carta-izquierda-slide" : "carta-izquierda-spawn"} className=" rounded-circle circulo-carta">
                            <div className="fila-imagenes-laterales">
                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador]?.simbolos[0]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(0);      
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador].simbolos[0]);  
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 
                            </div>
                            <div className="fila-imagenes">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador]?.simbolos[1]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(1);      
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador].simbolos[1]);  
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador]?.simbolos[2]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(2);
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador]?.simbolos[2]);        
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 


                            </div>
                            <div className="fila-imagenes-centro">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador]?.simbolos[3]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(3);
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador]?.simbolos[3]);        
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 


                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador]?.simbolos[4]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(4); 
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador]?.simbolos[4]);
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 
                                    

                            </div>
                            <div className="fila-imagenes">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador]?.simbolos[5]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(5);
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador]?.simbolos[5]);        
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador]?.simbolos[6]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(6); 
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador]?.simbolos[6]);       
                                    }}
                                    className="imagen-carta" alt="Player icon"/> 

                            </div>
                            <div className="fila-imagenes-laterales">

                                    <img src={`../img/common/cards-img/${shuffledCards[cartaActualJugador]?.simbolos[7]}.png`} 
                                    onClick={function(e) {
                                        //timeoutEleccion(7);
                                        enviarCartaSeleccionada(shuffledCards[cartaActualJugador]?.simbolos[7]);      
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
