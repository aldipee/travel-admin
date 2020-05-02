import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
// Page
import Login from './pages/Login'
import Home from './pages/Admin/Home'
import { connect } from 'react-redux'
const App = (props) => {
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
  auth: state.Auth
})
export default connect(mapStateToProps, {})(App)
