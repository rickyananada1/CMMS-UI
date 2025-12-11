/* eslint-disable */
/* prettier-ignore-start */
import React from 'react'
import {
  CContainer,
  CFormLabel,
  CCol,
  CRow,
  CFooter,
  CButton,
  CSpinner,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import useServiceReq from './hooks/useServiceReq'
import { CiPaperplane } from 'react-icons/ci'
import { Field, Form, Formik } from 'formik'
import { serviceReqSchema } from './schema'
import { Select, SelectPagination } from 'src/components/elements/select'
import moment from 'moment'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'
import InputFile from 'src/components/elements/input/InputFile'
import UploadSummaryModal from 'src/views/pages/upload-file/components/UploadSummaryModal'
import Editor from '../../../../../../../src/components/editor/EditorTiptap'

const ServiceRequestForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    isLoading,
    handleSubmit,
    getLocations,
    getAssets,
    getUserSite,
    getReportBy,
    work_order_statuses,
    files,
    disableEdit,
    isLocationChanged,
    setIsLocationChanged,
    isAssetChanged,
    setIsAssetChanged,
    isLocationDisabled,
    setIsLocationDisabled,
    isLocationFirst,
    setIsLocationFirst,
    isModalOpen,
    setIsModalOpen,
    isUploadSummaryModalOpen,
    setIsUploadSummaryModalOpen,
    handleOK,
    uploadFiles,
    handleRetryUpload,
    uploadSummary,
    uploadModalProps,
  } = useServiceReq({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={formValue}
        onSubmit={handleSubmit}
        validationSchema={serviceReqSchema}
      >
        {({
          handleChange,
          setFieldValue,
          setFieldTouched,
          errors,
          dirty,
          isSubmitting,
          values,
          touched,
        }) => {
          const normalizeLocation = (item) => ({
            value: item.location_id,
            label: `${item.location} - ${item.location_description}`,
            location: String(item.location),
            location_description: item.location_description ?? '',
            location_id: item.location_id,
          })

          const handleLocationChange = (val) => {
            if (!val) {
              setFieldValue('location_id', null)
              setFieldValue('asset_id', null)
              return
            }
            const formatted = normalizeLocation(val)
            setFieldValue('location_id', formatted)
            setFieldValue('location_description', formatted.location_description)
            setIsLocationChanged(true)

            if (!isAssetChanged) {
              setFieldValue('asset_id', null)
            }
          }

          const handleAssetChange = (val) => {
            setFieldValue('asset_id', val)

            // SET asset_description AGAR MASUK KE FORMIK
            setFieldValue('asset_description', val?.asset_description || '')

            if (val?.site) {
              setFieldValue('site_id', val.site)
            }

            if (!val) {
              setFieldValue('site_id', '')
              if (!isLocationChanged) {
                setFieldValue('location_id', null)
                setIsLocationDisabled(false)
              }
              setIsAssetChanged(false)
              return
            }

            setIsAssetChanged(true)

            if (!isLocationChanged && val?.location) {
              const formatted = normalizeLocation(val)
              setFieldValue('location_id', formatted)
              setIsLocationDisabled(true)

              if (isLocationFirst === null) {
                setIsLocationFirst(false)
                setFieldValue('is_location_first', false)
              }
            }
          }

          return (
            <Form>
              <DetailCard isLoading={isLoading}>
                {mode === 'Update' ? (
                  <div>
                    <h4 className="w-font-semibold">Update Service Request</h4>
                    <p>Update Service Request Details</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="w-font-semibold">New Service Request</h4>
                    <p>Fill this column to add new service request</p>
                  </div>
                )}
                <CContainer fluid>
                  <div className="flex items-center mt-2 justify-between -mx-2">
                    <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                      Detail
                    </p>
                    <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                  </div>
                  <CRow className="mb-3">
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Service Request <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="ticketid"
                        placeholder="Enter Service Request"
                        value={values?.ticketid}
                        invalid={touched.ticketid && errors.ticketid}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                      />
                      {errors.ticketid && touched.ticketid ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.ticketid}</div>
                      ) : null}
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Summary Service Request <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="description"
                        placeholder="Enter Summary Service Request"
                        value={values?.description}
                        invalid={touched.description && errors.description}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                      />
                      {errors.description && touched.description ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.description}</div>
                      ) : null}
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Status SR
                      </CFormLabel>
                      <Field
                        name="status"
                        placeholder="Choose Status SR"
                        value={values?.status}
                        isAllData
                        hasNoKey
                        onChange={(val) => {
                          setFieldValue(`status`, val)
                        }}
                        size="md"
                        as={Select}
                        options={work_order_statuses}
                        isLocalSearch
                      />
                    </CCol>
                    <CCol>
                      <div className="flex-row">
                        <CFormLabel className="text-primary fw-semibold w-100">
                          Attachments
                        </CFormLabel>
                        <InputFile setIsModalOpen={setIsModalOpen} files={files} />
                      </div>
                      <UploadFileModal
                        visible={isModalOpen}
                        setVisible={setIsModalOpen}
                        setFieldValue={setFieldValue}
                        uploadFiles={uploadFiles}
                        {...uploadModalProps}
                      />
                      {errors && errors.data?.attachment && touched && touched.data?.attachment ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.data.attachment}</div>
                      ) : null}
                    </CCol>
                    {/* <CCol>
                    <div className="flex-row">
                      <CFormLabel className="text-primary fw-semibold w-100">
                        Attachments
                      </CFormLabel>
                      <div className='border !border-[#ff6600] pl-3 pt-[5px] pb-[6px] rounded-[4px]'>
                        <CButton
                          color="light"
                          className="hover:text-white"
                          type="button"
                          style={{ alignSelf: 'flex-end', fontSize: '10.5px', padding: '4px 8px', color: '#7F7F80', borderColor: '#F7F7F7' }}
                          onClick={() => setIsModalOpen(true)}
                        >
                          Choose File
                        </CButton>
                      </div>
                    </div>
                    <UploadFileModal
                      visible={isModalOpen}
                      setVisible={setIsModalOpen}
                      setFieldValue={setFieldValue}
                      {...uploadModalProps}
                    />
                  </CCol> */}
                  </CRow>
                  <CRow>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Detail Service Request <span className="text-red-main">*</span>
                      </CFormLabel>
                      <div>
                        <Editor
                          name="detailsummary"
                          value={values?.detailsummary ?? ''}
                          valueKey="detailsummary"
                          labelKey="detailsummary"
                          otherKey={{
                            plan_description: 'detailsummary',
                          }}
                          invalid={touched.detailsummary && errors.detailsummary}
                          onChange={(val) => setFieldValue('detailsummary', val)}
                          onBlur={() => setFieldTouched('detailsummary', true)}
                          size="md"
                          isClearable
                        />
                        {errors.detailsummary && touched.detailsummary ? (
                          <div className="text-sm text-[#e55353] mt-1">{errors.detailsummary}</div>
                        ) : null}
                      </div>
                    </CCol>
                  </CRow>
                  <div className="flex items-center mt-2 justify-between -mx-2">
                    <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                      Service Request Information
                    </p>
                    <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                  </div>
                  <CRow className="mb-3">
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Asset <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        key={
                          values?.location_id?.value ||
                          `${values?.asset_id?.value}-${values?.location_id?.value}` ||
                          'default-asset'
                        }
                        name="asset_id"
                        placeholder="Select Asset"
                        apiController={getAssets}
                        value={values?.asset_id}
                        valueKey="asset_id"
                        labelKey="asset_num"
                        otherKey={{
                          location_id: 'location_id',
                          location: 'location',
                          location_description: 'location_description',
                          asset_description: 'asset_description',
                          site: 'site',
                          site_id: 'site_id',
                        }}
                        onChange={handleAssetChange}
                        query={{
                          qLocation: values.location_id?.label || undefined,
                        }}
                        onBlur={() => setFieldTouched('asset_id')}
                        size="md"
                        as={SelectPagination}
                        disabled={disableEdit}
                        isClearable
                      />
                      {errors.asset_id && touched.asset_id && !values.asset_id ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.asset_id}</div>
                      ) : null}
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Asset Description
                      </CFormLabel>
                      <Field
                        name="asset_description"
                        placeholder="No Description"
                        value={
                          values?.asset_id?.asset_description
                            ? values?.asset_id?.asset_description
                            : ''
                        }
                        onChange={handleChange}
                        size="md"
                        disabled
                        as={CFormTextarea}
                      />
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Location <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        key={
                          values?.asset_id?.value ||
                          `${values?.location_id?.value}-${values?.asset_id?.value}` ||
                          'default-location'
                        }
                        name="location_id"
                        placeholder="Select Location"
                        apiController={getLocations}
                        value={values?.location_id ?? null}
                        valueKey="location"
                        labelKey={(item) => `${item.location} - ${item.location_description}`}
                        searchKey="qLocation"
                        otherKey={{
                          asset_id: 'asset_id',
                          asset_num: 'asset_num',
                          asset_description: 'asset_description',
                          location: 'location',
                          location_description: 'location_description',
                        }}
                        onChange={handleLocationChange}
                        labelFormat={(item) =>
                          `${item?.location_id ?? ''} - ${item?.location_description ?? ''}`}
                        size="md"
                        as={SelectPagination}
                        isClearable
                        disabled={disableEdit || isLocationDisabled}
                      />
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Location Description
                      </CFormLabel>
                      <Field
                        name="location_description"
                        placeholder="No Description"
                        value={values?.location_id?.location_description ?? ''}
                        onChange={handleChange}
                        size="md"
                        disabled
                        as={CFormTextarea}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    {/* <CCol>
                  <CFormLabel className="text-primary fw-semibold">
                    Configuration <span className="text-red-main">*</span>
                  </CFormLabel>
                  <Field
                    name="configuration_id"
                    placeholder="(851) 080-9409"
                    valueKey="configuration_id"
                    labelKey="configuration_id" size="md"
                    as={SelectPagination}
                    isClearable
                  />
                </CCol>
                <CCol>
                  <CFormLabel className="text-primary fw-semibold">
                    Configuration Description <span className="text-red-main">*</span>
                  </CFormLabel>
                  <Field
                    name="configuration"
                    placeholder="99" size="md"
                    as={CFormInput}
                    disabled
                  />
                </CCol> */}
                    <CCol md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        GL Account
                      </CFormLabel>
                      <Field
                        name="glaccount"
                        placeholder="Enter GL Account"
                        value={values?.glaccount}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                      />
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Asset Site <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="site_id"
                        placeholder="Select Site"
                        value={values?.asset_id?.site || ''}
                        isAllData
                        handleChange
                        size="md"
                        disabled
                        as={CFormInput}
                      />
                    </CCol>
                  </CRow>
                  {/* <CRow className="mb-3">
                <CCol md={3}>
                  <CFormLabel className="text-primary fw-semibold">
                    Classification <span className="text-red-main">*</span>
                  </CFormLabel>
                  <Field
                    name="classification_id"
                    placeholder="(981) 266-5326"
                    valueKey="classification_id"
                    labelKey="classification_id" size="md"
                    as={SelectPagination}
                    isClearable
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel className="text-primary fw-semibold">
                    Classification Description <span className="text-red-main">*</span>
                  </CFormLabel>
                  <Field
                    name="classification_description"
                    placeholder="85" size="md"
                    as={CFormInput}
                    disabled
                  />
                </CCol>
              </CRow> */}
                  <div className="flex items-center mt-2 justify-between -mx-2">
                    <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                      Date
                    </p>
                    <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                  </div>
                  <CRow className="mb-3">
                    {/* <CCol md={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Target Contact
                    </CFormLabel>
                    <Field
                      name="target_contact"
                      placeholder="Choose Scheduled Start"
                      size="md"
                      min={moment().format('YYYY-MM-DD')}
                      as={CFormInput}
                      type="date"
                    />
                  </CCol> */}
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Target Start
                      </CFormLabel>
                      <Field
                        name="targetstart"
                        placeholder="Choose Target Start"
                        onChange={(e) => {
                          setFieldValue(`targetstart`, e.target.value)
                        }}
                        size="md"
                        min={moment().format('YYYY-MM-DDTHH:mm')}
                        value={values?.targetstart}
                        as={CFormInput}
                        type="datetime-local"
                        disabled={values?.pm_id || disableEdit}
                      />
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Target Finish
                      </CFormLabel>
                      <Field
                        name="targetfinish"
                        placeholder="Choose Target Finish"
                        onChange={(e) => {
                          setFieldValue(`targetfinish`, e.target.value)
                        }}
                        size="md"
                        disabled={!values?.targetstart || disableEdit}
                        min={moment(values?.targetstart).format('YYYY-MM-DDTHH:mm')}
                        value={values?.targetfinish}
                        as={CFormInput}
                        type="datetime-local"
                      />
                    </CCol>
                    {/* <CCol md={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Actual Contact
                    </CFormLabel>
                    <Field
                      name="actual_contact"
                      placeholder="Choose Scheduled Start"
                      size="md"
                      min={moment().format('YYYY-MM-DD')}
                      as={CFormInput}
                      type="date"
                    />
                  </CCol> */}
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Actual Start
                      </CFormLabel>
                      <Field
                        name="actualstart"
                        placeholder="Choose Actual Start"
                        onChange={(e) => {
                          setFieldValue(`actualstart`, e.target.value)
                        }}
                        size="md"
                        min={moment().format('YYYY-MM-DDTHH:mm')}
                        value={values?.actualstart}
                        as={CFormInput}
                        type="datetime-local"
                      />
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Actual Finish
                      </CFormLabel>
                      <Field
                        name="actualfinish"
                        placeholder="Choose Actual Finish"
                        onChange={(e) => {
                          setFieldValue(`actualfinish`, e.target.value)
                        }}
                        size="md"
                        disabled={!values?.actualstart || disableEdit}
                        min={moment(values?.actualstart).format('YYYY-MM-DDTHH:mm')}
                        value={values?.actualfinish}
                        as={CFormInput}
                        type="datetime-local"
                      />

                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <div className="flex items-center mt-2 justify-between -mx-2">
                      <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                        Request Submitted
                      </p>
                      <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                    </div>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Reported By
                      </CFormLabel>
                      {console.log(values, 'valuesreportedby')}
                      <Field
                        name="reportedby"
                        placeholder={values?.reportedby?.label || "Select Reported"}
                        apiController={getReportBy}
                        value={values?.reportedby?.label || ""}
                        valueKey="value"
                        labelKey="label"
                        size="md"
                        as={CFormInput}
                        disabled
                      />
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Reported Date
                      </CFormLabel>
                      <Field
                        name="reporteddate"
                        placeholder="Choose Scheduled Start"
                        size="md"
                        min={moment().format('YYYY-MM-DDTHH:mm')}
                        value={values?.reporteddate}
                        as={CFormInput}
                        type="datetime-local"
                        disabled
                      />
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Affected User <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="affectedperson"
                        placeholder="Select User"
                        valueKey="user_id"
                        labelKey="display_name"
                        invalid={touched.user_id && errors.user_id}
                        apiController={getUserSite}
                        value={values?.affectedperson}
                        size="md"
                        onBlur={() => setFieldTouched('affectedperson')}
                        onChange={(val) => {
                          setFieldValue(`affectedperson`, val)
                        }}
                        as={SelectPagination}
                        isClearable
                      />
                      {errors.affectedperson && touched.affectedperson ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.affectedperson}</div>
                      ) : null}
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Affected Date <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="affecteddate"
                        placeholder="Choose Scheduled Start"
                        size="md"
                        max={moment().format('YYYY-MM-DDTHH:mm')}
                        onBlur={() => setFieldTouched('affecteddate')}
                        invalid={touched.affecteddate && errors.affecteddate}
                        as={CFormInput}
                        type="datetime-local"
                      />
                      {errors.affecteddate && touched.affecteddate ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.affected_date}</div>
                      ) : null}
                    </CCol>
                  </CRow>
                </CContainer>
              </DetailCard>
              <CFooter className="form-footer">
                <div className="ml-[80px] w-[10%] my-2 flex items-center justify-between">
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
                    disabled={isSubmitting}
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
export default ServiceRequestForm
