import { useState, useEffect } from "react";
import "./LocationInputs.css";

const LocationInputs = ({ isVisible, onChange }) => {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [z, setZ] = useState();

  useEffect(() => {
    onChange([x, y, z]);
  }, [x, y, z,onChange]);

  return (
    <div
      className={
        isVisible
          ? "location-inputs-container"
          : "location-inputs-container-hidden"
      }
    >
      <input
        type="number"
        placeholder="X"
        className="location-input"
        onChange={(e) => {
          setX(e.target.value);
        }}
      ></input>
      <input
        type="number"
        placeholder="Y"
        className="location-input"
        onChange={(e) => {
          setY(e.target.value);
        }}
      ></input>
      <input
        type="number"
        placeholder="Z"
        className="location-input"
        onChange={(e) => {
          setZ(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default LocationInputs;
