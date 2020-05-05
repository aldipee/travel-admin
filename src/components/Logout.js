import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
// import { AuthContext } from '../context/Auth'
import { setLogout } from '../redux/actions/UsersAction'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, setLogout, ...rest }) => {
  //   const Auth = useContext(AuthContext)
  localStorage.removeItem('token_user')
  localStorage.removeItem('role')
  //   Auth.Logout()
  setLogout()

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={(props) => <Redirect to={{ pathname: '/auth/login' }} />} />
  )
}
export default connect(null, { setLogout })(PrivateRoute)
