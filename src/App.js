import React, { useReducer, useEffect, useRef, useState } from "react";

import "./App.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import Score from "./components/Score";
import GameOver from "./components/GameOver";
import reducer, { generateRandomPosition } from "./Reducer";

function App() {
  let timer = useRef(null);
  const [bestScore, setBestScore] = useState(0);
  const N = 8;
  const gridList = new Array(N).fill(0);
  for (let i = 0; i < gridList.length; i++) {
    gridList[i] = new Array(N).fill(0);
  }
  gridList[0][0] = "D";
  const initialState = {
    gridList,
    score: 0,
    speed: 2000,
    isGameOver: false,
    dogDirection: "down",
    currentDogPosition: [0, 0],
  }
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    const storedScore = localStorage.getItem("score");
    // Retrieve best score from local storage
    if (storedScore && Number.isNaN(Number(storedScore)) === false) {
      setBestScore(storedScore);
    }
  }, []);

  useEffect(() => {
    const { row: boneRow, col: boneCol } = generateRandomPosition(
      state.gridList
    );
    dispatch({ type: "add_position", row: boneRow, col: boneCol, value: "B" });
    const { row: rottenBoneRow, col: rottenBoneCol } = generateRandomPosition(
      state.gridList
    );
    dispatch({
      type: "add_position",
      row: rottenBoneRow,
      col: rottenBoneCol,
      value: "R",
    });

    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.gridList.length]);

  useEffect(() => {
    if (state.isGameOver) return;
    timer.current = setInterval(() => {
      dispatch({ type: "update_dog_position" });
    }, state.speed);

    if (state.isGameOver) {
      clearInterval(timer.current);
      timer.current = null;
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  });

  useEffect(() => {
    if (state.isGameOver === true) {
      const storedScore = localStorage.getItem("score");

      if (storedScore === null) {
        localStorage.setItem("score", state.score);
        setBestScore(state.score);
        return;
      }
      if (
        Number.isNaN(Number(storedScore)) === false &&
        storedScore < state.score
      ) {
        localStorage.setItem("score", state.score);
        setBestScore(state.score);
        return;
      }
    }
  }, [state.isGameOver, state.score]);

  const handleKeyUp = (event) => {
    switch (event.key) {
      case "ArrowUp":
        dispatch({ type: "update_dog_direction", direction: "up" });
        break;
      case "ArrowDown":
        dispatch({ type: "update_dog_direction", direction: "down" });
        break;
      case "ArrowLeft":
        dispatch({ type: "update_dog_direction", direction: "left" });
        break;
      case "ArrowRight":
        dispatch({ type: "update_dog_direction", direction: "right" });
        break;

      default:
        break;
    }
  };
  const onGameOverCloseClick = () => dispatch({type: 'reset_game_state', newState: initialState})

  return (
    <div className="App">
      <Header />
      <section className="scores">
        <Score score={state.score} text="Score" />
        <Score score={bestScore} text="Best" />
      </section>
      <Grid N={8} gridList={state.gridList} dogDirection={state.dogDirection} />
      {state.isGameOver ? <GameOver score={state.score} onCloseClick={onGameOverCloseClick} /> : null}
      <article className="description">
        <p className="text">
          This is the game about Alex, the hungry dog. Help Alex to find the
          bone in the garden. But be aware of the rotten meat, if Alex eats the
          rotten meat, it would die, means Game Over!!!!
        </p>
        <p className="text">
          <span className="super-text">How to Play:</span>
          Please use the arrow keys on keyboard to move Alex around.
        </p>
      </article>
    </div>
  );
}

export default App;
