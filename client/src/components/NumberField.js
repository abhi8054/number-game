import React from 'react'
import style from "./NumberField.module.css"

function NumberField({value,onChangeHandler,label,name,styles}) {
  return (
    <div className={style.inputFieldWrapper}>
        <input 
            type="number"
            style={styles && styles}
            placeholder=' '
            required={true}
            value={value}
            onChange={onChangeHandler}
            name = {name}
        />
        <label>{label}</label>
    </div>
  )
}

export default NumberField