import React from 'react'
import { Navigate } from 'react-router-dom'
import { getProfile } from 'src/views/pages/login/services'

// eslint-disable-next-line react/prop-types
const PrivateRouteAdmin = ({ Component }) => {
  const token = localStorage.getItem('access_token')

  // eslint-disable-next-line no-unused-vars
  const { data, error, isLoading } = getProfile({
    config: {
      enabled: !!token,
    },
  })

  if (isLoading) return null

  if (!token || error) {
    localStorage.removeItem('access_token')
    return <Navigate to="/" replace />
  }

  return <Component />
}

export default PrivateRouteAdmin
