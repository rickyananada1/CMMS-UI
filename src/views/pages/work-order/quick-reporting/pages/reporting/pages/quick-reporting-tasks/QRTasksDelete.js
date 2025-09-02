import { CButton, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { SelectPagination } from 'src/components/elements/select'
import useQRTaskDelete from './hooks/useQRTaskDelete'
import { QRTaskDeleteSchema } from './schema/QRTaskSchema'

const QRTasksDelete = ({ setAction, initialVisible }) => {
  const [visible, setVisible] = useState(initialVisible)
  const { textFields, selectedRow, getTaskListService, handleDeleteTask } = useQRTaskDelete({
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
          <h5 className="heading-small">Delete Task</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik
          enableReinitialize
          initialValues={textFields}
          validationSchema={QRTaskDeleteSchema}
          onSubmit={handleDeleteTask}
        >
          {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
            return (
              <Form>
                <CFormLabel className="fw-semibold">Task</CFormLabel>
                <Field
                  name="work_order_task_id"
                  placeholder="Choose Task"
                  onChange={(value) => setFieldValue('work_order_task_id', value)}
                  parentId={selectedRow?.work_order_id}
                  apiController={getTaskListService}
                  valueKey="work_order_task_id"
                  labelKey="task"
                  value={values?.work_order_task}
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

export default QRTasksDelete
