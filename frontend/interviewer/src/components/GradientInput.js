import React from 'react'
import "./css/gradientinput.css"
const GradientInput = (props) => {
  return (
    <div className="form__group field">
      <input
        type={props.type}
        className="form__field"
        placeholder={props.name}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        required
        style={props.style} 
        min={props.min}
        max={props.max}
      />
      <label htmlFor={props.name} className="form__label">
        {props.name}
        <br />
        {props.value}
      </label>
    </div>
  )
}

export default GradientInput