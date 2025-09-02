import React from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import useAssetMeterReading from './hooks/useAssetMeterReading'
import moment from 'moment'
import { measurementsSchema } from './schema'

const AssetMetersReading = () => {
  const { visible, setVisible, selectedAssetMeter, formValue, handleSubmit, isLoading } =
    useAssetMeterReading()
  return (
    <CModal alignment="center" size="xl" visible={visible} onClose={() => setVisible(false)}>
      <Formik
        enableReinitialize
        initialValues={formValue}
        onSubmit={handleSubmit}
        validationSchema={measurementsSchema}
      >
        {({ isSubmitting, values, setFieldValue, errors, touched, dirty }) => {
          return (
            <Form>
              <CModalHeader>
                <CModalTitle>Add Meter Measurements</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="d-flex flex-column border-l-[4px] border-primary-main rounded-sm mb-2">
                  <p className="ms-2 font-semibold text-body-medium mb-0">
                    {selectedAssetMeter?.meter ?? '-'}
                  </p>
                  <p className="ms-2 text-body-medium mb-0">
                    {selectedAssetMeter?.meter_description ?? '-'}
                  </p>
                </div>
                <hr />
                {isLoading ? (
                  <CRow>
                    <div className="flex justify-center">
                      <CSpinner color="primary" className="my-4" />
                    </div>
                  </CRow>
                ) : (
                  <>
                    <CRow>
                      <CCol>
                        <CFormLabel className="text-primary fw-semibold">
                          New Reading <span className="text-red-main">*</span>
                        </CFormLabel>
                        <Field
                          name={`reading`}
                          placeholder="Enter New Reading"
                          value={values?.reading}
                          invalid={touched?.reading && errors?.reading}
                          onChange={(e) => {
                            setFieldValue(`reading`, e.target.value)
                          }}
                          size="md"
                          as={CFormInput}
                        />
                        {errors?.reading && touched?.reading ? (
                          <div className="text-sm text-[#e55353] mt-1">{errors?.reading}</div>
                        ) : null}
                      </CCol>
                      <CCol>
                        <CFormLabel className="text-primary fw-semibold">Remarks</CFormLabel>
                        <Field
                          name={`remarks`}
                          placeholder="Enter Remarks"
                          value={values?.remarks}
                          invalid={touched?.remarks && errors?.remarks}
                          onChange={(e) => {
                            setFieldValue(`remarks`, e.target.value)
                          }}
                          size="md"
                          as={CFormInput}
                        />
                        {errors?.remarks && touched?.remarks ? (
                          <div className="text-sm text-[#e55353] mt-1">{errors?.remarks}</div>
                        ) : null}
                      </CCol>
                      <CCol>
                        <CFormLabel className="text-primary fw-semibold">
                          Last Reading Inspector
                        </CFormLabel>
                        <Field
                          name={`last_reading_inspector`}
                          placeholder="No Last Reading Inspector"
                          value={values?.last_reading_inspector}
                          size="md"
                          disabled
                          as={CFormInput}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mt-2">
                      <CCol>
                        <CFormLabel className="text-primary fw-semibold">Last Reading</CFormLabel>
                        <Field
                          name={`last_reading`}
                          placeholder="No Last Reading"
                          value={values?.last_reading}
                          size="md"
                          disabled
                          as={CFormInput}
                        />
                      </CCol>
                      <CCol>
                        <CFormLabel className="text-primary fw-semibold">
                          Last Reading Date
                        </CFormLabel>
                        <Field
                          name={`last_reading_date`}
                          placeholder="No Last Reading Date"
                          value={
                            values?.last_reading_date
                              ? moment(values?.last_reading_date).format('DD/MM/YYYY')
                              : null
                          }
                          size="md"
                          disabled
                          as={CFormInput}
                        />
                      </CCol>
                      <CCol>
                        <CFormLabel className="text-primary fw-semibold">Last Remarks</CFormLabel>
                        <Field
                          name={`last_remarks`}
                          placeholder="No Last Remarks"
                          value={values?.last_remarks}
                          size="md"
                          disabled
                          as={CFormInput}
                        />
                      </CCol>
                    </CRow>
                  </>
                )}
              </CModalBody>
              <CModalFooter>
                <CButton
                  type="submit"
                  color="primary"
                  className="hover:text-white"
                  disabled={isSubmitting || !dirty}
                >
                  Submit
                </CButton>
                <CButton
                  color=""
                  onClick={() => {
                    setVisible(false)
                  }}
                >
                  <span className="text-[#2671D9]">Cancel</span>
                </CButton>
              </CModalFooter>
            </Form>
          )
        }}
      </Formik>
    </CModal>
  )
}

export default AssetMetersReading
