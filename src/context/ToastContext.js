import React, { createContext, useContext, useState, useRef } from 'react'
import { CToaster, CToast, CToastHeader, CToastBody } from '@coreui/react'
import { BsCheckCircleFill, BsExclamationTriangleFill } from 'react-icons/bs'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const showToast = (type = 'success', message = 'Success!') => {
    console.log('[Toast] showing:', type, message)

    const toastElement = (
      <CToast autohide={3000} style={{ border: 'none' }}>
        <CToastHeader closeButton>
          <div className="d-flex justify-content-between align-items-center w-100 me-3">
            <span className="me-auto d-flex align-items-center font-semibold">
              {type === 'success' ? (
                <BsCheckCircleFill className="text-success me-2" />
              ) : (
                <BsExclamationTriangleFill className="text-warning me-2" />
              )}
              {type === 'success' ? 'Success' : 'Error'}
            </span>
          </div>
        </CToastHeader>
        <CToastBody>{message}</CToastBody>
      </CToast>
    )

    addToast(toastElement)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <CToaster ref={toaster} push={toast} placement="top-end" style={{ zIndex: 1100 }} />
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
