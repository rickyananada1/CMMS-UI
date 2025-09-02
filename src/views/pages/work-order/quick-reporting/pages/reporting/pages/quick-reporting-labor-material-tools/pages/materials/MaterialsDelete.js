import { CButton, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { SelectPagination } from 'src/components/elements/select'
import useMaterialsDelete from './hooks/useMaterialsDelete'
import { materialsDeleteSchema } from '../../QRLaborMaterialsToolsSchema'

const MaterialsDelete = ({ setAction, initialVisible }) => {
  const [visible, setVisible] = useState(initialVisible)
  const { textFields, selectedTaskRow, getMaterialsListService, handleDeleteMaterials } =
    useMaterialsDelete({ setAction })

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
          <h5 className="heading-small">Delete Material</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik
          enableReinitialize
          initialValues={textFields}
          validationSchema={materialsDeleteSchema}
          onSubmit={handleDeleteMaterials}
        >
          {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
            return (
              <Form>
                <CFormLabel className="fw-semibold">Materials</CFormLabel>
                <Field
                  name="work_order_material_id"
                  placeholder="Choose Material"
                  onChange={(value) => setFieldValue('work_order_material_id', value)}
                  parentId={selectedTaskRow?.work_order_task_id}
                  apiController={getMaterialsListService}
                  valueKey="work_order_material_id"
                  labelKey="sparepart"
                  value={values?.work_order_material_id}
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

export default MaterialsDelete
