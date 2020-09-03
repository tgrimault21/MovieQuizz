import React from 'react'
import { Link } from "react-router-dom";

export default function Welcome() {
  return(
    <div className="welcome__container">
      <div className="welcome">
        <h2>Welcome</h2>
        <h3>to</h3>
        <h1>MovieQuizz !</h1>
        <p>You'll be asked a series of "<span className="green">Yes</span> or <span className="red">No</span>" questions, about if an <span className="orange">actor</span> did play in a <span className="orange">movie</span> or didn't.</p>
        <p>Answer <span className="orange">as many</span> as you can in the <span className="orange">allowed time</span>!</p>
        <p>One <span className="red">wrong</span> answer = <span className="orange">G</span>ame <span className="orange">O</span>ver !</p>
        <h4>Ready ?</h4>
      </div>
      <div className="welcome__bottom-border"></div>
      <Link to="/quizz">Start Now</Link>
    </div>
  )
}