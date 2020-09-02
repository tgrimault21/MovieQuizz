import React from 'react'
import { Link } from "react-router-dom";

export default function Welcome() {
  return(
    <div>
      <div className="welcome">
        <h2>Welcome</h2>
        <h3>to</h3>
        <h1>MovieQuizz !</h1>
        <p>You'll be asked a series of "Yes or No" questions, about if an actor did play in a movie or didn't.</p>
        <p>Answer as many as you can in the allowed time!</p>
        <p>One wrong answer = Game Over !</p>
        <h4>Ready ?</h4>
      </div>
      <Link to="/quizz">Start Now</Link>
    </div>
  )
}