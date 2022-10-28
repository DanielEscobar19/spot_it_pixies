import React, { useState } from 'react'
import PropTypes from 'prop-types';

export default function HelpBox({ title, list}) {
  const [hidden, setHiden] = useState(true);

  const onClick = () => {
      setHiden(!hidden);
  }
  
  return (
    <>  
      {/* <!-- Help Box --> */}
      <div className="d-flex mb-3 mt-5" onClick={onClick}>
        <section className="help-box-container py-3 align-items-start">
          <div className="button-and-tittle">
            <img src="../../img/helpPage/angle_right.svg" alt="arrow icon" className="arrow-icon"/>
            <h1 className="px-3">{title}</h1>
          </div>
          {/* <!-- Collapsable --> */}
          <ul className={hidden ? "hiden mx-4" :"mx-4"} >
            { list.map( (e, i)=> <li key={i}>{e}</li>) }
          </ul>
        </section>
      </div> 
    </>
  )
}

HelpBox.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array
};
