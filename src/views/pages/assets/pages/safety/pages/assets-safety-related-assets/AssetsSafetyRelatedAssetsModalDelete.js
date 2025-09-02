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
import useAssetsSafetyRelatedAssetsDelete from './hooks/useAssetsSafetyRelatedAssetsDelete'
import { Field, Form, Formik } from 'formik'
import { SelectPagination } from 'src/components/elements/select'
import { assetsSafetyRelatedAssetsSchema } from './schema/assetsSafetyRelatedAssetsSchema'

const AssetsSafetyRelatedAssetsModalDelete = ({
  mode,
  setAction,
  visible,
  setVisible,
  setTabIndex,
  setIsRefetchList,
}) => {
  const { formValue, selectedRow, handleDelete, listSafetyRelatedAssets } =
    useAssetsSafetyRelatedAssetsDelete({
      mode,
      setTabIndex,
      setAction,
      visible,
      setVisible,
      setIsRefetchList,
    })
  return (
    <CModal alignment="center" visible={visible}>
      <Formik
        enableReinitialize
        initialValues={formValue}
        validationSchema={assetsSafetyRelatedAssetsSchema}
        onSubmit={handleDelete}
      >
        {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
          return (
            <Form>
              <CModalHeader>
                <CModalTitle>Delete Safety - Related Assets</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormLabel className="text-primary fw-semibold">Assets</CFormLabel>
                <Field
                  name="safety_related_asset_ids"
                  placeholder="Choose Assets"
                  value={values.safety_related_asset_ids}
                  apiController={listSafetyRelatedAssets}
                  valueKey={'safety_related_asset_id'}
                  labelKey={'asset'}
                  searchKey={'q'}
                  query={{
                    site: selectedRow?.site_id,
                  }}
                  onChange={(val) => {
                    setFieldValue('safety_related_asset_ids', val)
                  }}
                  isMulti
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
                  <span className="text-[#2671D9]">Cancel</span>
                </CButton>
              </CModalFooter>
            </Form>
          )
        }}
      </Formik>
    </CModal>
  )
}

export default AssetsSafetyRelatedAssetsModalDelete
