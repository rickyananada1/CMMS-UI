import React from 'react'
import { CCard, CCardBody, CSpinner } from '@coreui/react'

// eslint-disable-next-line react/prop-types
export const DetailCard = ({ isLoading = false, children, className = 'p-0 mb-20' }) => {
  return (
    <div className={className}>
      <CCard className="card-b-left">
        <CCardBody className="px-4 py-4">
          {isLoading ? (
            <div className="flex justify-center">
              <CSpinner color="primary" className="my-4" />
            </div>
          ) : (
            <div>{children}</div>
          )}
        </CCardBody>
      </CCard>
    </div>
  )
}
