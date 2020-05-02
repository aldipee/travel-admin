import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

// Page
import Login from './pages/Login'
import Home from './pages/Home'
import { connect } from 'react-redux'
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <PrivateRoute component={Home} path="/" />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  auth: state.AuthData
})
export default connect(mapStateToProps, {})(App)
