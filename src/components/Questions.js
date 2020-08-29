import React, { useState } from 'react';
import useSWR from 'swr';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Questions(props) {

  const [questionCount, setQuestionCount] = useState(0)
  const [score, setScore] = useState(0)
  const [fetchActor, setFetchActor] = useState(undefined)
  
  const { data, error } = useSWR(() => fetchActor ? 'https://api.themoviedb.org/3/person/' + fetchActor + '/movie_credits?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US' : null, fetcher)

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
    setFetchActor(actor.id)

    const answerIs = actor.movies.find(actorMovie => actorMovie === movie)

    if ((yes && answerIs) || (!yes && !answerIs)) {
      setScore(score+1)
    }

    setQuestionCount(questionCount+1)
  }

  return(
    <div>
      Did {questions[questionCount].actor} plays in {questions[questionCount].movie} ?
      <button onClick={() => answer(true, props.actors[questionCount], questions[questionCount].movie)}>Yes</button>
      <button onClick={() => answer(false, props.actors[questionCount], questions[questionCount].movie)}>No</button>
      Score : {score}
    </div>
  )
}