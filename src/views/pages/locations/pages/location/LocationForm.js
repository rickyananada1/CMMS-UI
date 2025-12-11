import React from 'react'
import {
  CButton,
  CCol,
  CFooter,
  CFormInput,
  CFormLabel,
  CRow,
  CSpinner,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import { Formik, Form, Field } from 'formik'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import useFormLocation from './hooks/useFormLocation'
import { SelectPagination } from 'src/components/elements/select'
import { locationSchema } from './schema/locationSchema'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'
import InputFile from 'src/components/elements/input/InputFile'
import UploadSummaryModal from 'src/views/pages/upload-file/components/UploadSummaryModal'

const LocationForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    optionsType,
    optionsStatus,
    handleSubmit,
    getAllSiteOrganizationsService,
    getFailureClassService,
    getMeterGroupService,
    isModalOpen,
    setIsModalOpen,
    handleModalClose,
    uploadModalProps,
    uploadFiles,
    files,
    isUploadSummaryModalOpen,
    setIsUploadSummaryModalOpen,
    uploadSummary,
    handleRetryUpload,
    handleOK,
    isNewFiles,
  } = useFormLocation({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={formValue}
        validationSchema={locationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          setFieldValue,
          isSubmitting,
          values,
          errors,
          touched,
          isValid,
          dirty,
        }) => {
          return (
            <Form>
              <DetailCard>
                <div>
                  <h4 className="w-full font-semibold">
                    {mode === 'Update' ? 'Edit' : 'Create'} Location
                  </h4>
                  <p>{mode === 'Update' ? 'Edit' : 'Create'} this column to add new location</p>
                </div>
                <hr />
                <div className="container-fluid">
                  <CRow>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Location <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="location.location"
                        placeholder="Enter Location"
                        value={values.location.location}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                      />
                      {errors?.location?.location && touched?.location?.location ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Description <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="location.location_description"
                        placeholder="Enter Description"
                        value={values?.location?.location_description}
                        onChange={handleChange}
                        size="md"
                        as={CFormTextarea}
                      />
                      {errors?.location?.location_description &&
                      touched?.location?.location_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location_description}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Type <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field name="location.location_type">
                        {({ field: { onChange, value } }) => (
                          <CFormSelect
                            name="location.location_type"
                            placeholder="Choose Type"
                            onChange={onChange}
                            value={value}
                            options={['Choose Type', ...optionsType]}
                            size="md"
                          />
                        )}
                      </Field>
                      {errors?.location?.location_type && touched?.location?.location_type ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location_type}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={6} />
                  </CRow>
                  <CRow className="mt-4">
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">Rotating Item</CFormLabel>
                      <Field
                        name="location.rotating_item"
                        placeholder="Enter Rotating Item"
                        value={values.location?.rotating_item}
                        onChange={(val) => {
                          setFieldValue('location.rotating_item', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors &&
                      errors.location?.rotating_item &&
                      touched &&
                      touched.location?.rotating_item ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.rotating_item}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Rotating Item Description
                      </CFormLabel>
                      <Field
                        name="location.rotating_item_description"
                        placeholder="Enter Rotating Item Description"
                        value={values.location?.rotating_item_description}
                        onChange={(val) => {
                          setFieldValue('location.rotating_item_description', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormTextarea}
                      />
                      {errors &&
                      errors.location?.rotating_item_description &&
                      touched &&
                      touched.location?.rotating_item_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.rotating_item_description}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">Meter Group</CFormLabel>
                      <Field
                        name="location.meter_group"
                        placeholder="Choose Meter Group"
                        value={values.location?.meter_group}
                        apiController={getMeterGroupService}
                        valueKey="meter_group_id"
                        labelKey="meter_group"
                        onChange={(val) => {
                          setFieldValue('location.meter_group', val)
                        }}
                        isAllData
                        as={SelectPagination}
                      />
                      {errors?.location?.meter_group && touched?.location?.meter_group?.value ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.meter_group?.value}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Description Meter Group
                      </CFormLabel>
                      <Field
                        name="location.meter_group_description"
                        placeholder="Enter Description Meter Group"
                        value={values?.location?.meter_group?.description}
                        onChange={handleChange}
                        size="md"
                        disabled
                        as={CFormTextarea}
                      />
                      {errors?.location?.meter_group_description &&
                      touched?.location?.meter_group_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.meter_group_description}
                        </div>
                      ) : null}
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">Calendar</CFormLabel>
                      <Field name="location.location_special_date">
                        {({ field: { onChange, value } }) => (
                          <CFormInput
                            name="location.location_special_date"
                            placeholder="Choose Calendar"
                            onChange={onChange}
                            value={value}
                            type="date"
                          />
                        )}
                      </Field>
                      {errors?.location?.location_special_date &&
                      touched?.location?.location_special_date ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location_special_date}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">Shift</CFormLabel>
                      <Field
                        type="number"
                        min="1"
                        name="location.location_shift"
                        placeholder="Enter Shift"
                        value={values?.location?.location_shift}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                      />
                      {errors?.location?.location_shift && touched?.location?.location_shift ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location_shift}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Site <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="location.site_id"
                        placeholder="Choose Site"
                        value={values.location?.site_id}
                        apiController={getAllSiteOrganizationsService}
                        valueKey="site_id"
                        labelKey="site"
                        onChange={(val) => {
                          setFieldValue('location.site_id', val)
                        }}
                        isDisabled={true}
                        as={SelectPagination}
                      />
                      {errors?.location?.site_id && touched?.location?.site_id ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.site_id?.value}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">Priority</CFormLabel>
                      <Field
                        name="location.location_priority"
                        placeholder="Enter Priority"
                        value={values?.location?.location_priority}
                        onChange={handleChange}
                        size="md"
                        type="number"
                        min={0}
                        max={999}
                        as={CFormInput}
                      />
                      {errors?.location?.location_priority &&
                      touched?.location?.location_priority ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location_priority}
                        </div>
                      ) : null}
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">Failure Class</CFormLabel>
                      <Field
                        name="location.failure_class"
                        placeholder="Choose Failure Class"
                        value={values.location?.failure_class}
                        apiController={getFailureClassService}
                        valueKey="failure_code"
                        labelKey="failure_code"
                        onChange={(val) => {
                          setFieldValue('location.failure_class', val)
                        }}
                        as={SelectPagination}
                        isClearable
                      />
                      {errors?.location?.failure_class &&
                      touched?.location?.failure_class?.value ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.failure_class?.value}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">GL Account</CFormLabel>
                      <Field
                        name="location.location_gl_account"
                        placeholder="Enter GL Account"
                        value={values?.location?.location_gl_account}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                      />
                      {errors?.location?.location_gl_account &&
                      touched?.location?.location_gl_account ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location_gl_account}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Internal Labor Account
                      </CFormLabel>
                      <Field
                        name="location.location_labor"
                        placeholder="Enter Internal Labor Account"
                        value={values?.location?.location_labor}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                      />
                      {errors?.location?.location_labor && touched?.location?.location_labor ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location_labor}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <div className="flex-row">
                        <CFormLabel className="text-primary fw-semibold w-100">
                          Attachments
                        </CFormLabel>
                        <InputFile setIsModalOpen={setIsModalOpen} files={files} />
                      </div>
                      <UploadFileModal
                        isModalOpen={isModalOpen}
                        handleModalClose={handleModalClose}
                        {...uploadModalProps}
                      />
                      {errors && errors.data?.attachment && touched && touched.data?.attachment ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.data.attachment}</div>
                      ) : null}
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Status <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field name="location.location_status">
                        {({ field: { onChange, value } }) => (
                          <CFormSelect
                            name="location.location_status"
                            placeholder="Choose Status"
                            onChange={onChange}
                            value={value}
                            options={['Choose Status', ...optionsStatus]}
                            size="md"
                          />
                        )}
                      </Field>
                      {errors?.location?.location_status && touched?.location?.location_status ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location_status}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">Address</CFormLabel>
                      <Field
                        name="location.location_address"
                        placeholder="Enter Location Address"
                        value={values?.location?.location_address}
                        onChange={handleChange}
                        size="md"
                        as={CFormTextarea}
                      />
                      {errors?.location?.location_address && touched?.location?.location_address ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location_address}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">Bill to Address</CFormLabel>
                      <Field
                        name="location.location_bill_to"
                        placeholder="Enter Bill to Address"
                        value={values?.location?.location_bill_to}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                      />
                      {errors?.location?.location_bill_to && touched?.location?.location_bill_to ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location_bill_to}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">Ship to Address</CFormLabel>
                      <Field
                        name="location.location_ship_to"
                        placeholder="Enter Ship to Address"
                        value={values?.location?.location_ship_to}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                      />
                      {errors?.location?.location_ship_to && touched?.location?.location_ship_to ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.location_ship_to}
                        </div>
                      ) : null}
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">Hazard Group</CFormLabel>
                      <Field
                        name="location.hazard_group"
                        placeholder="Enter Group Hazard"
                        value={values?.location?.hazard_group}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                      />
                      {errors?.location?.hazard_group && touched?.location?.hazard_group ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.hazard_group}
                        </div>
                      ) : null}
                    </CCol>
                    <CCol sm={12} md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Hazard Group Description
                      </CFormLabel>
                      <Field
                        name="location.hazard_group_description"
                        placeholder="Enter Group Hazard Description"
                        value={values?.location?.hazard_group_description}
                        onChange={handleChange}
                        size="md"
                        as={CFormTextarea}
                      />
                      {errors?.location?.hazard_group_description &&
                      touched?.location?.hazard_group_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location?.hazard_group_description}
                        </div>
                      ) : null}
                    </CCol>
                  </CRow>
                </div>
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
                    disabled={(!(isValid && dirty) && !isNewFiles) || isSubmitting}
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
      <UploadSummaryModal
        visible={isUploadSummaryModalOpen}
        setVisible={setIsUploadSummaryModalOpen}
        successfulUploads={uploadSummary.successfulUploads}
        failedUploads={uploadSummary.failedUploads}
        uploadFiles={uploadFiles}
        onRetryUpload={handleRetryUpload}
        onOK={handleOK}
      />
    </>
  )
}

export default LocationForm
