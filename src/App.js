import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
  </Switch>
)

export default App
