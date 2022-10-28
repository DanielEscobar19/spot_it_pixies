import React from 'react'
import PropTypes from 'prop-types';

import '../css/components/button.scss'

export default function Button({ title, disabled, onClick}) {
  
  return (
    <button onClick={onClick} disabled={disabled} className="btn btn-primary btn-lg">{title}</button>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};
