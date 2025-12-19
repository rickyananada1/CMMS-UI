/* eslint-disable */
/* prettier-ignore-start */
import React, { useState } from 'react'
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
import useTicketEcp from './hooks/useTicketEcp'
import { CiPaperplane } from 'react-icons/ci'
import { Field, Form, Formik } from 'formik'
import { ticketEcpSchema } from './schema'
import { Select, SelectPagination } from 'src/components/elements/select'
import moment from 'moment'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'
import InputFile from 'src/components/elements/input/InputFile'
import UploadSummaryModal from 'src/views/pages/upload-file/components/UploadSummaryModal'
import Editor from '../../../../../../../src/components/editor/EditorTiptap'

const TicketEcpForm = ({ mode, setAction, setTabIndex, formik }) => {
  const {
    formValue,
    isLoading,
    handleSubmit,
    getLocations,
    getAssets,
    getUserSite,
    getReportBy,
    ticket_ecp_statuses,
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
    isNewFiles,
  } = useTicketEcp({
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
        validationSchema={ticketEcpSchema}
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
          const handleLocationChange = (val) => {
            setFieldValue('location_id', val)

            if (!val) {
              setFieldValue('asset_id', null)
              setFieldValue('is_location_first', null)
              setIsLocationChanged(false)
              setIsAssetChanged(false)
              setIsLocationDisabled(false)
              setIsLocationFirst(null)
            } else {
              setIsLocationChanged(true)
              setIsLocationDisabled(false)

              if (isLocationFirst === null) {
                setIsLocationFirst(true)
                setFieldValue('is_location_first', true)
              }

              if (!isAssetChanged) {
                setFieldValue('asset_id', null)
              }
            }
          }

          const handleAssetChange = (val) => {
            setFieldValue('asset_id', val)

            if (!val) {
              if (!isLocationChanged) {
                setFieldValue('location_id', null)
                setFieldValue('is_location_first', null)
                setIsLocationDisabled(false)
              }
              setIsAssetChanged(false)
              setIsLocationFirst(null)
            } else {
              setIsAssetChanged(true)

              if (!isLocationChanged) {
                setIsLocationDisabled(true)
                setFieldValue('location_id', {
                  value: val?.location_id,
                  label: val?.location,
                  location_description: val?.location_description,
                })

                if (isLocationFirst === null) {
                  setIsLocationFirst(false)
                  setFieldValue('is_location_first', false)
                }
              }
            }
          }

          return (
            <Form>
              <DetailCard isLoading={isLoading}>
                {mode === 'Update' ? (
                  <div>
                    <h4 className="w-font-semibold">Update Engineering Change Proposal</h4>
                    <p>Update Engineering Change Proposal</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="w-font-semibold">New Engineering Change Proposal</h4>
                    <p>Fill this column to add new engineering change proposal</p>
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
                        ECP Number <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="ticketid"
                        placeholder="Enter ECP Number"
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
                        Summary ECP <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="description"
                        placeholder="Enter Summary ECP"
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
                        Status ECP <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="status"
                        placeholder="Choose Status ECP"
                        value={values?.status}
                        isAllData
                        hasNoKey
                        onChange={(val) => {
                          setFieldValue(`status`, val)
                        }}
                        size="md"
                        as={Select}
                        options={ticket_ecp_statuses}
                        isLocalSearch
                      />
                      {errors.status && touched.status ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.status}</div>
                      ) : null}
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
                        Detail Engineering Change Proposal <span className="text-red-main">*</span>
                      </CFormLabel>
                      <div>
                        <Editor
                          name="detailsummary"
                          value={typeof values.detailsummary === 'string'
                            ? values.detailsummary
                            : ''}
                          valueKey="detailsummary"
                          labelKey="detailsummary"
                          otherKey={{
                            description: 'detailsummary',
                          }}
                          invalid={touched.detailsummary && errors.detailsummary}
                          onChange={(val) => {
                            setFieldValue('detailsummary', val ?? '')
                          }}
                          onBlur={() => setFieldTouched('detailsummary', true)}
                          size="md"
                        />
                        {errors.detailsummary && touched.detailsummary ? (
                          <div className="text-sm text-[#e55353] mt-1">{errors.detailsummary}</div>
                        ) : null}
                      </div>
                    </CCol>
                  </CRow>
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
                        Asset Description <span className="text-red-main">*</span>
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
                      {errors.asset_description && touched.asset_description ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.asset_description}</div>
                      ) : null}
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
                        value={values?.location_id}
                        valueKey="location_id"
                        labelKey="location"
                        searchKey="qLocation"
                        otherKey={{
                          asset_id: 'asset_id',
                          asset_num: 'asset_num',
                          asset_description: 'asset_description',
                          location_description: 'location_description',
                        }}
                        onChange={handleLocationChange}
                        onBlur={() => setFieldTouched('location_id')}
                        size="md"
                        as={SelectPagination}
                        isClearable
                        disabled={disableEdit || isLocationDisabled}
                      />
                      {errors.location_id && touched.location_id ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.location_id}</div>
                      ) : null}
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Location Description <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="location_description"
                        placeholder="No Description"
                        value={
                          values?.location_id?.location_description
                            ? values?.location_id?.location_description
                            : ''
                        }
                        onChange={handleChange}
                        size="md"
                        disabled
                        as={CFormTextarea}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <div className="flex items-center mt-2 justify-between -mx-2">
                      <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                        Request Submited
                      </p>
                      <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                    </div>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Reported By <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="display_name"
                        placeholder={values?.reportedby?.label || "Select Reported"}
                        apiController={getReportBy}
                        value={values?.reportedby?.label || ""}
                        valueKey="value"
                        labelKey="label"
                        size="md"
                        as={CFormInput}
                        disabled
                      />
                      {errors.reportedby && touched.reportedby ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.reportedby}</div>
                      ) : null}
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Reported Date <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="reporteddate"
                        placeholder="Choose Scheduled Start"
                        as={CFormInput}
                        type="date"
                        min={moment().format('YYYY-MM-DD')}
                        value={
                          values?.reporteddate
                            ? moment(values.reporteddate).format('YYYY-MM-DD')
                            : moment().format('YYYY-MM-DD')
                        }
                        disabled
                        size="md"
                      />
                      {/* {errors.reporteddate && touched.reporteddate ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.reporteddate}</div>
                      ) : null} */}
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Reported Phone <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="reportedphone"
                        placeholder="Enter Reported Phone"
                        size="md"
                        as={CFormInput}
                        disabled
                      />
                      {errors.phone_number && touched.phone_number ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.phone_number}</div>
                      ) : null}
                    </CCol>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Reported E-mail <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="reportedemail"
                        placeholder="Enter Reported E-mail"
                        size="md"
                        as={CFormInput}
                        disabled
                      />
                      {errors.email && touched.email ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.email}</div>
                      ) : null}
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Organization <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="organization"
                        placeholder={values?.organization || "Enter Organization"}
                        size="md"
                        as={CFormInput}
                        disabled
                      />
                      {errors.organization && touched.organization ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.organization}</div>
                      ) : null}
                    </CCol>
                    <CCol md={3}>
                      <CFormLabel className="text-primary fw-semibold">
                        Site <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="site_id"
                        placeholder="Enter Site"
                        value={values?.asset_id?.site || ''}
                        size="md"
                        disabled
                        as={CFormInput}
                      />
                      {errors.site_id && touched.site_id ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.site_id}</div>
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
                    disabled={isSubmitting || (!dirty && !isNewFiles)}
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
export default TicketEcpForm
