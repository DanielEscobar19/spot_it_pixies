import React from 'react'
import Layout from './Layout'
import '../css/pages/credits.css'

export default function Credits() {
  return (
    <>
      <Layout/>
      {/* <!--Container principal de la página--> */}
        <section id="container-principal">
            {/* <!--Sección donde se encuentra el título de la página--> */}
            <section id="seccion-titulo">
                <p id="titulo">Credits</p>
                <img src="../img/common/magic-crown.svg" id="imagen-corona" alt="Crown icon"/>
            </section>
            {/* <!--Sección donde se visualizan los créditos--> */}
            <section id="seccion-creditos">
                {/* <!--Imagenes decorativas de los creditos--> */}
                <div id="subseccion-imagenes-creditos">
                    <img src="../img/common/pixie1.png" className="imagen-pixies" alt="Pixie 1"/>
                    <img src="../img/common/pixie2.png" className="imagen-pixies" alt="Pixie 2"/>
                </div>
                {/* <!--Container de un crédito--> */}
                <div className="credito">
                    <div className="subseccion-key-credito">
                        <p className="key-credito">Diseño gráfico</p>
                    </div>
                    <div className="subseccion-nombre-credito">
                        <p className="nombre-credito">Fabián Orozco Chaves</p>
                    </div>
                </div>
                {/* <!--Container de un crédito--> */}
                <div className="credito">
                    <div className="subseccion-key-credito">
                        <p className="key-credito">Programación backend</p>
                    </div>
                    <div className="subseccion-nombre-credito">
                        <p className="nombre-credito">Manuel Arroyo Portilla</p>
                    </div>
                </div>
                {/* <!--Container de un crédito--> */}
                <div className="credito">
                    <div className="subseccion-key-credito">
                        <p className="key-credito">Programación front-end</p>
                    </div>
                    <div className="subseccion-nombre-credito">
                        <p className="nombre-credito">Daniel Escobar Giraldo</p>
                    </div>
                </div>
                {/* <!--Container de un crédito--> */}
                <div className="credito">
                    <div className="subseccion-key-credito">
                        <p className="key-credito">Programación front-end</p>
                    </div>
                    <div className="subseccion-nombre-credito">
                        <p className="nombre-credito">Gabriel Bonilla Rivera</p>
                    </div>
                </div>
                {/* <!--Container de un crédito--> */}
                <div className="credito">
                    <div className="subseccion-key-credito">
                        <p className="key-credito">Imágenes</p>
                    </div>
                    <div className="subseccion-nombre-credito">
                        <p className="nombre-credito">Flaticon</p>
                    </div>
                </div>
                
            </section>
            <footer>
                <p id="texto-footer">¡Somos pixies, somos pixies!</p>
            </footer>
          </section>
    </>
  )
}
