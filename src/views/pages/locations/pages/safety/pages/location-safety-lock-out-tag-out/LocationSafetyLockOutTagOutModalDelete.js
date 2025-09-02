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
import useLocationSafetyLockOutTagOutDelete from './hooks/useLocationSafetyLockOutTagOutDelete'
import { Field, Form, Formik } from 'formik'
import { SelectPagination } from 'src/components/elements/select'
import { locationSafetyLockOutTagOutDeleteSchema } from './schema/locationSafetyLockOutTagOutSchema'

const LocationSafetyLockOutTagOutModalDelete = ({
  mode,
  setAction,
  visible,
  setVisible,
  setTabIndex,
  setIsRefetchList,
}) => {
  const { formValue, selectedRow, handleDelete, listHazardTagOutService } =
    useLocationSafetyLockOutTagOutDelete({
      mode,
      setTabIndex,
      setAction,
      visible,
      setVisible,
      setIsRefetchList,
    })
  return (
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <Formik
        enableReinitialize
        initialValues={formValue}
        validationSchema={locationSafetyLockOutTagOutDeleteSchema}
        onSubmit={handleDelete}
      >
        {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
          return (
            <Form>
              <CModalHeader>
                <CModalTitle>Delete Hazard And Tag Out</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormLabel className="text-primary fw-semibold">Hazard</CFormLabel>
                <Field
                  name="safety_lexicon_ids"
                  placeholder="Choose Hazard"
                  value={values.safety_lexicon_ids}
                  parentId={selectedRow?.location_id}
                  apiController={listHazardTagOutService}
                  valueKey={'safety_lexicon_id'}
                  labelKey={'hazard'}
                  nestedLabelKey={'hazard_desc'}
                  searchKey={'q'}
                  query={{
                    site: selectedRow?.site_id,
                  }}
                  onChange={(val) => {
                    setFieldValue('safety_lexicon_ids', val)
                  }}
                  isMulti
                  isNestedLabelKey
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

export default LocationSafetyLockOutTagOutModalDelete
