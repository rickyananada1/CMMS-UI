import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import PrivateRouteAdmin from './utils/PrivateRoute'
import PublicRouteAdmin from './utils/PublicRoute'
import ForgotPassword from './views/pages/forgot/ForgotPassword'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
// const ForgotPassword = React.lazy(() => import('./views/pages/forgot-password/ForgotPassword'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              exact
              path="/:page/*"
              name="Dashboard"
              element={<PrivateRouteAdmin Component={DefaultLayout} />}
            />
            <Route exact path="/change-password" name="Register Page" element={<Register />} />
            <Route
              exact
              path="/forgot-password"
              name="Forgot Password Page"
              element={<PublicRouteAdmin Component={ForgotPassword} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              element={<PrivateRouteAdmin Component={Page404} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              element={<PrivateRouteAdmin Component={Page500} />}
            />
            <Route path="/" name="Login" element={<PublicRouteAdmin Component={Login} />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
