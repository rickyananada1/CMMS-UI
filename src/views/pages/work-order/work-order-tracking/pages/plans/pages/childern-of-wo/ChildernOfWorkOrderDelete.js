import { CButton, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { SelectPagination } from 'src/components/elements/select'
import useChildOfWorkOrderList from './hooks/useChildOfWorkOrderList'
import useChildOfWorkOrderDelete from './hooks/useChildOfWorkOrderDelete'

const ChildernOfWorkOrderDelete = ({ initialVisible, setAction }) => {
  const [visible, setVisible] = useState(initialVisible)
  const { getChildOfWorkOrder_ } = useChildOfWorkOrderList()
  const { setChange, handleDeleteChildOfWorkOrder } = useChildOfWorkOrderDelete({ setAction })

  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={() => setVisible(!visible)}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">
          <h5 className="heading-small">Delete Children of Work Order</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik initialValues={{ childern: '' }}>
          {({ values }) => {
            return (
              <Form>
                <CFormLabel className="fw-semibold">Children of Work Order</CFormLabel>
                <Field
                  name="record"
                  placeholder="Choose Children of Work Order"
                  onChange={(event) => setChange(event)}
                  size="md"
                  required
                  className="w-100"
                  as={SelectPagination}
                  value={values?.record}
                  apiController={getChildOfWorkOrder_}
                  valueKey="work_order_plan_id"
                  labelKey="work_order_code"
                />
                <div className="d-flex justify-content-end mt-3">
                  <CButton
                    color="danger"
                    style={{ color: 'white' }}
                    onClick={handleDeleteChildOfWorkOrder}
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

export default ChildernOfWorkOrderDelete
