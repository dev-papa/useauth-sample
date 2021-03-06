import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom'
import { ProvideAuth, useAuth } from './auth'
import PrivateRoute from './PrivateRoute'
import LoginPage from './Login'
// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

export default function AuthExample () {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <ul>
            <li>
              <Link to='/public'>Public Page</Link>
            </li>
            <li>
              <Link to='/protected'>Protected Page</Link>
            </li>
          </ul>

          <Switch>
            <Route path='/public'>
              <PublicPage />
            </Route>
            <Route path='/login'>
              <LoginPage />
            </Route>
            <PrivateRoute path='/protected'>
              <ProtectedPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  )
}

function AuthButton () {
  const history = useHistory()
  const auth = useAuth()

  return auth.user
    ? (
      <p>
        Welcome!{' '}
        <button
          onClick={() => {
            auth.signout(() => history.push('/'))
          }}
        >
          Sign out
        </button>
      </p>
      )
    : (
      <p>You are not logged in.</p>
      )
}

function PublicPage () {
  return <h3>Public</h3>
}

function ProtectedPage () {
  return <h3>Protected</h3>
}
