import React from 'react';

const EraserButton = ({ isErasing, setIsErasing }) => {
  return (
    <button
      className="navButtonErase"
      onClick={() => setIsErasing(!isErasing)}
    >
      {isErasing ? '✋' : '🧼'}
    </button>
  );
};

export default EraserButton;