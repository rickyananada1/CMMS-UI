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
import useDeleteLocation from './hooks/useDeleteLocation'
import { Field, Form, Formik } from 'formik'
import { SelectPagination } from 'src/components/elements/select'

const LocationsModalDelete = ({ mode, setAction, visible, setVisible, setTabIndex }) => {
  const { formValue, handleDelete, listLocationService } = useDeleteLocation({
    mode,
    setTabIndex,
    setAction,
    visible,
    setVisible,
  })
  return (
    <CModal alignment="center" visible={visible}>
      <Formik
        enableReinitialize
        initialValues={formValue}
        onSubmit={(values, formikHelpers) => handleDelete(values, formikHelpers)}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          return (
            <Form>
              <CModalHeader>
                <CModalTitle>Delete Location</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormLabel className="text-primary fw-semibold">Location</CFormLabel>
                <Field
                  name="location_id"
                  placeholder="Choose Location"
                  value={values.location_id}
                  apiController={listLocationService}
                  valueKey="location_id"
                  labelKey="location"
                  onChange={(val) => {
                    setFieldValue('location_id', val)
                  }}
                  as={SelectPagination}
                />
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="danger"
                  type="submit"
                  className="text-white"
                  disabled={isSubmitting || !values.location_id}
                >
                  Delete
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

export default LocationsModalDelete
