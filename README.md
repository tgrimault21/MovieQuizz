# MovieQuizz

## Run the project

```bash
npm i
npm start
```
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Specs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Library used :
- `SWR` (https://github.com/vercel/swr) for data fetching.

## Improvement ideas

### Make several types of quizz

In the homepage, the user could chose between 3 types of quizz :

- The existing one
- A "Did `a film director` directed `a movie` ?" yes or no Quizz, like the actor one, with same specifications
- A "Which one of these actors didn't play in `a movie` ?" Quizz, with a choice of 4 actors, 3 of them being in the top casting of the movie (a popular one), and the last one being a popular actor.
The list of movies and actors will be the same as the existing Quizz. For each question, an actor in the list will be chosen, and a movie he's known for will be randomly picked. 2 other actors in the top 5 casting of the movie will be randomly picked as well. The last actor will be randomly took in the actors' list, as long as he's not part of the chosen movie.
There will be 10 questions, and the game ends when the user answered all 10 questions. Each question has a time limit of 10 secondes (maybe 15), and if the user hasn't answered in the given time, the next question is displayed.

### Develop a backend

The weakness of the frontend here is that the users can cheat by easily accessing the data model. While here it's not possible to just look if the answer is yes or no (the answer is calculated when the user clicks on yes or no), it's still possible to access the details of each actor. 
Even though it could take some time to do that, and it could be not worth it considering the limited time of 60 secondes, it's still possible, and a better choice could be to implement a backend that sends the array of questions to the frontend, and the answer of each question when the user clicks on it. Then, all details about each movie or actor would be hidden.

## Comments

- The facebook sharing link doesn't work in local, but I still decided to keep it considering the time I took to document myself about how to make it works, and because it's visually more pleasant.

- I first began coding the "core" of the quizz, asking questions to the user and making the answer system working. Then, I displayed the pictures of actor and movie in the question, because it was almost nothing to add to the code. The second most important feature was how to end the game, so I decided to develop that before the 2 last tasks. I always prefer to start coding main features and most complex ones, and then finish with the design, in order to have something working in time.