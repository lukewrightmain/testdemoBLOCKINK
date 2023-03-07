import React, { useState } from "react";
import "./App.css";

const ColorPicker = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState("#9d49cc");

  const handleChange = (event) => {
    setSelectedColor(event.target.value);
    onColorChange(event.target.value);
  };

  return (
    <>
      <button
        className="navButtonPaint"
        style={{ backgroundColor: selectedColor }}
      >
        🎨
        <input
          type="color"
          value={selectedColor}
          onChange={handleChange}
        />
      </button>
    </>
  );
};

export default ColorPicker;