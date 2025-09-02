import { CButton, CFooter, CFormInput, CFormLabel, CSpinner } from '@coreui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import React from 'react'
import useFailureReportingForm from './hooks/useFailureReportingForm'
import { CiPaperplane } from 'react-icons/ci'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { BsTrash } from 'react-icons/bs'
import { SelectPagination } from 'src/components/elements/select'
import { failureReportingSchema } from './schema'
import { DetailCard } from 'src/components/elements/cards'

// eslint-disable-next-line react/prop-types
const FailureReportingsForm = ({ mode, setAction, setTabIndex }) => {
  const {
    isLoading,
    formValue,
    handleSubmit,
    getFailureCodeList,
    selectedRow,
    duplicateFailureCodeError,
  } = useFailureReportingForm({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <DetailCard isLoading={isLoading}>
      <Formik
        enableReinitialize
        initialValues={formValue}
        onSubmit={handleSubmit}
        validationSchema={failureReportingSchema}
      >
        {({
          handleChange,
          setFieldValue,
          setFieldTouched,
          errors,
          isValid,
          dirty,
          isSubmitting,
          values,
          touched,
        }) => {
          return (
            <Form className="mb-3">
              {mode === 'Create Failure' && (
                <div>
                  <h4 className="w-font-semibold">Add Failure Reporting</h4>
                  <p>Fill this column to add new failure reporting</p>
                </div>
              )}
              {mode === 'Update Failure' && (
                <div>
                  <h4 className="w-font-semibold">Update Failure Reporting</h4>
                  <p>Fill this column to update failure reporting</p>
                </div>
              )}

              <hr />
              <div className="container-fluid">
                <FieldArray
                  name="failure_reporting"
                  render={(arrayHelpers) => (
                    <div>
                      {values?.failure_reporting?.map((item, index) => {
                        return (
                          <div className="my-2" key={index}>
                            <div className="flex">
                              {mode === 'Create Failure' && (
                                <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                  <span className="text-white mb-1">{index + 1}</span>
                                </div>
                              )}
                              {!item?.work_order_failure_id && index > 0 && (
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
                            <Field
                              className={'hidden'}
                              name={`failure_reporting.${index}.work_order_failure_id`}
                              value={item?.work_order_failure_id}
                            />
                            <div className="my-4">
                              <div className="row">
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Failure Class <span className="text-red-main">*</span>
                                  </CFormLabel>
                                  <Field
                                    name={`failure_reporting.${index}.failure_code_id`}
                                    placeholder="Select Failure Class"
                                    apiController={getFailureCodeList}
                                    value={item?.failure_code_id}
                                    valueKey="failure_code_id"
                                    labelKey="failure_code"
                                    parentId={selectedRow?.work_order_id}
                                    onChange={(val) => {
                                      if (
                                        !values.failure_reporting.some(
                                          (e, i) =>
                                            e?.failure_code_id?.value === val?.value && i !== index,
                                        )
                                      ) {
                                        setFieldValue(
                                          `failure_reporting.${index}.failure_code_id`,
                                          val,
                                        )
                                      } else {
                                        setFieldValue(
                                          `failure_reporting.${index}.failure_code_id`,
                                          null,
                                        )
                                        duplicateFailureCodeError()
                                      }
                                    }}
                                    onBlur={() =>
                                      setFieldTouched(
                                        `failure_reporting.${index}.failure_code_id`,
                                        true,
                                      )
                                    }
                                    size="md"
                                    required={errors?.failure_reporting?.[index]?.failure_code_id}
                                    otherKey={{
                                      description: 'description',
                                      organization_name: 'organization_name',
                                    }}
                                    searchKey="search"
                                    as={SelectPagination}
                                  />
                                  {errors?.failure_reporting?.[index]?.failure_code_id &&
                                  touched?.failure_reporting?.[index]?.failure_code_id ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.failure_reporting?.[index]?.failure_code_id}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Description
                                  </CFormLabel>
                                  <Field
                                    name={`failure_reporting.${index}.description`}
                                    placeholder="No Description"
                                    value={item?.failure_code_id?.description}
                                    disabled
                                    size="md"
                                    as={CFormInput}
                                  />
                                </div>
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Organization
                                  </CFormLabel>
                                  <Field
                                    name={`failure_reporting.${index}.organization_name`}
                                    className="capitalize"
                                    placeholder="No Organization"
                                    value={item?.failure_code_id?.organization_name}
                                    size="md"
                                    disabled
                                    as={CFormInput}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      {values.failure_reporting.length < 1 && <span>No Failure Reporting</span>}
                      <hr />
                      <div className="w-full">
                        {mode !== 'Update Failure' && (
                          <CButton
                            color="primary"
                            variant="outline"
                            className="hover:text-white"
                            onClick={() => {
                              arrayHelpers.push({ work_order_failure_id: null })
                            }}
                          >
                            <CIcon icon={cilPlus} className="me-2" /> Add Failure Reporting
                          </CButton>
                        )}
                      </div>
                    </div>
                  )}
                />
              </div>
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
                    disabled={isSubmitting || !dirty}
                    color="primary"
                    className="hover:text-white"
                    type="submit"
                  >
                    <div className="flex items-center justify-center">
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
              </CFooter>
            </Form>
          )
        }}
      </Formik>
    </DetailCard>
  )
}

export default FailureReportingsForm
