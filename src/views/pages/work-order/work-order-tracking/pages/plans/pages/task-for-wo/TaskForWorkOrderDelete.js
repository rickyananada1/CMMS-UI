import { CButton, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { SelectPagination } from 'src/components/elements/select'
import useTaskForWorkOrderList from './hooks/useTaskForWorkOrderList'
import useTaskForWorkOrderDelete from './hooks/useTaskForWorkOrderDelete'

const TaskForWorkOrderDelete = ({ initialVisible, setAction }) => {
  const [visible, setVisible] = useState(initialVisible)
  const { getTaskForWorkOrder_ } = useTaskForWorkOrderList()
  const { setChange, handleDeleteTaskForWorkOrder, selectedRow } = useTaskForWorkOrderDelete({
    setAction,
  })

  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={() => setVisible(!visible)}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">
          <h5 className="heading-small">Delete Task for Work Order</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik>
          {({ values }) => {
            return (
              <Form>
                <CFormLabel className="fw-semibold">Task for Work Order</CFormLabel>
                <Field
                  name="work_order_task_id"
                  placeholder="Choose Task for Work Order"
                  onChange={(event) => setChange(event)}
                  size="md"
                  required
                  className="w-100"
                  as={SelectPagination}
                  value={values?.work_order_task_id}
                  apiController={getTaskForWorkOrder_}
                  parentId={selectedRow?.work_order_id}
                  valueKey="work_order_task_id"
                  labelKey="task"
                />
                <div className="d-flex justify-content-end mt-3">
                  <CButton
                    color="danger"
                    style={{ color: 'white' }}
                    onClick={handleDeleteTaskForWorkOrder}
                  >
                    Delete
                  </CButton>
                  {/* <CButton
                    color="primary"
                    variant="ghost"
                    className="ml-3"
                    onClick={() => setVisible(!visible)}
                  >
                    Cancel
                  </CButton> */}
                </div>
              </Form>
            )
          }}
        </Formik>
      </CModalBody>
    </CModal>
  )
}

export default TaskForWorkOrderDelete
