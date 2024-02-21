import { useState } from "react";
import "./LocationInputs.css"

const LocationInputs = ({isVisible, onChange}) => {
    const [x, setX] = useState()
    const [y, setY] = useState()
    const [z, setZ] = useState()

    function HandelLocationChange(){
        onChange([x,y,z]) 
        console.log([x,y,z]) 
    }

  return (
    <div className={isVisible?"location-inputs-container":"location-inputs-container-hidden"}>
    <input
      type="number"
      placeholder="X"
      className="location-input"
      onChange={(e) => {setX(Number(e.target.value)); HandelLocationChange()} }
      ></input>
    <input
      type="number"
      placeholder="Y"
      className="location-input"
      onChange={(e) => {setY(Number(e.target.value)); HandelLocationChange()} }
      ></input>
    <input
      type="number"
      placeholder="Z"
      className="location-input"
      onChange={(e) => {setZ(Number(e.target.value)); HandelLocationChange()} }
    ></input>
  </div>
  )
}

export default LocationInputs