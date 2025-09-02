import { CButton, CFooter, CFormInput, CFormLabel, CFormTextarea, CSpinner } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import useGroups from './hooks/useMeterGroups'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import { meterGroupSchema } from './schema'

// eslint-disable-next-line react/prop-types
const MeterGroupsForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    isLoading,
    //type,
    handleSubmit,
  } = useGroups({ mode, setAction, setTabIndex })

  return (
    <Formik
      enableReinitialize
      initialValues={formValue}
      onSubmit={handleSubmit}
      validationSchema={meterGroupSchema}
    >
      {({ handleChange, setFieldValue, errors, isValid, dirty, isSubmitting, values, touched }) => {
        return (
          <Form className="mb-3">
            <DetailCard isLoading={isLoading}>
              {mode === 'Update-MeterGroup' ? (
                <div>
                  <h4 className="w-font-semibold">Edit Meter Group</h4>
                  <p>Update Meter Group Details</p>
                </div>
              ) : (
                <div>
                  <h4 className="w-font-semibold">New Meter Group</h4>
                  <p>Fill this column to add new meter group</p>
                </div>
              )}
              <hr />
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <CFormLabel className="text-primary fw-semibold">
                      Meter Group <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="meter_group"
                      placeholder="Enter Meter Group"
                      value={values?.meter_group}
                      invalid={touched?.meter_group && errors?.meter_group}
                      onChange={handleChange}
                      size="md"
                      required
                      as={CFormInput}
                    />
                    {errors?.meter_group && touched?.meter_group ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors?.meter_group}</div>
                    ) : null}
                  </div>
                  <div className="col">
                    <CFormLabel className="text-primary fw-semibold">
                      Meter Group Description <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="description"
                      placeholder="Enter Meter Group Description"
                      value={values?.description}
                      invalid={touched?.description && errors?.description}
                      onChange={handleChange}
                      size="md"
                      required
                      as={CFormTextarea}
                    />
                    {errors?.description && touched?.description ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors?.description}</div>
                    ) : null}
                  </div>
                </div>
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
  )
}

export default MeterGroupsForm
