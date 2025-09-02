import { CButton, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { SelectPagination } from 'src/components/elements/select'
import useToolsDelete from '../../hooks/tools/useToolsDelete'
import { toolsDeleteSchema } from '../../schema/laborMaterialsToolsSchema'

const ToolsDelete = ({ setAction, initialVisible }) => {
  const [visible, setVisible] = useState(initialVisible)
  const { textFields, selectedTaskRow, getToolsListService, handleDeleteTools } = useToolsDelete({
    setAction,
  })

  return (
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>
          <h5 className="heading-small">Delete Tools</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik
          enableReinitialize
          initialValues={textFields}
          validationSchema={toolsDeleteSchema}
          onSubmit={handleDeleteTools}
        >
          {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
            return (
              <Form>
                <CFormLabel className="fw-semibold">Tools</CFormLabel>
                <Field
                  name="work_order_tool_id"
                  placeholder="Choose Tools"
                  onChange={(value) => setFieldValue('work_order_tool_id', value)}
                  parentId={selectedTaskRow?.work_order_task_id}
                  apiController={getToolsListService}
                  valueKey="work_order_tool_id"
                  labelKey="tool"
                  value={values?.work_order_tool_id}
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

export default ToolsDelete
