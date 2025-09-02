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
import useFailureCodeDelete from './hooks/useFailureCodeDelete'
import { Field, Form, Formik } from 'formik'
import { SelectPagination } from 'src/components/elements/select'
import { failureCodeDeleteSchema } from './schema/failureCodeSchema'

const FailureCodeModalDelete = ({ mode, setAction, visible, setVisible, setTabIndex }) => {
  const { formValue, listFailureCodeService, handleDelete } = useFailureCodeDelete({
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
        validationSchema={failureCodeDeleteSchema}
        onSubmit={handleDelete}
      >
        {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
          return (
            <Form>
              <CModalHeader>
                <CModalTitle>Delete Failure Code</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormLabel className="text-primary fw-semibold">Failure Flass</CFormLabel>
                <Field
                  name="failure_class"
                  placeholder="Choose Failure Class"
                  value={values.failure_class}
                  apiController={listFailureCodeService}
                  valueKey={'failure_code_id'}
                  labelKey={'failure_code'}
                  searchKey={'search'}
                  onChange={(val) => {
                    setFieldValue('failure_class', val)
                  }}
                  as={SelectPagination}
                />
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="danger"
                  type="submit"
                  className="text-white"
                  disabled={!(isValid && dirty) || isSubmitting}
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

export default FailureCodeModalDelete
