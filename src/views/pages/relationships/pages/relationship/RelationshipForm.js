import React from 'react'
import { Field, Form, Formik } from 'formik'
import useRelationship from './hooks/useRelationship'
import { relationshipSchema } from './schema'
import { DetailCard } from 'src/components/elements/cards'
import {
  CButton,
  CCol,
  CContainer,
  CFooter,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CSpinner,
} from '@coreui/react'
import { Select, SelectPagination } from 'src/components/elements/select'
import { CiPaperplane } from 'react-icons/ci'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'

const RelationshipForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    isLoading,
    handleSubmit,
    getAssetDropdown,
    getLocationDropdown,
    relationTypeOptions,
    isModalOpen,
    setIsModalOpen,
    uploadModalProps,
  } = useRelationship({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <Formik
      enableReinitialize
      initialValues={formValue}
      onSubmit={handleSubmit}
      validationSchema={relationshipSchema}
    >
      {({
        handleChange,
        setFieldValue,
        setFieldTouched,
        errors,
        isValid,
        dirty,
        isSubmitting,
        values,
        touched,
      }) => {
        return (
          <Form>
            <DetailCard isLoading={isLoading}>
              {mode === 'Update' ? (
                <div>
                  <h4 className="w-font-semibold">Update Relationship</h4>
                  <p>Update Relationship Details</p>
                </div>
              ) : (
                <div>
                  <h4 className="w-font-semibold">New Relationship</h4>
                  <p>Fill this column to add new Relationship</p>
                </div>
              )}
              <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke" />
              <CContainer fluid>
                <CRow>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Asset <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      id="asset_id"
                      placeholder="Choose Item"
                      name="asset_id"
                      size="sm"
                      value={values?.asset_id}
                      apiController={getAssetDropdown}
                      valueKey="asset_id"
                      labelKey="asset_num"
                      otherKey={{
                        description: 'asset_description',
                        location_id: 'location_id',
                        location: 'location',
                        location_description: 'location_description',
                      }}
                      onChange={(val) => {
                        setFieldValue(`asset_id`, val)
                        setFieldValue(`related_asset_id`, null)
                        setFieldValue('relatedAssetKey', val ? val.value : null)
                        setFieldValue('isAssetFirst', val ? !values.locationKey : false)
                        if (!values.locationKey) {
                          if (val) {
                            setFieldValue('location_id', {
                              value: val?.location_id,
                              label: val?.location,
                              location_description: val?.location_description,
                            })
                          } else {
                            setFieldValue('location_id', null)
                          }
                        }
                      }}
                      query={{
                        qLocation: values.location_id?.label || undefined,
                      }}
                      key={values?.locationKey}
                      isClearable
                      as={SelectPagination}
                    />
                    {errors.asset_id && touched.asset_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.asset_id}</div>
                    ) : null}
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">Asset Description</CFormLabel>
                    <Field
                      id="desc"
                      size="sm"
                      className="px-3 py-2"
                      name="desc"
                      value={values?.asset_id?.description || ''}
                      placeholder="Enter Description"
                      as={CFormTextarea}
                      disabled
                    />
                  </CCol>
                  {/* <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">Location</CFormLabel>
                    <Field
                      id="desc"
                      size="sm"
                      className="px-3 py-2"
                      name="desc"
                      value={values?.asset_id?.location || ''}
                      placeholder="Enter Location"
                      as={CFormInput}
                      disabled
                    />
                  </CCol> */}
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Location <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      id="location_id"
                      placeholder="Choose Item"
                      name="location_id"
                      size="sm"
                      value={values?.location_id}
                      apiController={getLocationDropdown}
                      valueKey="location_id"
                      labelKey="location"
                      otherKey={{
                        location_description: 'location_description',
                      }}
                      onChange={(val) => {
                        setFieldValue(`location_id`, val)
                        setFieldValue(`asset_id`, null)
                        setFieldValue('locationKey', val ? val.value : null)
                      }}
                      isClearable
                      disabled={values?.isAssetFirst}
                      as={SelectPagination}
                    />
                    {errors.location_id && touched.location_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.location_id}</div>
                    ) : null}
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Location Description
                    </CFormLabel>
                    <Field
                      id="locDesc"
                      size="sm"
                      className="px-3 py-2"
                      name="locDesc"
                      value={values?.location_id?.location_description}
                      placeholder="Enter Location Desc"
                      onChange={handleChange}
                      disabled
                      as={CFormTextarea}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Relation to Asset <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      id="related_asset_id"
                      placeholder="Choose Item"
                      name="related_asset_id"
                      size="sm"
                      value={values?.related_asset_id}
                      apiController={getAssetDropdown}
                      valueKey="asset_id"
                      labelKey="asset_num"
                      otherKey={{
                        description: 'asset_description',
                        location_id: 'location_id',
                        location: 'location',
                        location_description: 'location_description',
                      }}
                      disabled={values?.asset_id === null}
                      parentId={values?.asset_id?.value}
                      onChange={(val) => {
                        setFieldValue(`related_asset_id`, val)
                        setFieldValue(
                          'isRelatedAssetFirst',
                          val ? !values.relatedLocationKey : false,
                        )
                        if (!values.relatedLocationKey) {
                          if (val) {
                            setFieldValue('related_location_id', {
                              value: val?.location_id,
                              label: val?.location,
                              location_description: val?.location_description,
                            })
                          } else {
                            setFieldValue('related_location_id', null)
                          }
                        }
                      }}
                      key={`${values?.relatedAssetKey}-${values?.relatedLocationKey}`}
                      query={{
                        qLocation: values.related_location_id?.label || undefined,
                      }}
                      isClearable
                      as={SelectPagination}
                    />
                    {errors.related_asset_id && touched.related_asset_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.related_asset_id}</div>
                    ) : null}
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Relation to Asset Description
                    </CFormLabel>
                    <Field
                      id="locDesc"
                      size="sm"
                      className="px-3 py-2"
                      name="locDesc"
                      value={values?.related_asset_id?.description}
                      placeholder="Enter Relation to Asset Desc"
                      onChange={handleChange}
                      disabled
                      as={CFormTextarea}
                    />
                  </CCol>
                  {/* <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Relation to Location
                    </CFormLabel>
                    <Field
                      id="desc"
                      size="sm"
                      className="px-3 py-2"
                      name="desc"
                      value={values?.related_asset_id?.location || ''}
                      placeholder="Enter Relation to Location"
                      as={CFormInput}
                      disabled
                    />
                  </CCol> */}
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Relation to Location <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      id="related_location_id"
                      placeholder="Choose Item"
                      name="related_location_id"
                      size="sm"
                      value={values?.related_location_id}
                      apiController={getLocationDropdown}
                      valueKey="location_id"
                      labelKey="location"
                      otherKey={{
                        location_description: 'location_description',
                      }}
                      onChange={(val) => {
                        setFieldValue(`related_location_id`, val)
                        setFieldValue(`related_asset_id`, null)
                        setFieldValue('relatedLocationKey', val ? val.value : null)
                      }}
                      isClearable
                      disabled={values?.isRelatedAssetFirst}
                      as={SelectPagination}
                    />
                    {errors.related_location_id && touched.related_location_id ? (
                      <div className="text-sm text-[#e55353] mt-1">
                        {errors.related_location_id}
                      </div>
                    ) : null}
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Relation to Location Description
                    </CFormLabel>
                    <Field
                      id="locDesc"
                      size="sm"
                      className="px-3 py-2"
                      name="locDesc"
                      value={values?.related_location_id?.location_description}
                      placeholder="Enter Relation to Location Desc"
                      disabled
                      as={CFormTextarea}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Relation Name <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="relation_name"
                      placeholder="Enter Relation Name"
                      value={values?.relation_name}
                      invalid={touched.relation_name && errors.relation_name}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                    />
                    {errors.relation_name && touched.relation_name ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.relation_name}</div>
                    ) : null}
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Relation Type <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="relation_type"
                      placeholder="Choose Relation Type"
                      value={values?.relation_type}
                      onChange={(val) => {
                        setFieldValue(`relation_type`, val)
                      }}
                      onBlur={() => {
                        setFieldTouched('relation_type')
                      }}
                      size="md"
                      options={relationTypeOptions}
                      required
                      as={Select}
                    />
                    {errors.relation_type && touched.relation_type ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.relation_type}</div>
                    ) : null}
                  </CCol>
                  <CCol sm={3}>
                    <div className="flex-row">
                      <CFormLabel className="text-primary fw-semibold w-100">
                        Attachments
                      </CFormLabel>
                      <CButton
                        color="primary"
                        className="hover:text-white"
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Upload File
                      </CButton>
                    </div>
                    <UploadFileModal
                      visible={isModalOpen}
                      setVisible={setIsModalOpen}
                      setFieldValue={setFieldValue}
                      {...uploadModalProps}
                    />
                    {errors && errors.data?.attachment && touched && touched.data?.attachment ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.data.attachment}</div>
                    ) : null}
                  </CCol>
                </CRow>
              </CContainer>
            </DetailCard>
            <CFooter className="form-footer">
              <div className="ml-[80px] w-full my-2 flex items-center justify-between">
                <CButton
                  color="danger"
                  variant="outline"
                  onClick={() => {
                    setAction('Read')
                  }}
                >
                  Cancel
                </CButton>
                <CButton
                  disabled={isSubmitting || !(dirty && isValid)}
                  color="primary"
                  className="hover:text-white"
                  type="submit"
                >
                  <div className="flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        Submit <CSpinner className="ms-2" color="light" size="sm" />
                      </>
                    ) : (
                      <>
                        Submit <CiPaperplane className="ms-2" />
                      </>
                    )}
                  </div>
                </CButton>
              </div>
            </CFooter>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RelationshipForm
