import React from 'react'
import {
  CButton,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CSpinner,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import { useChangePassword } from './hooks'
import { CiPaperplane } from 'react-icons/ci'
import { ChangePasswordSchema } from './schema'

const ChangePassword = () => {
  const { formValue, handleSubmit } = useChangePassword()

  return (
    <div>
      <div className="bg-white p-4 rounded">
        <Formik
          enableReinitialize
          initialValues={formValue}
          onSubmit={handleSubmit}
          validationSchema={ChangePasswordSchema}
        >
          {({ handleChange, setFieldValue, errors, isValid, dirty, isSubmitting, values }) => {
            return (
              <Form>
                <div className="row">
                  <div className="col-4">
                    <CFormLabel className="text-primary fw-semibold">Current Password</CFormLabel>
                    <Field
                      name="old_password"
                      placeholder="Enter Current Password"
                      value={values?.old_password}
                      onChange={handleChange}
                      required
                      as={CFormInput}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <CFormLabel className="text-primary fw-semibold">New Password</CFormLabel>
                    <CInputGroup>
                      <Field
                        name="new_password"
                        placeholder="Enter New Password"
                        value={values?.new_password}
                        invalid={errors?.new_password}
                        className="rounded-end"
                        onChange={handleChange}
                        required
                        as={CFormInput}
                      />
                      <CFormFeedback invalid={errors.new_password}>
                        {errors.new_password}
                      </CFormFeedback>
                    </CInputGroup>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Confirm New Password
                    </CFormLabel>
                    <CInputGroup>
                      <Field
                        name="confirm_password"
                        placeholder="Confirm New Password"
                        className="rounded-end"
                        value={values?.confirm_password}
                        invalid={errors?.confirm_password}
                        onChange={handleChange}
                        required
                        as={CFormInput}
                      />
                      <CFormFeedback invalid={errors.confirm_password}>
                        {errors.confirm_password}
                      </CFormFeedback>
                    </CInputGroup>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-4">
                    <CButton disabled={isSubmitting} color="primary" type="submit">
                      <div className="flex items-center justify-center text-neutral-white">
                        {isSubmitting ? (
                          <>
                            Submit <CSpinner className="ms-2" color="light" size="sm" />
                          </>
                        ) : (
                          <>
                            Submit <CiPaperplane className="ms-2" />
                          </>
                        )}
                      </div>
                    </CButton>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default ChangePassword
