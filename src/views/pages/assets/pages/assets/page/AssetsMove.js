import React, { Fragment } from 'react'
import { HiArrowLongRight } from 'react-icons/hi2'
import {
  CButton,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'

import { useSelector } from 'react-redux'
import { SelectPagination } from 'src/components/elements/select'
import useMoveModifyAsset from '../hooks/useMoveAsset'

const AssetsMove = ({ initialVisible, setVisible, setAction, setTabIndex }) => {
  const { formValue, handleMove, getAssetDropdown, getLocationDropdown, Notification } =
    useMoveModifyAsset({
      setAction,
      setTabIndex,
    })
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  return (
    <CModal
      backdrop="static"
      alignment="center"
      size="lg"
      visible={initialVisible}
      onClose={() => setVisible(!initialVisible)}
      aria-labelledby="movemodifyasset"
    >
      <CModalHeader>
        <CModalTitle id="movemodifyasset">
          <h5 className="heading-small">Move Modify Assets </h5>
        </CModalTitle>
      </CModalHeader>
      <Formik enableReinitialize initialValues={formValue} onSubmit={handleMove}>
        {(props) => {
          const { setFieldValue, isValid, dirty, isSubmitting, setFieldTouched, values } = props
          return (
            <Fragment>
              <Form>
                <CModalBody>
                  <div className="flex">
                    <div className="border-title"></div>
                    <span className="text-heading-small text-primary-main text-body-bold">
                      Asset Code
                    </span>
                  </div>
                  <div className="grid grid-cols-3 my-3">
                    <div className="mb-3">
                      <label className="text-neutral-text-field">Description</label>
                      <br />
                      <span className="font-semibold">{selectedRow?.asset_description ?? '-'}</span>
                    </div>
                    <div className="mb-3">
                      <label className="text-neutral-text-field">KKS Number</label>
                      <br />
                      <span className="font-semibold">{selectedRow?.kks_number ?? '-'}</span>
                    </div>
                    <div className="mb-3">
                      <label className="text-neutral-text-field">Location</label>
                      <br />
                      <span className="font-semibold">{selectedRow?.location ?? '-'}</span>
                    </div>
                    <div className="mb-3">
                      <label className="text-neutral-text-field">Parents</label>
                      <br />
                      <span className="font-semibold">{selectedRow?.parent_asset_num ?? '-'}</span>
                    </div>
                    <div className="mb-3">
                      <label className="text-neutral-text-field">GL Account</label>
                      <br />
                      <span className="font-semibold">{selectedRow?.gl_account ?? '-'}</span>
                    </div>
                  </div>
                  <hr className="w-full h-[1px] mt-[4px] bg-neutral-stroke"></hr>
                  <div className="flex">
                    <div className="border-title"></div>
                    <span className="text-heading-small text-primary-main text-body-bold">
                      Asset Change
                    </span>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-5 mb-3">
                      <CFormLabel className="text-primary fw-semibold">Location</CFormLabel>
                      <Field
                        name="asset_num"
                        placeholder="Enter Asset"
                        value={selectedRow?.location}
                        disabled
                        as={CFormInput}
                      />
                    </div>
                    <div className="col-md-2 mb-4 flex flex-col justify-end">
                      <HiArrowLongRight className="w-full text-[2rem] text-[#2671D9] mb-1" />
                    </div>
                    <div className="col-md-5 mb-4">
                      <CFormLabel className="text-primary fw-semibold"></CFormLabel>
                      <Field
                        name="location_id"
                        placeholder="Enter Location"
                        value={values.location_id}
                        apiController={getLocationDropdown}
                        valueKey="location_id"
                        labelKey="location"
                        otherKey={{
                          description: 'location_description',
                        }}
                        onBlur={() => {
                          setFieldTouched('location_id')
                        }}
                        onChange={(val) => {
                          if (selectedRow?.location_id === val.value) {
                            Notification.fire({
                              icon: 'error',
                              title: 'Error!',
                              text: 'Cannot choose the same option as before.',
                            }).then(() => {
                              setFieldValue('location_id', null)
                            })
                          } else {
                            setFieldValue('location_id', val)
                          }
                        }}
                        isDisabled={isSubmitting}
                        as={SelectPagination}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Parents</CFormLabel>
                      <Field
                        name=""
                        placeholder=""
                        value={selectedRow?.parent_asset_num}
                        disabled
                        as={CFormInput}
                      />
                    </div>
                    <div className="col-md-2 mb-4 flex flex-col justify-end">
                      <HiArrowLongRight className="w-full text-[2rem] text-[#2671D9] mb-1" />
                    </div>
                    <div className="col-md-5 mb-4">
                      <CFormLabel className="text-primary fw-semibold"></CFormLabel>
                      <Field
                        name="parent_id"
                        placeholder="Select Parent"
                        apiController={getAssetDropdown}
                        value={values.parent_id}
                        valueKey="asset_id"
                        labelKey="asset_num"
                        onBlur={() => {
                          setFieldTouched('parent_id')
                        }}
                        onChange={(val) => {
                          if (selectedRow?.parent_id === val.value) {
                            Notification.fire({
                              icon: 'error',
                              title: 'Error!',
                              text: 'Cannot choose the same option as before.',
                            }).then(() => {
                              setFieldValue('parent_id', null)
                            })
                          } else if (selectedRow?.asset_id === val.value) {
                            Notification.fire({
                              icon: 'error',
                              title: 'Error!',
                              text: 'Cannot choose himself.',
                            }).then(() => {
                              setFieldValue('parent_id', null)
                            })
                          } else {
                            setFieldValue('parent_id', val)
                          }
                        }}
                        isDisabled={isSubmitting}
                        className="mt-[0.5rem]"
                        as={SelectPagination}
                      />
                    </div>
                  </div>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="primary"
                    className="hover:text-white"
                    type="submit"
                    disabled={!(isValid && dirty) || isSubmitting}
                  >
                    Save Data
                  </CButton>
                </CModalFooter>
              </Form>
            </Fragment>
          )
        }}
      </Formik>
    </CModal>
  )
}

export default AssetsMove
