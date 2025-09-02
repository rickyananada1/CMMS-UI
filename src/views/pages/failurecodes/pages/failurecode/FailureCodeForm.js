import React from 'react'
import useFailureCodeForm from './hooks/useFailureCodeForm'
import { Field, FieldArray, Formik, Form } from 'formik'
import { CButton, CFooter, CFormInput, CFormLabel, CFormTextarea, CSpinner } from '@coreui/react'
import { BsTrash } from 'react-icons/bs'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import { failureCodeSchema } from './schema/failureCodeSchema'

const FailureCodeForm = ({ mode, setAction, setTabIndex }) => {
  const { formValue, isLoading, handleSubmit } = useFailureCodeForm({
    mode,
    setAction,
    setTabIndex,
  })

  const isOnEdit = mode === 'Update'

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={formValue}
        validationSchema={failureCodeSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values, errors, touched, isValid, dirty }) => {
          return (
            <Form>
              <DetailCard isLoading={isLoading}>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="w-full text-body-bold">
                      {isOnEdit ? 'Edit' : 'Create'} Failure Code
                    </h4>
                    <div className="flex">
                      <p>
                        <span className="text-neutral-text-disabled">
                          {isOnEdit ? 'Update' : 'Create'} this column to add failure code, problem
                          & causes
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="py-1" />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Failure Code <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name={`failure_class.failure_code`}
                        placeholder="Enter Failure Code"
                        value={values.failure_class.failure_code}
                        onChange={(event) => {
                          setFieldValue(`failure_class.failure_code`, event?.target?.value)
                        }}
                        disabled={isOnEdit}
                        as={CFormInput}
                      />
                      {errors?.failure_class?.failure_code &&
                      touched?.failure_class?.failure_code ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors?.failure_class?.failure_code}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Failure Code Description
                      </CFormLabel>
                      <Field
                        name={`failure_class.description`}
                        placeholder="Enter Failure Code Description"
                        value={values.failure_class.description}
                        onChange={(event) => {
                          setFieldValue(`failure_class.description`, event?.target?.value)
                        }}
                        as={CFormTextarea}
                      />
                      {errors?.failure_class?.description && touched?.failure_class?.description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors?.failure_class?.description}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Problem <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name={`problem.failure_code`}
                        placeholder="Enter Problem Code"
                        value={values.problem.failure_code}
                        onChange={(event) => {
                          setFieldValue(`problem.failure_code`, event?.target?.value)
                        }}
                        disabled={isOnEdit}
                        as={CFormInput}
                      />
                      {errors?.problem?.failure_code && touched?.problem?.failure_code ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors?.problem?.failure_code}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Problem Description <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name={`problem.description`}
                        placeholder="Enter Problem Description"
                        value={values.problem.description}
                        onChange={(event) => {
                          setFieldValue(`problem.description`, event?.target?.value)
                        }}
                        as={CFormTextarea}
                      />
                      {errors?.problem?.description && touched?.problem?.description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors?.problem?.description}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <FieldArray
                    name="problem.cause"
                    render={(arrayHelpers) =>
                      values?.problem?.cause.map((item, index) => {
                        return (
                          <div className="my-2" key={`${index}-new-cause`}>
                            <div className="flex">
                              <div className="bg-primary-main rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                <span className="text-white mb-1">{index + 1}</span>
                              </div>
                              {values?.problem?.cause?.length > 1 && (
                                <CButton
                                  color="danger"
                                  variant="outline"
                                  className="hover:text-white"
                                  onClick={() => {
                                    arrayHelpers.remove(index)
                                  }}
                                >
                                  <BsTrash />
                                </CButton>
                              )}
                            </div>
                            <div className="my-4">
                              <div className="row">
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Causes <span className="text-red-main">*</span>
                                  </CFormLabel>
                                  <Field
                                    name={`problem.cause.${index}.failure_code`}
                                    placeholder="Enter Causes"
                                    value={item.failure_code}
                                    onChange={(event) => {
                                      setFieldValue(
                                        `problem.cause.${index}.failure_code`,
                                        event?.target?.value,
                                      )
                                    }}
                                    as={CFormInput}
                                  />
                                  {errors?.problem?.cause &&
                                  errors?.problem?.cause[index]?.failure_code &&
                                  touched?.problem?.cause &&
                                  touched?.problem?.cause[index]?.failure_code ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors?.problem?.cause[index]?.failure_code}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Causes Description <span className="text-red-main">*</span>
                                  </CFormLabel>
                                  <Field
                                    name={`problem.cause.${index}.description`}
                                    placeholder="Enter Causes Description"
                                    value={item?.description}
                                    onChange={(event) => {
                                      setFieldValue(
                                        `problem.cause.${index}.description`,
                                        event?.target?.value,
                                      )
                                    }}
                                    as={CFormTextarea}
                                  />
                                  {errors?.problem?.cause &&
                                  errors?.problem?.cause[index]?.description &&
                                  touched?.problem?.cause &&
                                  touched?.problem?.cause[index]?.description ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors?.problem?.cause[index]?.description}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <hr />
                              <div className="w-full">
                                {index + 1 === values.problem?.cause?.length && (
                                  <CButton
                                    color="primary"
                                    variant="outline"
                                    className="hover:text-white"
                                    onClick={() => {
                                      arrayHelpers.push({ failure_code: '', description: '' })
                                    }}
                                  >
                                    <CIcon icon={cilPlus} className="me-2" />
                                    Add Causes
                                  </CButton>
                                )}
                              </div>
                            </div>
                          </div>
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
                          {isOnEdit === 'Update' ? 'Update' : 'Submit'}{' '}
                          <CSpinner className="ms-2" color="light" size="sm" />
                        </>
                      ) : (
                        <>
                          {isOnEdit === 'Update' ? 'Update' : 'Submit'}{' '}
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

export default FailureCodeForm
