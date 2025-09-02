import React, { Fragment } from 'react'
import useFailureCodeRemediesForm from './hooks/useFailureCodeRemediesForm'
import { Field, Formik, Form, FieldArray } from 'formik'
import { CButton, CFooter, CFormInput, CFormLabel, CSpinner } from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import { failureCodeRemediesAddSchema } from './schema/failureCodeSchema'
import { BsTrash } from 'react-icons/bs'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

const FailureCodeRemediesForm = ({ mode, setAction, setTabIndex }) => {
  const { selectedProblemRow, selectedCausesRow, formValue, isLoading, handleSubmit } =
    useFailureCodeRemediesForm({
      mode,
      setAction,
      setTabIndex,
    })

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={formValue}
        validationSchema={failureCodeRemediesAddSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isValid, isSubmitting, values, errors, touched, dirty }) => {
          return (
            <Form>
              <DetailCard isLoading={isLoading}>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="w-full text-body-bold">
                      {mode === 'UpdateRemedies' ? 'Edit' : 'Create'} Remedy
                    </h4>
                    <div className="flex">
                      <p>
                        <span className="text-neutral-text-disabled">
                          {mode === 'UpdateRemedies' ? 'Update' : 'Create'} this column to add
                          remedy
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="py-1" />
                <div className="container-fluid">
                  <div className="row">
                    {selectedProblemRow?.failure_code ? (
                      <Fragment>
                        <div className="col-md-3 mb-4">
                          <CFormLabel className="text-primary fw-semibold">Problem</CFormLabel>
                          <br />
                          <span className="font-semibold">
                            {selectedProblemRow?.failure_code || '-'}
                          </span>
                        </div>
                        <div className="col-md-3 mb-4">
                          <CFormLabel className="text-primary fw-semibold">
                            Problem Description
                          </CFormLabel>
                          <br />
                          <span className="font-semibold">
                            {selectedProblemRow?.description || '-'}
                          </span>
                        </div>
                      </Fragment>
                    ) : null}
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Causes</CFormLabel>
                      <br />
                      <span className="font-semibold">
                        {selectedCausesRow?.failure_code || '-'}
                      </span>
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Causes Description
                      </CFormLabel>
                      <br />
                      <span className="font-semibold">{selectedCausesRow?.description || '-'}</span>
                    </div>
                  </div>
                  <hr />
                  <FieldArray
                    name="remedies"
                    render={(arrayHelpers) =>
                      values.remedies?.map((item, index) => {
                        return (
                          <Fragment key={index}>
                            {mode === 'Remedies' && (
                              <div className="flex mb-3">
                                <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                  <span className="text-white mb-1">{index + 1}</span>
                                </div>
                                {values.remedies.length > 1 && (
                                  <CButton
                                    color="danger"
                                    variant="outline"
                                    className="hover:text-white"
                                    disabled={isSubmitting}
                                    onClick={() => {
                                      arrayHelpers.remove(index)
                                    }}
                                  >
                                    <BsTrash />
                                  </CButton>
                                )}
                              </div>
                            )}
                            <div className="row">
                              <div className="col-md-3">
                                <CFormLabel className="text-primary fw-semibold">
                                  Remedy <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name={`remedies.${index}.failure_code`}
                                  placeholder="Enter Remedy"
                                  value={item.failure_code}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `remedies.${index}.failure_code`,
                                      event?.target?.value,
                                    )
                                  }}
                                  as={CFormInput}
                                />
                                {errors?.failure_code && touched?.failure_code ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {errors?.failure_code}
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-md-3">
                                <CFormLabel className="text-primary fw-semibold">
                                  Remedy Description <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name={`remedies.${index}.description`}
                                  placeholder="Enter Remedy Description"
                                  value={item.description}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `remedies.${index}.description`,
                                      event?.target?.value,
                                    )
                                  }}
                                  as={CFormInput}
                                />
                                {errors?.description && touched?.description ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {errors?.description}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <hr />
                            {mode === 'Remedies' && (
                              <div className="w-full">
                                {index + 1 === values.remedies.length && (
                                  <CButton
                                    color="primary"
                                    variant="outline"
                                    className="hover:text-white"
                                    disabled={isSubmitting}
                                    onClick={() => {
                                      arrayHelpers.push({
                                        failure_code: '',
                                        remedies: '',
                                      })
                                    }}
                                  >
                                    <CIcon icon={cilPlus} className="me-2" /> Add New Remedy
                                  </CButton>
                                )}
                              </div>
                            )}
                          </Fragment>
                        )
                      })
                    }
                  />
                </div>
              </DetailCard>
              <CFooter className="form-footer">
                <div className="ml-[80px] w-full my-2 flex items-center justify-between">
                  <CButton
                    color="danger"
                    variant="outline"
                    onClick={() => {
                      setAction('Read')
                    }}
                  >
                    Cancel
                  </CButton>
                  <CButton
                    color="primary"
                    className="hover:text-white"
                    disabled={!(isValid && dirty) || isSubmitting}
                    type="submit"
                  >
                    <div className="flex items-center">
                      {isSubmitting ? (
                        <>
                          {mode === 'UpdateRemedies' ? 'Update' : 'Submit'}{' '}
                          <CSpinner className="ms-2" color="light" size="sm" />
                        </>
                      ) : (
                        <>
                          {mode === 'UpdateRemedies' ? 'Update' : 'Submit'}{' '}
                          <CiPaperplane className="ms-2" />
                        </>
                      )}
                    </div>
                  </CButton>
                </div>
              </CFooter>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default FailureCodeRemediesForm
