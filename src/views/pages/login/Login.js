import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import {
  CButton,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CSpinner,
} from '@coreui/react'
import { BsExclamationTriangle, BsEye, BsEyeSlash } from 'react-icons/bs'
import * as Yup from 'yup'

// Assets
import LogoPln from 'src/assets/images/pln_logo.png'
import FooterLogin from 'src/assets/images/footer-login.png'
import LogoCmmsBig from 'src/assets/images/cmms-big-new-logo.png'
import useLogin from './hooks/useLogin'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const { formValue, handleSubmit, errorMessage } = useLogin()
  const SigninSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  })

  return (
    <div className="bg-white">
      <div className="flex-row bg-color-login min-vh-100 d-flex">
        <div className="col inverted-bg d-flex flex-column justify-content-between">
          <div className="px-4 my-4 w-100">
            <img className="sidebar-brand-full" src={LogoPln} height={35} alt="logo_lite" />
          </div>
          <div className="px-4 my-4 w-100">
            <div className="d-flex flex-column justify-content-center align-items-center text-light">
              <img className="" src={LogoCmmsBig} alt="big_logo" width={400} />
            </div>
          </div>
          <div className="w-100">
            <img className="sidebar-brand-full" src={FooterLogin} height={100} alt="logo_lite" />
          </div>
        </div>
        <div className="col">
          <div className="bg-white h-100" style={{ borderTopLeftRadius: '100px' }}>
            <div className="px-4 mx-3 d-flex justify-content-center align-items-center h-100">
              <div className="w-75">
                <div className="mb-5">
                  <p className="fs-1 fw-semibold">Login</p>
                  <p className="text-medium-emphasis">
                    Please log in first to access the application
                  </p>
                </div>
                <Formik
                  initialValues={formValue}
                  validationSchema={SigninSchema}
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
                            name="username"
                            placeholder="Type Email address/Username"
                            feedbackInvalid={errors.username}
                            onChange={handleChange('username')}
                            size="lg"
                            required
                            as={CFormInput}
                          />
                        </div>
                        <div className="mb-5">
                          <CFormLabel className="text-primary fw-semibold">Password</CFormLabel>
                          <CInputGroup className="mb-4">
                            <Field
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              placeholder="Password"
                              autoComplete="current-password"
                              size="lg"
                              value={values.password}
                              feedbackInvalid={errors.password}
                              onChange={handleChange('password')}
                              className="right-border-none"
                              as={CFormInput}
                            />
                            <CInputGroupText className="transparent">
                              <button
                                className="btn"
                                type="button"
                                color="secondary"
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? <BsEye size={20} /> : <BsEyeSlash size={20} />}
                              </button>
                            </CInputGroupText>
                          </CInputGroup>
                        </div>
                        {errorMessage && (
                          <div
                            className="alert alert-danger d-flex align-items-center"
                            role="alert"
                          >
                            <div className="mx-3">
                              <BsExclamationTriangle size={50} />
                            </div>
                            <div>
                              <h5 className="alert-heading">Error!</h5>
                              <p>{errorMessage}</p>
                            </div>
                          </div>
                        )}
                        <CCol className="mt-5 text-center">
                          <CCol xs={12}>
                            <CButton
                              color="primary"
                              type="submit"
                              size="lg"
                              className="w-100"
                              disabled={!(isValid && dirty) || isSubmitting}
                            >
                              {isSubmitting ? <CSpinner color="light" /> : 'Login'}
                            </CButton>
                          </CCol>
                          <CCol xs={12} className="mt-4">
                            <Link
                              to="/forgot-password"
                              className="p-3 text-decoration-none fs-6 fw-semibold"
                            >
                              Forgot password
                            </Link>
                          </CCol>
                        </CCol>
                      </Form>
                    )
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
