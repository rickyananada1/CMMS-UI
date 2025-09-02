import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PublicRouteAdmin = ({ Component }) => {
  const [token] = useState(localStorage.getItem('access_token'))

  return !token ? (
    <Component />
  ) : token ? (
    <Navigate to={'/page/dashboard'} />
  ) : (
    <Navigate to={{ pathname: '/' }} />
  )
}

export default PublicRouteAdmin
