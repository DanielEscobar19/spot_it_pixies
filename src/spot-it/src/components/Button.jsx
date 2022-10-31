import React from 'react'
import PropTypes from 'prop-types';

import '../css/components/button.scss'

export default function Button({ title, disabled, onClick}) {
  
  return (
    <button onClick={onClick} className={`btn h1 m-0 btn-primary btn-lg ${disabled ? 'disable' : 'purple-button'}`}>{title}</button>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};
