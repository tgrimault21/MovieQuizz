import React from 'react';
import Game from './components/Game';
import Welcome from './components/Welcome';
import useSWR from 'swr';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const fetcher = (url) => fetch(url).then((res) => res.json())

function App() {
  // Fetch the top 100 Popular actors
  const { data, error } = useSWR('https://api.themoviedb.org/3/person/popular?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US&page=1', fetcher)
  const { data: data2, error: error2 } = useSWR('https://api.themoviedb.org/3/person/popular?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US&page=2', fetcher)
  const { data: data3, error: error3 } = useSWR('https://api.themoviedb.org/3/person/popular?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US&page=3', fetcher)
  const { data: data4, error: error4 } = useSWR('https://api.themoviedb.org/3/person/popular?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US&page=4', fetcher)
  const { data: data5, error: error5 } = useSWR('https://api.themoviedb.org/3/person/popular?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US&page=5', fetcher)

  const actors = []
  const movies = []

  if (error || error2 || error3 || error4 || error5) return(
    <div>Failed to load</div>
  )

  // Loading screen when fetching data
  if (!data || !data2 || !data3 || !data4 || !data5) return(
    <img className="loading" src="spinLoad.svg" alt="loading"/>
  )

  // When data are fetched
  if (data && data2 && data3 && data4 && data5) {
    const actorsResults = [...data.results, ...data2.results, ...data3.results, ...data4.results, ...data5.results]
  
    // For each actor, fill the list of actors and the list of movies based on the movies he is known for
    actorsResults.forEach(actor => {
      actors.push({
        id: actor.id,
        name: actor.name,
        picture: actor.profile_path,
        movies: actor.known_for.map(movie => (
          movie.title
        )).filter(Boolean)
      })
  
      actor.known_for.forEach(movie => {
        movies.push({
          id: movie.id,
          poster: movie.poster_path,
          name: movie.title
        })
      })
    })
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/quizz">
            <div className="header">
              <Link to="/">MovieQuizz</Link>
            </div>
            <Game actors={actors.filter(actor => actor.movies.length > 0)} movies={movies.filter(movie => movie.name !== undefined)}/>
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
