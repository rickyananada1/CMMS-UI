import React, { Fragment, useState } from 'react'
import * as Yup from 'yup'
import {
  CButton,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import CheckTag from 'src/assets/icons/check-tag.svg'
import XTag from 'src/assets/icons/x-tag.svg'
import useChangePassword from './hooks/useChangePassword'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const ModalChangePassword = (props) => {
  const { visible, setVisible } = props

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword)
  }
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prevShowOldPassword) => !prevShowOldPassword)
  }

  const { formValue, handleSubmit } = useChangePassword({ setVisible })
  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })

  return (
    <Fragment>
      <CModal
        backdrop="static"
        alignment="center"
        size="lg"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="changepassword"
        scrollable
      >
        <CModalHeader>
          <CModalTitle id="changepassword">
            <h5 className="heading-small">Change Password</h5>
          </CModalTitle>
        </CModalHeader>
        <Formik
          initialValues={formValue}
          validationSchema={ChangePasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, errors, isValid, dirty, isSubmitting, values }) => {
            return (
              <Form>
                <CModalBody>
                  <div className="bg-white rounded-lg flex flex-col">
                    <div>
                      <CFormLabel className="fw-semibold">Old Password</CFormLabel>
                      <CInputGroup className="mb-4">
                        <Field
                          type={showOldPassword ? 'text' : 'password'}
                          name="oldPassword"
                          placeholder="Old Password"
                          autoComplete="current-password"
                          size="md"
                          value={values.oldPassword}
                          invalid={errors.oldPassword}
                          handleChange={handleChange('oldPassword')}
                          className="right-border-none"
                          as={CFormInput}
                        />
                        <CInputGroupText
                          className={`transparent rounded-end ${
                            errors.oldPassword && 'border-danger'
                          }`}
                        >
                          <button
                            className="btn w-full"
                            type="button"
                            color="secondary"
                            onClick={toggleOldPasswordVisibility}
                          >
                            {showOldPassword ? (
                              <BsEye className={errors.oldPassword && 'text-danger'} size={20} />
                            ) : (
                              <BsEyeSlash
                                className={errors.oldPassword && 'text-danger'}
                                size={20}
                              />
                            )}
                          </button>
                        </CInputGroupText>
                        <CFormFeedback invalid={errors.oldPassword}>
                          {errors.oldPassword}
                        </CFormFeedback>
                      </CInputGroup>
                    </div>
                    <div>
                      <CFormLabel className="fw-semibold">New Password</CFormLabel>
                      <CInputGroup className="mb-4">
                        <Field
                          type={showPassword ? 'text' : 'password'}
                          name="newPassword"
                          placeholder="New Password"
                          autoComplete="new-password"
                          size="md"
                          value={values?.newPassword}
                          invalid={errors?.newPassword}
                          handleChange={handleChange('password')}
                          className="right-border-none"
                          as={CFormInput}
                        />
                        <CInputGroupText
                          className={`transparent rounded-end ${
                            errors?.newPassword && 'border-danger'
                          }`}
                        >
                          <button
                            className="btn"
                            type="button"
                            color="secondary"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <BsEye className={errors?.newPassword && 'text-danger'} size={20} />
                            ) : (
                              <BsEyeSlash
                                className={errors?.newPassword && 'text-danger'}
                                size={20}
                              />
                            )}
                          </button>
                        </CInputGroupText>
                      </CInputGroup>
                    </div>
                    <div>
                      <CFormLabel className="fw-semibold">Confirm New Password</CFormLabel>
                      <CInputGroup className="mb-4">
                        <Field
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          autoComplete="confirm-password"
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
                              <BsEye
                                className={errors.confirmPassword && 'text-danger'}
                                size={20}
                              />
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
                            src={values?.newPassword.length >= 8 ? CheckTag : XTag}
                            alt="requirement checkmark 1"
                          />
                          8 characters minimum
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            className="h-full"
                            src={/\d/.test(values?.newPassword) ? CheckTag : XTag}
                            alt="requirement checkmark 2"
                          />
                          Includes number
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            className="h-full"
                            src={/[A-Z]/.test(values?.newPassword) ? CheckTag : XTag}
                            alt="requirement checkmark 3"
                          />
                          Includes uppercase letter
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            className="h-full"
                            src={/[a-z]/.test(values?.newPassword) ? CheckTag : XTag}
                            alt="requirement checkmark 4"
                          />
                          Includes lowercase letter
                        </div>
                        <div className="flex items-center gap-2">
                          <img
                            className="h-full"
                            src={
                              /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(values?.newPassword)
                                ? CheckTag
                                : XTag
                            }
                            alt="requirement checkmark 5"
                          />
                          Includes one special character (
                          {' ! @ # $ % ^ & * ( ) _ + - = { } [ ] | : ; " \' < > , . ? / ~ '})
                        </div>
                      </div>
                    </div>
                  </div>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="none"
                    type="button"
                    size="md"
                    className="w-20 text-primary hover:bg-primary-border outline-none"
                    onClick={() => !isSubmitting && setVisible(false)}
                  >
                    Cancel
                  </CButton>
                  <CButton
                    color="primary"
                    type="submit"
                    size="md"
                    className="w-20"
                    disabled={!(isValid && dirty) || isSubmitting}
                  >
                    {isSubmitting ? <CSpinner size="sm" color="light" /> : 'Confirm'}
                  </CButton>
                </CModalFooter>
              </Form>
            )
          }}
        </Formik>
      </CModal>
    </Fragment>
  )
}

export default ModalChangePassword
