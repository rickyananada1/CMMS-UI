import { CButton, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { SelectPagination } from 'src/components/elements/select'
import useFailureReportingDelete from './hooks/useFailureReportingDelete'
import { failureReportingDeleteSchema } from './schema'

const FailureReportingDelete = ({ setAction, initialVisible }) => {
  const [visible, setVisible] = useState(initialVisible)
  const { textFields, handleDeleteFailureReporting, selectedRow, getFailureReportingListService } =
    useFailureReportingDelete({
      setAction,
    })

  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={() => {
        setVisible(false)
        setAction('Read')
      }}
    >
      <CModalHeader>
        <CModalTitle>
          <h5 className="heading-small">Delete Failure Reporting</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik
          enableReinitialize
          initialValues={textFields}
          validationSchema={failureReportingDeleteSchema}
          onSubmit={handleDeleteFailureReporting}
        >
          {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
            return (
              <Form>
                <CFormLabel className="fw-semibold">Failure Reporting</CFormLabel>
                <Field
                  name="work_order_failure_id"
                  placeholder="Choose Failure Reporting"
                  onChange={(value) => setFieldValue('work_order_failure_id', value)}
                  parentId={selectedRow?.work_order_id}
                  apiController={getFailureReportingListService}
                  valueKey="work_order_failure_id"
                  labelKey="failure_code"
                  value={values?.work_order_failure_id}
                  as={SelectPagination}
                />
                <div className="d-flex justify-content-end mt-3">
                  <CButton
                    color="danger"
                    type="submit"
                    className="text-white"
                    disabled={!(isValid && dirty) || isSubmitting}
                  >
                    Delete
                  </CButton>
                  <CButton
                    color="primary"
                    variant="ghost"
                    className="ml-3"
                    onClick={() => {
                      setVisible(false)
                      setAction('Read')
                    }}
                  >
                    Cancel
                  </CButton>
                </div>
              </Form>
            )
          }}
        </Formik>
      </CModalBody>
    </CModal>
  )
}

export default FailureReportingDelete
