import { CButton, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { SelectPagination } from 'src/components/elements/select'
import usePreventiveMaintenanceDelete from './hooks/usePreventiveMaintenanceDelete'
import { preventiveMaintenanceDeleteSchema } from '../maintenance/schema'

const PreventiveMaintenanceDelete = ({ tableRef, setAction, initialVisible }) => {
  const [visible, setVisible] = useState(initialVisible)
  const { textFields, handleDeletePreventiveMaintenance, getPreventiveMaintenanceListService } =
    usePreventiveMaintenanceDelete({
      tableRef,
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
          <h5 className="heading-small">Delete Preventive Maintenance</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik
          enableReinitialize
          initialValues={textFields}
          validationSchema={preventiveMaintenanceDeleteSchema}
          onSubmit={handleDeletePreventiveMaintenance}
        >
          {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
            return (
              <Form>
                <CFormLabel className="fw-semibold">Preventive Maintenance</CFormLabel>
                <Field
                  name="preventive_maintenance_id"
                  placeholder="Choose Preventive Maintenance"
                  onChange={(value) => setFieldValue('preventive_maintenance_id', value)}
                  apiController={getPreventiveMaintenanceListService}
                  valueKey="preventive_maintenance_id"
                  labelKey="preventive_maintenance_name"
                  value={values?.preventive_maintenance_id}
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

export default PreventiveMaintenanceDelete
