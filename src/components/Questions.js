import React, { useState, useEffect } from 'react';

/**
 * Randomly shuffle an array
 * @param {*} array the array to shuffle
 */
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
  const [questionsList, setQuestionsList] = useState([])
  
  
  useEffect(() => {
    const questions = []
    
    // Not to have the same order of actors in the questions
    shuffle(props.actors)
    
    props.actors.forEach(actor => {
      const random = Math.random()
      // 1/2 chance to get a movie in the list of the actor's most famous movies (100% correct answer)
      if (random > 0.5) {
        const index = Math.floor(Math.random() * actor.movies.length)
        const indexInMoviesList = props.movies.map(movie => movie.name).indexOf(actor.movies[index])
        questions.push({
          actor: actor.name,
          movie: actor.movies[index],
          portrait: actor.picture,
          poster: props.movies[indexInMoviesList].poster
        })
      } 
      // 1/2 chance to get a random movie in the list (~99% wrong answer)
      else {
        const index = Math.floor(Math.random() * props.movies.length)
        questions.push({
          actor: actor.name,
          movie: props.movies[index].name,
          portrait: actor.picture,
          poster: props.movies[index].poster
        })
      }
    })

    setQuestionsList(questions)
  }, [])

  /**
   * Game function, triggered when the user answers
   * @param {*} yes boolean, the answer the user gives
   * @param {*} actor the actor in the question
   * @param {*} movie the movie in the question
   */
  function answer(yes, actor, movie) {
    //Find if the movie is in the actor's filmography
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
    
        // If correct answer
        if ((yes && isCorrect) || (!yes && !isCorrect)) {
          setScore(score+1)
          props.score(score+1)
          props.visualScoreIncr()
          visualSuccessCheck()
        } else {
          props.gameOver(true)
        }

        // Stop before reaching the last question 
        if (questionCount < questionsList.length) {
          setQuestionCount(questionCount+1)
        } else {
          setQuestionCount(0)
        }
      })
  }

  /**
   * Notify the user when an answer is correct, with a green check
   */
  function visualSuccessCheck() {
    const score = document.getElementById("success-check")
    
    score.classList.add("questions__success--start")
    setInterval(() => {
      score.classList.remove("questions__success--start")
    }, 50)
  }

  return(
    questionsList.length > 0 ?
    (<div className="questions__card">
      <div id="success-check" className="questions__success"></div>
      <div className="questions__question">Did <b>{questionsList[questionCount].actor}</b> play in <b>{questionsList[questionCount].movie}</b> ?</div>
      <div className="questions__pictures">
        <img src={"http://image.tmdb.org/t/p/w185" + questionsList[questionCount].portrait} alt="actor"/>
        <img id="thunder" src="thunder.svg" alt="thunder"/>
        <img src={"http://image.tmdb.org/t/p/w185" + questionsList[questionCount].poster} alt="movie"/>
      </div>
      <div className="questions__buttons-group">
        <button className="questions__button questions__button--yes" onClick={() => answer(true, props.actors[questionCount], questionsList[questionCount].movie)}><img src="check.svg" alt="Yes"/></button>
        <button className="questions__button questions__button--no" onClick={() => answer(false, props.actors[questionCount], questionsList[questionCount].movie)}><img src="delete.svg" alt="No"/></button>
      </div>
    </div>)
    :
    <img className="loading" src="/images/spinLoad.svg" alt="loading"/>
  )
}