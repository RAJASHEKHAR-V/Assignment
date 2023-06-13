import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeOfUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangeOfPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onSubmitOfForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.remove('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="form-container">
        <form className="form-el" onSubmit={this.onSubmitOfForm}>
          <img
            src="https://is3-ssl.mzstatic.com/image/thumb/Purple69/v4/53/54/63/5354638a-3974-7fa6-7f08-52b7d68b7e72/source/512x512bb.jpg"
            className="web-logo"
            alt="joke logo"
          />
          <label className="user-label" htmlFor="user-id">
            USER NAME
          </label>
          <input
            placeholder="Username"
            type="text"
            id="user-id"
            className="user-input"
            value={username}
            onChange={this.onChangeOfUserName}
          />
          <label className="password-label" htmlFor="password-id">
            PASSWORD
          </label>
          <input
            placeholder="Password"
            type="password"
            id="password-id"
            className="password-input"
            value={password}
            onChange={this.onChangeOfPassword}
          />
          <div className="button-card">
            <button className="login-button" type="submit">
              Login
            </button>
          </div>
          {errorMsg.length > 0 ? <p className="error-msg">{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default Login
