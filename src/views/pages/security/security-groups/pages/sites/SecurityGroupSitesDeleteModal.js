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
import { Field, Form, Formik } from 'formik'
import { SelectPagination } from 'src/components/elements/select'
import useDeleteSites from './hooks/useDeleteSites'

const SecurityGroupSitesDeleteModal = ({ tableRef, visible, setVisible, deleteType }) => {
  const { formValue, handleDelete, getListSiteOptions, selectedRow } = useDeleteSites({
    setVisible,
    visible,
    deleteType,
    tableRef,
  })

  return (
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <Formik
        enableReinitialize
        initialValues={formValue}
        onSubmit={(values, formikHelpers) => handleDelete(values, formikHelpers)}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          return (
            <Form>
              <CModalHeader>
                <CModalTitle>Delete Sites</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="card-b-left rounded px-3 mb-3">
                  <span className="font-semibold">{selectedRow?.security_group_description}</span>
                  <div>
                    Group :{' '}
                    <span className="font-semibold">{selectedRow?.security_group_code}</span>
                  </div>
                </div>
                <CFormLabel className="text-primary fw-semibold">Sites</CFormLabel>
                <Field
                  isMulti={true}
                  name="site_ids"
                  placeholder="Choose Sites"
                  value={values.site_ids}
                  apiController={getListSiteOptions}
                  parentId={selectedRow?.security_group_id}
                  valueKey="site_id"
                  labelKey="site"
                  onChange={(val) => {
                    setFieldValue('site_ids', val)
                  }}
                  searchKey="meter_group"
                  as={SelectPagination}
                />
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="danger"
                  type="submit"
                  className="text-white"
                  disabled={isSubmitting || !(values?.site_ids?.length > 0)}
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

export default SecurityGroupSitesDeleteModal
