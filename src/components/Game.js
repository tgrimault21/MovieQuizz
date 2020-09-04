import React, { useEffect, useState } from 'react';
import Questions from './Questions';

export default function Game(props) {
  const [timer, setTimer] = useState(60);
  const [over, setOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore") || 0)
  const [newHigh, setNewHigh] = useState(false)

  // SDK Facebook
  window.fbAsyncInit = function() {
    window.FB.init({
      appId            : '1249033968791061',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.10'
    });
    window.FB.AppEvents.logPageView();
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  } (document, 'script', 'facebook-jssdk'));

  // SDK Twitter
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
  
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
    return t;
  }(document, "script", "twitter-wjs"));

  useEffect(() => {
    let interval = null;
    // Set the timer
    interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer => timer - 1);
      } else {
        setOver(true)
        clearInterval(interval);
      }
    }, 1000);
    if (over) {
      // If game over, reset timer and set high score if needed
      setTimer(0)
      if (!highScore || highScore < score) {
        setHighScore(score)
        localStorage.setItem("highScore", score)
        if (score !== 0) {
          setNewHigh(true)
        }
      }
    }
    return () => clearInterval(interval);
  }, [timer]);

  /**
   * Refresh the page when the user wants to retry
   */
  function handleClick() {
    window.location.reload(true)
  }

  /**
   * Change color of the score to notify a change
   */
  function visualScoreIncrement() {
    const score = document.getElementById("score")

    score.classList.add("score-incr--show")
    setInterval(() => {
      score.classList.remove("score-incr--show")
    }, 50)
  }

  return(
    <div className="game__container">
      <div className="game__infos">
        <div>High Score: <b>{highScore}</b></div>
        <div>Timer: <b>{timer}</b></div>
        <div>
          Score: <b id="score" className="infos__score">{score}</b>
        </div>
      </div>
      <div className="game-over__container">
        <div className={over ? "game-over" : "hidden"}>
          <h1>Game Over!</h1>
          <p>Score : <b>{score}</b></p>
          {newHigh ?
            <p>New High Score!</p>
            : 
            ''
          }
          <p id="game-over__share-text">Share your score with your friends</p>
          <div className="game-over__share-logos">
            <a className="twitter-share-button"
              href={"https://twitter.com/intent/tweet?text=Try%20to%20beat%20my%20streak%20of%20"+score+"%20correct%20answers%20on%20MovieQuizz!%0DAccept%20the%20challenge%20here%20->%20"}
              data-size="large">
              Tweet
            </a>
            <div className="fb-share-button" data-href="http://localhost:3000/" data-layout="button" data-size="large">
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Partager</a>
            </div>
          </div>
          <button className="questions__button" onClick={handleClick}><img src="update.svg" alt="refresh"/></button>
        </div>
      </div>
      <div className={over ? "backdrop" : "not-displayed"}></div>
      <Questions  actors={props.actors} 
                  movies={props.movies} 
                  score={scoreUpdate => setScore(scoreUpdate)} 
                  gameOver={gameOver => setOver(gameOver)} 
                  visualScoreIncr={visualScoreIncrement}
      />
    </div>
  )
}