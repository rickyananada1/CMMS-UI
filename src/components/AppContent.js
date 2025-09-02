import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const loading = (
  <div className="w-full h-[100vh] flex justify-center items-center">
    <CSpinner color="primary" />
  </div>
)

const AppContent = () => {
  return (
    <CContainer fluid>
      <Suspense fallback={loading}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
