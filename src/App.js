import React from "react";
import "./App.css";
import TitlePic from "./TitleImg";
import TitlePic2 from "./TitleImg2";
import BGPixel from "./bgpixel";
import Hand from "./hand";
import { useState, useEffect } from 'react';
import ColorPicker from "./colorpicker";
import EraserButton from "./EraserButton";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton, getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [goerli, mainnet],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "RainbowKit",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = ({}) => {
  const [gridSize, setGridSize] = useState({
    rows: 0,
    columns: 0,
  });

  const [selectedColor, setSelectedColor] = useState("#9d49cc");
  const [isPainting, setIsPainting] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const gridContainer = window.getComputedStyle(
      document.querySelector('.grid-container')
    );

    const rows = parseInt(gridContainer.getPropertyValue('grid-template-rows').split(' ').length, 10);
    const columns = parseInt(gridContainer.getPropertyValue('grid-template-columns').split(' ').length, 10);

    setGridSize({
      rows,
      columns,
    });
  }, []);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  
  const handleMouseDown = (event) => {
    setIsPainting(true);
    if (!isErasing) {
      event.target.style.backgroundColor = selectedColor;
    } else {
      event.target.style.backgroundColor = '';
    }
  };
  
  const handleMouseUp = () => {
    setIsPainting(false);
  };
  
  const handleMouseEnter = (event) => {
    if (isPainting) {
      event.target.style.backgroundColor = isErasing ? '' : selectedColor;
    }
  };
  
  
  const handleTrashClick = () => {
    const cells = document.querySelectorAll('.grid-item');
    cells.forEach(cell => {
      cell.style.backgroundColor = '';
    });
  };

  return (
    <div className="App">
      <header>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}
         theme={darkTheme({
           accentColor: "#222222",
           accentColorForeground: '#f5f5dc',
           borderRadius: 'small',
           fontStack: 'system',
           overlayBlur: 'small',
         })}
        >
          <ConnectButton label="💸" chainStatus={false} showBalance={false} accountStatus="address" />
        </RainbowKitProvider>
      </WagmiConfig>
      </header>
      <TitlePic src={require('./icons/title.png')} className="title" />
      <nav className="noShow">
        <button className="navButtonTrash" onClick={handleTrashClick}>🗑️</button>
        <button className="navButtonSave">💾</button>
        <EraserButton isErasing={isErasing} setIsErasing={setIsErasing}/>
        <ColorPicker onColorChange={handleColorChange}/>
      </nav>
      <BGPixel src={require('./icons/bgpixel.png')} className="bgpixel" />
      <Hand src={require('./icons/hand.png')} className="hand" />
      <div className="grid-container">
        {[...Array(gridSize.rows * gridSize.columns)].map((e, i) => (
          <div
            className="grid-item"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseEnter={handleMouseEnter}
            isErasing={isErasing}
          />
        ))}
      </div>
      <div className="footer">
        <TitlePic2 src={require('./icons/title2.png')} className="title2" />
        <p>Block Ink. is the first fully customizable NFT platform that allows users to paint their own pixelated art via a 15x15 blank grid.

The grid will feature an "Open Edition Style" unlimited free mint for 24 hours. Each address will be allowed 24 hours to paint and mint two unique grids. When the mint expires and the deadline is reached, participants will have the ability to burn two existing grids to mint a fresh grid.

After burning, the number of blocks within the new grid doubles, from the standard 15x15 design to a 30x30 design. This allows for the creation of more complex art. Grids can be doubled in size an unlimited number of times by burning two grids of the existing size.

A “Wall of Burn” will showcase burns as they occur in real time. The wall will display the art burned, as well as the resulting creation that is minted from their destruction. A “Burn Leaderboard” will also showcase the wallets that have burned the most art.

Block Ink. is a social experiment that gives players the freedom to create whatever pixelated art they desire. It allows players to destroy other’s creations in the pursuit of creating their own, better piece of art. Players can choose to collect art in the pursuit of destroying it to create their own art or collect to preserve other’s creations. Play the game however you desire.</p>
      </div>
    </div>
  );
};

export default App;