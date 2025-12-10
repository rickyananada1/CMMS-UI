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
  CFormCheck,
} from '@coreui/react'
import useWorkOrder from './hooks/useWorkOrder'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import { Field, Form, Formik } from 'formik'
import { Select, SelectPagination } from 'src/components/elements/select'
import { workOrderSchema } from './schema'
import moment from 'moment'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'

const WOTrackingForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    isLoading,
    handleSubmit,
    getWorkTypes,
    getWorkPriorities,
    getWorkClassifications,
    getLocations,
    getAssets,
    getSites,
    getFailureCodes,
    getHazardGroup,
    getWorkOrders,
    work_order_statuses,
    data,
    getJobPlanList,
    getPMList,
    getUserSites,
    disableEdit,
    getScheduledDateFromPM,
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
    uploadModalProps,
  } = useWorkOrder({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <Formik
      enableReinitialize
      initialValues={formValue}
      onSubmit={handleSubmit}
      validationSchema={workOrderSchema}
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
                  <h4 className="w-font-semibold">Update Work Order</h4>
                  <p>Update Work Order Details</p>
                </div>
              ) : (
                <div>
                  <h4 className="w-font-semibold">New Work Order</h4>
                  <p>Fill this column to add new Work Order</p>
                </div>
              )}
              <CContainer fluid>
                <div className="flex items-center mt-2 justify-between -mx-2">
                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                    General
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <CRow>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Work Order <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="work_order_code"
                      placeholder="Enter Work Order Code"
                      value={values?.work_order_code}
                      invalid={touched.work_order_code && errors.work_order_code}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                      disabled={disableEdit}
                    />
                    {errors.work_order_code && touched.work_order_code ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.work_order_code}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Description <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="description"
                      placeholder="Enter Work Order Description"
                      value={values?.description}
                      invalid={touched.description && errors.description}
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                    {errors.description && touched.description ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.description}</div>
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
                    {errors.location_id && touched.location_id && !values.location_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.location_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Location Description
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
                <CRow className="mt-4">
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
                    <CFormLabel className="text-primary fw-semibold">Asset Description</CFormLabel>
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
                      Configuration Item <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="configuration_item_id"
                      placeholder="Enter Configuration Item"
                      value={values?.configuration_item_id}
                      invalid={touched.configuration_item_id && errors.configuration_item_id}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                      disabled={disableEdit}
                    />
                    {errors.configuration_item_id && touched.configuration_item_id ? (
                      <div className="text-sm text-[#e55353] mt-1">
                        {errors.configuration_item_id}
                      </div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Configuration Item Description <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="configuration_item_description"
                      placeholder="Enter Configuration Item Description"
                      value={values?.configuration_item_description}
                      invalid={
                        touched.configuration_item_description &&
                        errors.configuration_item_description
                      }
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                    {errors.configuration_item_description &&
                      touched.configuration_item_description ? (
                      <div className="text-sm text-[#e55353] mt-1">
                        {errors.configuration_item_description}
                      </div>
                    ) : null}
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Movement Type <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="movement_type_id"
                      placeholder="Enter Movement Type"
                      value={values?.movement_type_id}
                      invalid={touched.movement_type_id && errors.movement_type_id}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                      disabled={disableEdit}
                    />
                    {errors.movement_type_id && touched.movement_type_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.movement_type_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Movement Type Description <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="movement_type_description"
                      placeholder="Enter Movement Type Description"
                      value={values?.movement_type_description}
                      invalid={
                        touched.movement_type_description && errors.movement_type_description
                      }
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                    {errors.movement_type_description && touched.movement_type_description ? (
                      <div className="text-sm text-[#e55353] mt-1">
                        {errors.movement_type_description}
                      </div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Cost Center <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="cost_center_id"
                      placeholder="Enter Cost Center"
                      value={values?.cost_center_id}
                      invalid={touched.cost_center_id && errors.cost_center_id}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                      disabled={disableEdit}
                    />
                    {errors.cost_center_id && touched.cost_center_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.cost_center_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Cost Center Description <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="cost_center_description"
                      placeholder="Enter Cost Center Description"
                      value={values?.cost_center_description}
                      invalid={touched.cost_center_description && errors.cost_center_description}
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                    {errors.cost_center_description && touched.cost_center_description ? (
                      <div className="text-sm text-[#e55353] mt-1">
                        {errors.cost_center_description}
                      </div>
                    ) : null}
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Internal Order <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="internal_order_id"
                      placeholder="Enter Internal Order"
                      value={values?.internal_order_id}
                      invalid={touched.internal_order_id && errors.internal_order_id}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                      disabled={disableEdit}
                    />
                    {errors.internal_order_id && touched.internal_order_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.internal_order_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Internal Order Description <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="internal_order_description"
                      placeholder="Enter Internal Order Description"
                      value={values?.internal_order_description}
                      invalid={
                        touched.internal_order_description && errors.internal_order_description
                      }
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                    {errors.internal_order_description && touched.internal_order_description ? (
                      <div className="text-sm text-[#e55353] mt-1">
                        {errors.internal_order_description}
                      </div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      WBS <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="wbs_id"
                      placeholder="Enter WBS"
                      value={values?.wbs_id}
                      invalid={touched.wbs_id && errors.wbs_id}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                      disabled={disableEdit}
                    />
                    {errors.wbs_id && touched.wbs_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.wbs_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      WBS Description <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="wbs_description"
                      placeholder="Enter WBS Description"
                      value={values?.wbs_description}
                      invalid={touched.wbs_description && errors.wbs_description}
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                    {errors.wbs_description && touched.wbs_description ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.wbs_description}</div>
                    ) : null}
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Vendor <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="vendor_id"
                      placeholder="Enter Vendor"
                      value={values?.vendor_id}
                      invalid={touched.vendor_id && errors.vendor_id}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                      disabled={disableEdit}
                    />
                    {errors.vendor_id && touched.vendor_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.vendor_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Vendor Description <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="vendor_description"
                      placeholder="Enter Vendor Description"
                      value={values?.vendor_description}
                      invalid={touched.vendor_description && errors.vendor_description}
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                    {errors.vendor_description && touched.vendor_description ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.vendor_description}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Parent WO</CFormLabel>
                    <Field
                      name="parent_wo_id"
                      placeholder="Select Parent WO"
                      apiController={getWorkOrders}
                      value={values?.parent_wo_id}
                      valueKey="work_order_id"
                      labelKey="work_order_code"
                      isAllData
                      onChange={(val) => {
                        setFieldValue(`parent_wo_id`, val)
                        setFieldValue(`is_task`, true)
                      }}
                      size="md"
                      as={SelectPagination}
                      isClearable
                      searchKey="qWorkOrderCode"
                      disabled={disableEdit}
                    />
                  </CCol>
                  <CCol>
                    <br />
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Site <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="site_id"
                      placeholder="Select Site"
                      apiController={getSites}
                      value={values?.site_id}
                      valueKey="site_id"
                      labelKey="site"
                      isAllData
                      onChange={(val) => {
                        setFieldValue(`site_id`, val)
                      }}
                      size="md"
                      isDisabled={true}
                      as={SelectPagination}
                    />
                    {errors.site_id && touched.site_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.site_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Class <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="classification"
                      placeholder="Select Class"
                      apiController={getWorkClassifications}
                      value={values?.classification}
                      isAllData
                      hasNoKey
                      onChange={(val) => {
                        setFieldValue(`classification`, val)
                      }}
                      size="md"
                      as={SelectPagination}
                      isLocalSearch
                      disabled={disableEdit}
                    />
                    {errors.classification && touched.classification ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.classification}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Work Type <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="work_type"
                      placeholder="Select Work Type"
                      apiController={getWorkTypes}
                      value={values?.work_type}
                      isAllData
                      hasNoKey
                      onChange={(val) => {
                        setFieldValue(`work_type`, val)
                      }}
                      size="md"
                      isLocalSearch
                      as={SelectPagination}
                      disabled={disableEdit}
                    />
                    {errors.work_type && touched.work_type ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.work_type}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Work Priority <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="work_priority"
                      placeholder="Select Work Priority"
                      apiController={getWorkPriorities}
                      value={values?.work_priority}
                      isAllData
                      hasNoKey
                      onChange={(val) => {
                        setFieldValue(`work_priority`, val)
                      }}
                      size="md"
                      as={SelectPagination}
                      isLocalSearch
                      disabled={disableEdit}
                    />
                    {errors.work_priority && touched.work_priority ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.work_priority}</div>
                    ) : null}
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      GL Account <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="gl_account_id"
                      placeholder="Enter GL Account"
                      value={values?.gl_account_id}
                      invalid={touched.gl_account_id && errors.gl_account_id}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                      disabled={disableEdit}
                    />
                    {errors.gl_account_id && touched.gl_account_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.gl_account_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Failure Class <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="failure_code"
                      placeholder="Select Failure Class"
                      apiController={getFailureCodes}
                      value={values?.failure_code}
                      valueKey="failure_code_id"
                      labelKey="failure_code"
                      searchKey="search"
                      isAllData
                      onChange={(val) => {
                        setFieldValue(`failure_code`, val)
                      }}
                      size="md"
                      as={SelectPagination}
                      disabled={disableEdit}
                    />
                    {errors.failure_code && touched.failure_code ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.failure_code}</div>
                    ) : null}
                  </CCol>
                  <CCol>
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
                  <CCol></CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Status <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="status"
                      placeholder="Select Status"
                      value={values?.status}
                      onChange={(val) => {
                        setFieldValue(`status`, val)
                      }}
                      size="md"
                      options={work_order_statuses}
                      as={Select}
                    />
                    {errors.status && touched.status ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.status}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Status Date</CFormLabel>
                    <br />
                    <span className="font-semibold">
                      {mode !== 'Create'
                        ? moment(data?.status_date).format('DD/MM/YYYY; HH:mm:ss [WIB]') ?? '-'
                        : '-'}
                    </span>
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Hazard Group</CFormLabel>
                    <Field
                      name="hazard_id"
                      placeholder="Select Hazard"
                      apiController={getHazardGroup}
                      value={values?.hazard_id}
                      isNestedValueKey
                      isNestedLabelKey
                      valueKey="hazard"
                      labelKey="hazard"
                      nestedValueKey="hazard_id"
                      nestedLabelKey="hazard_code"
                      isAllData
                      onChange={(val) => {
                        setFieldValue(`hazard_id`, val)
                      }}
                      size="md"
                      as={SelectPagination}
                      isClearable
                      disabled={disableEdit}
                    />
                    {errors.hazard_id && touched.hazard_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.hazard_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Hazard Group Description
                    </CFormLabel>
                    <Field
                      name="hazard_description"
                      placeholder="No Description"
                      value={values?.hazard_id?.hazard?.hazard_desc}
                      onChange={handleChange}
                      size="md"
                      disabled
                      as={CFormTextarea}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Need Safety Approval?
                    </CFormLabel>
                    <Field
                      className="mt-2"
                      name="need_safety_approval"
                      id="need_safety_approval"
                      value={values?.need_safety_approval}
                      size="md"
                      label={values?.need_safety_approval ? 'Yes' : 'No'}
                      checked={values?.need_safety_approval}
                      as={CFormCheck}
                      disabled={disableEdit}
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Is Task?</CFormLabel>
                    <Field
                      className="mt-2"
                      name="is_task"
                      id="is_task"
                      value={values?.is_task}
                      size="md"
                      label={values?.is_task ? 'Yes' : 'No'}
                      checked={values?.is_task}
                      disabled
                      as={CFormCheck}
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Asset Up?</CFormLabel>
                    <Field
                      className="mt-2"
                      name="asset_up"
                      id="asset_up"
                      value={values?.asset_up}
                      size="md"
                      label={values?.asset_up ? 'Yes' : 'No'}
                      checked={values?.asset_up}
                      as={CFormCheck}
                      disabled={disableEdit}
                    />
                  </CCol>
                  <CCol></CCol>
                </CRow>
                <div className="flex items-center mt-2 justify-between -mx-2">
                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                    Job Details
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <CRow>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Job Plan <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="job_plan_id"
                      placeholder="Select Job Plan"
                      apiController={getJobPlanList}
                      value={values?.job_plan_id}
                      valueKey="job_plan_id"
                      labelKey="job_plan"
                      searchKey="search"
                      otherKey={{
                        plan_description: 'plan_description',
                      }}
                      onChange={(val) => {
                        setFieldValue(`job_plan_id`, val)
                      }}
                      size="md"
                      as={SelectPagination}
                      isClearable
                      disabled={values?.pm_id || disableEdit}
                    />
                    {errors.job_plan_id && touched.job_plan_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.job_plan_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Job Plan Description
                    </CFormLabel>
                    <Field
                      name="job_plan_description"
                      placeholder="No Description"
                      value={
                        values?.job_plan_id === null ? '' : values?.job_plan_id?.plan_description
                      }
                      onChange={handleChange}
                      size="md"
                      disabled
                      as={CFormTextarea}
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Preventive Maintenance
                    </CFormLabel>
                    <Field
                      name="pm_id"
                      placeholder="Select Preventive Maintenance"
                      apiController={getPMList}
                      value={values?.pm_id}
                      valueKey="preventive_maintenance_id"
                      labelKey="preventive_maintenance_name"
                      searchKey="q"
                      otherKey={{
                        preventive_maintenance_description: 'preventive_maintenance_description',
                        job_plan_id: 'job_plan_id',
                        plan_name: 'plan_name',
                        plan_description: 'plan_description',
                      }}
                      onChange={async (val) => {
                        setFieldValue(`pm_id`, val)
                        if (val) {
                          setFieldValue(`job_plan_id`, {
                            value: val?.job_plan_id,
                            label: val?.plan_name,
                            plan_description: val?.plan_description,
                            fromPM: true,
                          })
                          setFieldValue(
                            `scheduled_start`,
                            moment(await getScheduledDateFromPM(val?.value)).format(
                              'YYYY-MM-DDTHH:mm',
                            ),
                          )
                        } else {
                          setFieldValue(`job_plan_id`, null)
                          setFieldValue(`scheduled_start`, '')
                        }
                      }}
                      size="md"
                      as={SelectPagination}
                      isClearable
                      disabled={
                        (values?.job_plan_id && !values?.job_plan_id?.fromPM) || disableEdit
                      }
                    />
                    {errors.pm_id && touched.pm_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.pm_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">PM Description</CFormLabel>
                    <Field
                      name="pm_description"
                      placeholder="No Description"
                      value={
                        values?.pm_id === null
                          ? ''
                          : values?.pm_id?.preventive_maintenance_description
                      }
                      onChange={handleChange}
                      size="md"
                      disabled
                      as={CFormTextarea}
                    />
                  </CCol>
                </CRow>
                <div className="flex items-center mt-2 justify-between -mx-2">
                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                    Related To
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <CRow>
                  <CCol md={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Service request <span className="text-red-main">*</span>
                    </CFormLabel>
                    {console.log(values, 'valuesvalues')}
                    <Field
                      name="ticketid"
                      placeholder="Select Ticket"
                      apiController={getUserSites}
                      value={values?.ticketid}
                      valueKey="uuid"
                      labelKey="ticketid"
                      otherKey={{
                        description: 'description',
                      }}
                      onChange={(val) => {
                        setFieldValue("ticketid", val);
                        setFieldValue("description", val?.description || "");
                      }}
                      size="md"
                      as={SelectPagination}
                      isClearable
                    />
                    {errors.job_plan_id && touched.job_plan_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.job_plan_id}</div>
                    ) : null}
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel className="text-primary fw-semibold">Summary</CFormLabel>
                    <Field
                      name="description"
                      placeholder="No Description"
                      value={values?.description || '' }
                      onChange={handleChange}
                      size="md"
                      disabled
                      as={CFormTextarea}
                    />
                  </CCol>
                </CRow>

                <div className="flex items-center mt-2 justify-between -mx-2">
                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                    Scheduling Information
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <CRow>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Scheduled Start <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="scheduled_start"
                      placeholder="Choose Scheduled Start"
                      onChange={(e) => {
                        setFieldValue(`scheduled_start`, e.target.value)
                      }}
                      size="md"
                      min={moment().format('YYYY-MM-DDTHH:mm')}
                      value={values?.scheduled_start}
                      as={CFormInput}
                      type="datetime-local"
                      disabled={values?.pm_id || disableEdit}
                    />
                    {errors?.scheduled_start && touched?.scheduled_start ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.scheduled_start}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">
                      Scheduled Finish <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="scheduled_finish"
                      placeholder="Choose Scheduled Finish"
                      onChange={(e) => {
                        setFieldValue(`scheduled_finish`, e.target.value)
                      }}
                      size="md"
                      disabled={!values?.scheduled_start || disableEdit}
                      min={moment(values?.scheduled_start).format('YYYY-MM-DDTHH:mm')}
                      value={values?.scheduled_finish}
                      as={CFormInput}
                      type="datetime-local"
                    />
                    {errors?.scheduled_finish && touched?.scheduled_finish ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.scheduled_finish}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Actual Start</CFormLabel>
                    <Field
                      name="actual_start"
                      placeholder="Choose Actual Start"
                      onChange={(e) => {
                        setFieldValue(`actual_start`, e.target.value)
                      }}
                      size="md"
                      min={moment().format('YYYY-MM-DDTHH:mm')}
                      value={values?.actual_start}
                      as={CFormInput}
                      type="datetime-local"
                      disabled
                    />
                    {errors?.actual_start && touched?.actual_start ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.actual_start}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Actual Finish</CFormLabel>
                    <Field
                      name="actual_finish"
                      placeholder="Choose Actual Finish"
                      onChange={(e) => {
                        setFieldValue(`actual_finish`, e.target.value)
                      }}
                      size="md"
                      disabled={!values?.actual_start || disableEdit}
                      min={moment(values?.actual_start).format('YYYY-MM-DDTHH:mm')}
                      value={values?.actual_finish}
                      as={CFormInput}
                      type="datetime-local"
                    />
                    {errors?.actual_finish && touched?.actual_finish ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.actual_finish}</div>
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
                  disabled={isSubmitting || !dirty}
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

export default WOTrackingForm
