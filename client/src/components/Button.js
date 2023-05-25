import React from 'react'
import style from './Button.module.css'

function Button({children,onClickHandler,styles}) {
  return (
    <button 
        className={style.btn}
        style={styles && styles}
        onClick={onClickHandler}
    >
        {children}
    </button>
  )
}

export default Button