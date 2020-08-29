import React from "react";

import PlaySVG from "../icons/play.svg";

const GameStart = ({handlePlayClick}) => {
  return (
      <section className="game-start-container">
        <img src={PlaySVG} alt="play icon" onClick={handlePlayClick}/>
      </section>
  );
};

export default GameStart;
