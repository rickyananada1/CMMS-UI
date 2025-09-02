import { CButton, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { SelectPagination } from 'src/components/elements/select'
import useLaborDelete from '../../hooks/labor/useLaborDelete'
import { laborDeleteSchema } from '../../schema/laborMaterialsToolsSchema'

const LaborDelete = ({ setAction, initialVisible }) => {
  const [visible, setVisible] = useState(initialVisible)
  const { textFields, handleDeleteLabor, selectedTaskRow, getLaborListService } = useLaborDelete({
    setAction,
  })

  return (
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>
          <h5 className="heading-small">Delete Labor</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik
          enableReinitialize
          initialValues={textFields}
          validationSchema={laborDeleteSchema}
          onSubmit={handleDeleteLabor}
        >
          {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
            return (
              <Form>
                <CFormLabel className="fw-semibold">Labor</CFormLabel>
                <Field
                  name="work_order_labor_id"
                  placeholder="Choose Labor"
                  onChange={(value) => setFieldValue('work_order_labor_id', value)}
                  parentId={selectedTaskRow?.work_order_task_id}
                  apiController={getLaborListService}
                  valueKey="work_order_labor_id"
                  labelKey="labor"
                  value={values?.work_order_labor_id}
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
                    onClick={() => setVisible(false)}
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

export default LaborDelete
