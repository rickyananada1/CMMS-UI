import React, { useState } from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CSpinner,
} from '@coreui/react'
import { BsExclamationTriangle, BsEye, BsEyeSlash } from 'react-icons/bs'

import useChangePassword from './hooks/useChangePassword'

import ProfilePlaceholder from 'src/assets/icons/profile-placeholder.svg'
import RegisterBackground from 'src/assets/images/register_background.svg'
import CheckTag from 'src/assets/icons/check-tag.svg'
import XTag from 'src/assets/icons/x-tag.svg'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword)
  }

  const { profileData, formValue, handleSubmit, errorMessage, userType } = useChangePassword()
  const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })

  return (
    <div
      className="bg-cover min-w-screen min-h-screen"
      style={{ backgroundImage: `url(${RegisterBackground})` }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white w-2/5 p-6 rounded-lg flex flex-col gap-6">
          <div>
            <div className="font-semibold text-2xl mb-1">Welcome to CMMS</div>
            <span className="text-gray-400">
              Let’s start with changing your password first before accessing CMMS!
            </span>
          </div>
          <hr className="my-0" />
          <div className="flex gap-4">
            <img className="h-20" src={ProfilePlaceholder} alt="Profile Placeholder" />
            <div className="flex flex-col gap-1 text-gray-400">
              <span className="text-black text-xl font-semibold">
                {profileData.display_name ?? '-'}
              </span>
              <span>{profileData.email ?? '-'}</span>
              <span>{userType(profileData?.type)}</span>
            </div>
          </div>
          <Formik
            initialValues={formValue}
            validationSchema={ChangePasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, errors, isValid, dirty, isSubmitting, values }) => {
              return (
                <Form>
                  <div className="mb-3">
                    <CFormLabel className="fw-semibold">New Password</CFormLabel>
                    <CInputGroup className="mb-4">
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="New Password"
                        autoComplete="current-password"
                        size="md"
                        value={values.password}
                        invalid={errors.password}
                        handleChange={handleChange('password')}
                        className="right-border-none"
                        as={CFormInput}
                      />
                      <CInputGroupText
                        className={`transparent rounded-end ${errors.password && 'border-danger'}`}
                      >
                        <button
                          className="btn"
                          type="button"
                          color="secondary"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <BsEye className={errors.password && 'text-danger'} size={20} />
                          ) : (
                            <BsEyeSlash className={errors.password && 'text-danger'} size={20} />
                          )}
                        </button>
                      </CInputGroupText>
                    </CInputGroup>
                  </div>
                  <div className="mb-3">
                    <CFormLabel className="fw-semibold">Confirm New Password</CFormLabel>
                    <CInputGroup className="mb-4">
                      <Field
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        autoComplete="current-password"
                        size="md"
                        value={values.confirmPassword}
                        invalid={errors.confirmPassword}
                        handleChange={handleChange('confirmPassword')}
                        className="right-border-none"
                        as={CFormInput}
                      />
                      <CInputGroupText
                        className={`transparent rounded-end ${
                          errors.confirmPassword && 'border-danger'
                        }`}
                      >
                        <button
                          className="btn w-full"
                          type="button"
                          color="secondary"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? (
                            <BsEye className={errors.confirmPassword && 'text-danger'} size={20} />
                          ) : (
                            <BsEyeSlash
                              className={errors.confirmPassword && 'text-danger'}
                              size={20}
                            />
                          )}
                        </button>
                      </CInputGroupText>
                      <CFormFeedback invalid={errors.confirmPassword}>
                        {errors.confirmPassword}
                      </CFormFeedback>
                    </CInputGroup>
                  </div>
                  <div className="w-full bg-info-surface rounded-lg">
                    <div className="flex flex-col gap-1 px-4 py-3">
                      <div className="mb-1 font-semibold text-lg">Minimum Requirement</div>
                      <div className="flex items-center gap-2">
                        <img
                          className="h-full"
                          src={values.password.length >= 8 ? CheckTag : XTag}
                          alt="requirement checkmark 1"
                        />
                        8 characters minimum
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          className="h-full"
                          src={/\d/.test(values.password) ? CheckTag : XTag}
                          alt="requirement checkmark 2"
                        />
                        Includes number
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          className="h-full"
                          src={/[A-Z]/.test(values.password) ? CheckTag : XTag}
                          alt="requirement checkmark 3"
                        />
                        Includes uppercase letter
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          className="h-full"
                          src={/[a-z]/.test(values.password) ? CheckTag : XTag}
                          alt="requirement checkmark 4"
                        />
                        Includes lowercase letter
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          className="h-full"
                          src={
                            /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(values.password)
                              ? CheckTag
                              : XTag
                          }
                          alt="requirement checkmark 5"
                        />
                        Includes one special character / symbol (unicode)
                      </div>
                    </div>
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
                      onClick={() => navigate('../')}
                    >
                      {isSubmitting ? <CSpinner color="light" /> : 'Cancel'}
                    </CButton>
                    <CButton
                      color="primary"
                      type="submit"
                      size="md"
                      className="w-25"
                      disabled={!(isValid && dirty) || isSubmitting}
                    >
                      {isSubmitting ? <CSpinner color="light" /> : 'Apply'}
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

export default Register
