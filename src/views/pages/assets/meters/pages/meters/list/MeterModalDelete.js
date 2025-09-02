import React from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormLabel,
  CModalFooter,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import { SelectPagination } from 'src/components/elements/select'
import useDeleteMeter from './hooks/useDeleteMeter'

const MeterModalDelete = ({ tableRef, visible, setVisible }) => {
  const { formValue, handleDelete, getMeters } = useDeleteMeter({
    setVisible,
    visible,
    tableRef,
  })
  return (
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <Formik
        enableReinitialize
        initialValues={formValue}
        onSubmit={(values, formikHelpers) => handleDelete(values, formikHelpers)}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          return (
            <Form>
              <CModalHeader>
                <CModalTitle>Delete Meter</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormLabel className="text-primary fw-semibold">
                  Meter <span className="text-red-main">*</span>
                </CFormLabel>
                <Field
                  name="meter_id"
                  placeholder="Choose Meter"
                  value={values.meter_id}
                  apiController={getMeters}
                  valueKey="meter_id"
                  labelKey="meter_name"
                  onChange={(val) => {
                    setFieldValue('meter_id', val)
                  }}
                  searchKey="meter_name"
                  as={SelectPagination}
                />
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="danger"
                  type="submit"
                  className="text-white"
                  disabled={isSubmitting || !values.meter_id}
                >
                  Delete
                </CButton>
                <CButton
                  color=""
                  onClick={() => {
                    setVisible(false)
                  }}
                >
                  <span className="text-[#2671D9]">Close</span>
                </CButton>
              </CModalFooter>
            </Form>
          )
        }}
      </Formik>
    </CModal>
  )
}

export default MeterModalDelete
