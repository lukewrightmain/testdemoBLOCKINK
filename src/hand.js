import React from "react";

const Hand = ({ src }) => {
  const handleClick = () => {
    const hand = document.querySelector(".hand");
    hand.classList.add("animateHand");

    const bgPixel = document.querySelector(".bgpixel");
    bgPixel.classList.add("animatebgpixel");

    const title = document.querySelector(".title");
    title.classList.add("animatetitle");

    const nav = document.querySelector("nav");
    setTimeout(() => {
      nav.classList.add("fadeInNav");
    }, 750);

    const header = document.querySelector("header");
    setTimeout(() => {
      header.classList.add("fadeInNav");
    }, 750);

    const gridContainer = document.querySelector(".grid-container");
    gridContainer.classList.add("growGrid");
  };

  return (
    <img
      src={src}
      alt="handimg"
      className="hand"
      onClick={handleClick}
    />
  );
};

export default Hand;