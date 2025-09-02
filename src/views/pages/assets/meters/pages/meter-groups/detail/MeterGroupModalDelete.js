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
import { Select, SelectPagination } from 'src/components/elements/select'
import useDeleteMeterGroups from './hooks/useDeleteMeterGroups'

const MeterGroupModalDelete = ({ tableRef, visible, setVisible, deleteType }) => {
  const {
    formValue,
    handleDelete,
    getMeterGroups,
    meter_in_group_options,
    fetchMeterInGroupOptions,
    isLoading,
  } = useDeleteMeterGroups({
    setVisible,
    visible,
    deleteType,
    tableRef,
  })
  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={() => setVisible({ visiblePopUp: false, deleteType: 'MeterGroup' })}
    >
      <Formik
        enableReinitialize
        initialValues={formValue}
        onSubmit={(values, formikHelpers) => handleDelete(values, formikHelpers)}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          return (
            <Form>
              <CModalHeader>
                <CModalTitle>
                  Delete {deleteType === 'MeterGroup' ? 'Meter Group' : 'Meter In Group'}
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormLabel className="text-primary fw-semibold">
                  Meter Group <span className="text-red-main">*</span>
                </CFormLabel>
                <Field
                  name="meter_group_id"
                  placeholder="Choose Meter Group"
                  value={values.meter_group_id}
                  apiController={getMeterGroups}
                  valueKey="meter_group_id"
                  labelKey="meter_group"
                  onChange={(val) => {
                    setFieldValue('meter_group_id', val)
                    fetchMeterInGroupOptions(val?.value)
                    setFieldValue('meter_in_group_ids', null)
                  }}
                  searchKey="meter_group"
                  as={SelectPagination}
                />
                {deleteType === 'MeterInGroup' && (
                  <>
                    <CFormLabel className="text-primary fw-semibold mt-3">
                      Meters in Group
                    </CFormLabel>
                    <Field
                      isMulti={true}
                      name="meter_in_group_ids"
                      placeholder="Choose Meter in Group"
                      value={values.meter_in_group_ids}
                      onChange={(val) => {
                        setFieldValue('meter_in_group_ids', val)
                      }}
                      size="md"
                      options={meter_in_group_options}
                      isDisabled={!values.meter_group_id || isLoading}
                      as={Select}
                    />
                  </>
                )}
              </CModalBody>
              <CModalFooter>
                <CButton
                  color="danger"
                  type="submit"
                  className="text-white"
                  disabled={
                    isSubmitting ||
                    (deleteType === 'MeterGroup' && !values.meter_group_id) ||
                    (deleteType === 'MeterInGroup' && !(values?.meter_in_group_ids?.length > 0))
                  }
                >
                  Delete
                </CButton>
                <CButton
                  color=""
                  onClick={() => {
                    setVisible({ visiblePopUp: false, deleteType: 'MeterGroup' })
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

export default MeterGroupModalDelete
