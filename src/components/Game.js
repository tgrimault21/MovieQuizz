import React, { useEffect, useState } from 'react';
import Questions from './Questions';

export default function Game(props) {
  const [timer, setTimer] = useState(60);
  const [over, setOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore") || 0)
  const [newHigh, setNewHigh] = useState(false)

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer => timer - 1);
      } else {
        setOver(true)
        clearInterval(interval);
      }
    }, 1000);
    if (over) {
      setTimer(0)
      if (!highScore || highScore < score) {
        setHighScore(score)
        setNewHigh(true)
        localStorage.setItem("highScore", score)
      }
    }
    return () => clearInterval(interval);
  }, [timer]);

  function handleClick() {
    window.location.reload(true)
  }

  return(
    <div className="game__container">
      <div className="game__infos">
        <div>High Score: <b>{highScore}</b></div>
        <div>Timer: <b>{timer}</b></div>
        <div>Score: <b>{score}</b></div>
      </div>
      <div className="game-over__container">
        <div className={over ? "game-over" : "hidden"}>
          <h1>Game Over!</h1>
          <p>Score : <b>{score}</b></p>
          {newHigh ? <p>New HighScore, Congratulations !</p> : ''}
          <button className="questions__button" onClick={handleClick}><img src="update.svg" /></button>
        </div>
      </div>
      <div className={over ? "backdrop" : "not-displayed"}></div>
      <Questions actors={props.actors} movies={props.movies} score={scoreUpdate => setScore(scoreUpdate)} gameOver={gameOver => setOver(gameOver)}/>
    </div>
  )
}