import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import JokeItem from '../JokeItem'

import './index.css'

const Home = props => {
  const [jokes, setJokes] = useState({jokesList: [], errorMsg: ''})

  // on Successful retrieval of data from API, updating data with setJokes() function to the state variable jokes

  const updateJokesArray = jokesArray => {
    const newJokesList = jokesArray.map(eachJokeItem => ({
      category: eachJokeItem.category,
      flags: eachJokeItem.flags,
      id: eachJokeItem.id,
      joke: eachJokeItem.joke,
      language: eachJokeItem.lang,
      safe: eachJokeItem.safe,
      type: eachJokeItem.type,
    }))
    setJokes(prevState => ({...prevState, jokesList: newJokesList}))
  }

  // jokes Api is called from useEffect() hook

  const callJokesApi = async () => {
    const jokesUrl =
      'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10'
    const response = await fetch(jokesUrl)
    const data = await response.json()
    if (response.ok) {
      updateJokesArray(data.jokes)
    } else {
      setJokes(prevState => ({...prevState, errorMsg: data.message}))
    }
  }

  // useEffect hook is used for calling Jokes API

  useEffect(() => {
    callJokesApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Logging out and navigating to the login page
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  // Redirecting to the Login Page if user is not logged in

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  // rendering the jsx on the website
  return (
    <div className="joke-container p-3">
      <table className="joke-table">
        <th className="header-style">Id</th>
        <th className="header-style">Joke</th>
        <th className="header-style">Language</th>
        <th className="header-style">Category</th>
        <tbody>
          {jokes.jokesList.map(eachJoke => (
            <JokeItem key={eachJoke.id} jokeObject={eachJoke} />
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="btn btn-primary logout m-3"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Home
