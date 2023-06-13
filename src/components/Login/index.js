import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [state, setState] = useState({username: '', password: '', errorMsg: ''})

  const onChangeOfUserName = event => {
    setState(prevState => ({...prevState, username: event.target.value}))
  }

  const onChangeOfPassword = event => {
    setState(prevState => ({...prevState, password: event.target.value}))
  }

  // IMPORTANT NOTE: For Authentication here two methods are Developed in order to use either of one hide either of one to use the Login Page.

  // Method-I Code

  //   const onSuccess = jwtToken => {
  //     const {history} = props
  //     Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
  //     history.replace('/')
  //   }

  //   const onFailure = errorMsg => {
  //     setState(prevState => ({...prevState, errorMsg}))
  //   }

  // Used For Method-I and Method-II authentication, On Click Login Button it calls the Login API stores the jwt_token in Cookies or Checks the Dummy credentials and stores the value "raja" as jwt_token in the Cookies

  const onSubmitOfForm = async event => {
    event.preventDefault()

    // Method-I used standard api is used for user verification with dummy credentials which were already registered.
    const {username, password} = state
    // const userDetails = {username, password}
    // const url = 'https://apis.ccbp.in/login'
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify(userDetails),
    // }
    // const response = await fetch(url, options)
    // const data = await response.json()
    // if (response.ok === true) {
    //   onSuccess(data.jwt_token)
    // } else {
    //   onFailure(data.error_msg)
    // }

    // Method -II Without using Database fixing user name "raja", password "raja@2021"
    if (username === 'raja' && password === 'raja@2021') {
      const {history} = props
      Cookies.set('jwt_token', username, {expires: 30, path: '/'})
      history.replace('/')
    } else if (username !== 'raja' && password !== 'raja@2021') {
      setState(prevState => ({
        ...prevState,
        errorMsg: '* Username and Password incorrect',
      }))
    } else if (username !== 'raja') {
      setState(prevState => ({...prevState, errorMsg: '* Username incorrect'}))
    } else {
      setState(prevState => ({
        ...prevState,
        errorMsg: '*Password incorrect',
      }))
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="form-container d-flex justify-content-center align-items-center p-3">
      <form
        className="form-el d-flex flex-column justify-content-center align-items-center"
        onSubmit={onSubmitOfForm}
      >
        <img
          src="https://is3-ssl.mzstatic.com/image/thumb/Purple69/v4/53/54/63/5354638a-3974-7fa6-7f08-52b7d68b7e72/source/512x512bb.jpg"
          className="joke-logo mb-3 mt-2"
          alt="joke logo"
        />
        <label className="user-label mb-1" htmlFor="user-id">
          USER NAME
        </label>
        <input
          placeholder="Username"
          type="text"
          id="user-id"
          className="user-input p-2 mb-4"
          value={state.username}
          onChange={onChangeOfUserName}
        />
        <label className="password-label mb-1" htmlFor="password-id">
          PASSWORD
        </label>
        <input
          placeholder="Password"
          type="password"
          id="password-id"
          className="password-input p-2 mb-4"
          value={state.password}
          onChange={onChangeOfPassword}
        />
        <div className="button-card mb-3">
          <button className="login-button" type="submit">
            Login
          </button>
        </div>
        {state.errorMsg.length > 0 ? (
          <p className="error-msg">{state.errorMsg}</p>
        ) : (
          ''
        )}
      </form>
    </div>
  )
}

export default Login
