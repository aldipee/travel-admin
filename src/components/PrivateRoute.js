import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        auth.isLogin ? <Component {...props} /> : <Redirect to={{ pathname: '/auth/login' }} />
      }
    />
  )
}
const mapStateToProps = (state) => {
  return {
    auth: state.Auth
  }
}

export default connect(mapStateToProps, {})(PrivateRoute)
