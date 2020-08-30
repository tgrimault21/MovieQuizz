import React, { useState } from 'react';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}


export default function Questions(props) {

  const [questionCount, setQuestionCount] = useState(0)
  const [score, setScore] = useState(0)
  
  const questions = []
  
  shuffle(props.actors)
  
  props.actors.forEach(actor => {
    const random = Math.random()
    if (random > 0.5) {
      const index = Math.floor(Math.random() * actor.movies.length)
      questions.push({
        actor: actor.name,
        movie: actor.movies[index]
      })
    } else {
      const index = Math.floor(Math.random() * props.movies.length)
      questions.push({
        actor: actor.name,
        movie: props.movies[index].name
      })
    }
  })

  function answer(yes, actor, movie) {
    fetch('https://api.themoviedb.org/3/person/' + actor.id + '/movie_credits?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US', {
        method: "GET",
        dataType: "JSON",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
      }
    })
      .then(res => res.json())
      .then(data => {
        const isCorrect = data.cast.find(actorMovie => actorMovie.title === movie)
    
        if ((yes && isCorrect) || (!yes && !isCorrect)) {
          setScore(score+1)
        }
    
        setQuestionCount(questionCount+1)
      })
  }

  return(
    <div className="questions__card">
      <div className="questions__score">Score : {score}</div>
      <div className="questions__question">Did <b>{questions[questionCount].actor}</b> play in <b>{questions[questionCount].movie}</b> ?</div>
      <div className="questions__buttons-group">
        <button className="questions__button questions__button--yes" onClick={() => answer(true, props.actors[questionCount], questions[questionCount].movie)}><img src="check.svg" /></button>
        <button className="questions__button questions__button--no" onClick={() => answer(false, props.actors[questionCount], questions[questionCount].movie)}><img src="delete.svg" /></button>
      </div>
    </div>
  )
}