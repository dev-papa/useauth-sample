import React from 'react'
import { useAuth } from './auth'
import { Route, Redirect } from 'react-router-dom'
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user
          ? (
              children
            )
          : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
            )}
    />
  )
}

export default PrivateRoute
