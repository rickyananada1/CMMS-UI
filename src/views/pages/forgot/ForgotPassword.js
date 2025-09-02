import React from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { CButton, CFormInput, CFormLabel, CSpinner } from '@coreui/react'
import { BsExclamationTriangle } from 'react-icons/bs'

import useChangePassword from './hooks/useForgotPassword'
import { useNavigate } from 'react-router-dom'

import RegisterBackground from 'src/assets/images/register_background.svg'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const { formValue, handleSubmit, errorMessage } = useChangePassword()
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Username/Email is required'),
  })

  return (
    <div
      className="bg-cover min-w-screen min-h-screen"
      style={{ backgroundImage: `url(${RegisterBackground})` }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white w-2/5 p-6 rounded-lg flex flex-col gap-6">
          <div>
            <div className="font-semibold text-2xl mb-1">Forgot Password</div>
            <span className="text-gray-400">
              If you forgot your password, just enter your email/username address, and we`ll send
              link to your email right away.
            </span>
          </div>
          <hr className="my-0" />
          <Formik
            initialValues={formValue}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, errors, isValid, dirty, isSubmitting, values }) => {
              return (
                <Form>
                  <div className="mb-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Email address/Username
                    </CFormLabel>
                    <Field
                      name="email"
                      placeholder="Type Email address/Username"
                      feedbackInvalid={errors.email}
                      onChange={handleChange('email')}
                      size="md"
                      required
                      as={CFormInput}
                    />
                  </div>
                  {errorMessage && (
                    <div className="alert alert-danger d-flex align-items-center mt-6" role="alert">
                      <div className="mx-3">
                        <BsExclamationTriangle size={50} />
                      </div>
                      <div>
                        <h5 className="alert-heading">Error!</h5>
                        <p>{errorMessage}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end mt-6 gap-4">
                    <CButton
                      color="none"
                      type="button"
                      size="md"
                      className="w-25 text-primary hover:bg-slate-200 outline-none"
                      onClick={() => !isSubmitting && navigate('../')}
                    >
                      Cancel
                    </CButton>
                    <CButton
                      color="primary"
                      type="submit"
                      size="md"
                      className="w-25"
                      disabled={!(isValid && dirty) || isSubmitting}
                    >
                      {isSubmitting ? <CSpinner size="sm" color="light" /> : 'Send'}
                    </CButton>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
