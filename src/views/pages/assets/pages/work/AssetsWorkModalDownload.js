import React from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormLabel,
  CModalFooter,
  CFormInput,
  CFormCheck,
} from '@coreui/react'
import useAssetsWorkDownload from './hooks/useAssetsWorkDownload'
import { Field, Form, Formik } from 'formik'

const AssetsWorkModalDownload = ({ visibleDownload, setVisibleDownload }) => {
  const { formValue, handleDownload } = useAssetsWorkDownload({
    visibleDownload,
    setVisibleDownload,
  })
  return (
    <CModal alignment="center" visible={visibleDownload} onClose={() => setVisibleDownload(false)}>
      <Formik enableReinitialize initialValues={formValue} onSubmit={handleDownload}>
        {({ isSubmitting, values, setFieldValue }) => {
          return (
            <Form>
              <CModalHeader>
                <CModalTitle>Download Data</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="flex items-center justify-between">
                  <p className="mt-2 text-body-small text-neutral-text-field text-nowrap font-normal">
                    Date
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <CFormLabel className="text-primary fw-semibold">Start Date</CFormLabel>
                    <Field
                      type="date"
                      name="start_date"
                      placeholder="Choose Start Date"
                      value={values.start_date}
                      disabled={values?.all_data}
                      onChange={(event) => {
                        setFieldValue('start_date', event?.target?.value)
                      }}
                      as={CFormInput}
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <CFormLabel className="text-primary fw-semibold">End Date</CFormLabel>
                    <Field
                      type="date"
                      name="end_date"
                      placeholder="Choose End Date"
                      min={values?.start_date}
                      disabled={!values?.start_date || values?.all_data}
                      value={values.end_date}
                      onChange={(event) => {
                        setFieldValue('end_date', event?.target?.value)
                      }}
                      as={CFormInput}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="mt-2 text-body-small text-neutral-text-field text-nowrap font-normal">
                    Download Type
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Is Download All Data ?
                    </CFormLabel>
                    <div className="form-check mt-1">
                      <Field
                        name={`all_data`}
                        id={`all_data`}
                        checked={!!values?.all_data}
                        size="lg"
                        onChange={(event) => {
                          setFieldValue(`all_data`, event?.target?.checked)
                        }}
                        as={CFormCheck}
                      />
                      <label className="form-check-label" htmlFor={`all_data`}>
                        Yes
                      </label>
                    </div>
                  </div>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="primary"
                  className="hover:text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Download
                </CButton>
                <CButton
                  color=""
                  onClick={() => {
                    setVisibleDownload(false)
                  }}
                >
                  <span className="text-primary-main">Cancel</span>
                </CButton>
              </CModalFooter>
            </Form>
          )
        }}
      </Formik>
    </CModal>
  )
}

export default AssetsWorkModalDownload
