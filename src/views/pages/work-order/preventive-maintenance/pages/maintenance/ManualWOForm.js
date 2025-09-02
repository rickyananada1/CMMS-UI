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
  CFormCheck,
  CFormTextarea,
} from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import { Field, Form, Formik } from 'formik'
import { Select, SelectPagination } from 'src/components/elements/select'
import { workOrderSchema } from './schema'
import moment from 'moment'
import { GrAttachment } from 'react-icons/gr'
import useManualWOForm from './Hooks/useManualWOForm'

const ManualWOForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    isLoading,
    handleSubmit,
    handleDownload,
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
    disableEdit,
  } = useManualWOForm({
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
        isValid,
        dirty,
        isSubmitting,
        values,
        touched,
      }) => {
        return (
          <Form>
            <DetailCard isLoading={isLoading}>
              <div>
                <h4 className="w-font-semibold">Manual Create Work Order</h4>
                <p>Fill this column to manually create PM Work Order</p>
              </div>
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
                      name="location_id"
                      placeholder="Select Location"
                      apiController={getLocations}
                      value={values?.location_id}
                      valueKey="location_id"
                      labelKey="location"
                      searchKey="qLocation"
                      isAllData
                      onChange={(val) => {
                        setFieldValue(`location_id`, val)
                      }}
                      size="md"
                      as={SelectPagination}
                      disabled={disableEdit}
                    />
                    {errors.location_id && touched.location_id ? (
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
                      value={values?.location_id?.location_description}
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
                      name="asset_id"
                      placeholder="Select Asset"
                      apiController={getAssets}
                      value={values?.asset_id}
                      valueKey="asset_id"
                      labelKey="asset_num"
                      isAllData
                      onChange={(val) => {
                        setFieldValue(`asset_id`, val)
                      }}
                      size="md"
                      as={SelectPagination}
                      disabled={disableEdit}
                    />
                    {errors.asset_id && touched.asset_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.asset_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Asset Description</CFormLabel>
                    <Field
                      name="asset_description"
                      placeholder="No Description"
                      value={values?.asset_id?.asset_description}
                      onChange={handleChange}
                      size="md"
                      disabled
                      as={CFormTextarea}
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Configuration Item</CFormLabel>
                    <Field
                      name="configuration_item_id"
                      placeholder="Enter Configuration Item"
                      value={values?.configuration_item_id}
                      invalid={touched.configuration_item_id && errors.configuration_item_id}
                      onChange={handleChange}
                      type="number"
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
                      Configuration Item Description
                    </CFormLabel>
                    <Field
                      name="configuration_item_description"
                      placeholder="Enter Configuration Item Description"
                      value={values?.configuration_item_description}
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Movement Type</CFormLabel>
                    <Field
                      name="movement_type_id"
                      placeholder="Enter Movement Type"
                      value={values?.movement_type_id}
                      invalid={touched.movement_type_id && errors.movement_type_id}
                      onChange={handleChange}
                      type="number"
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
                      Movement Type Description
                    </CFormLabel>
                    <Field
                      name="movement_type_description"
                      placeholder="Enter Movement Type Description"
                      value={values?.movement_type_description}
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Cost Center</CFormLabel>
                    <Field
                      name="cost_center_id"
                      placeholder="Enter Cost Center"
                      value={values?.cost_center_id}
                      invalid={touched.cost_center_id && errors.cost_center_id}
                      onChange={handleChange}
                      type="number"
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
                      Cost Center Description
                    </CFormLabel>
                    <Field
                      name="cost_center_description"
                      placeholder="Enter Cost Center Description"
                      value={values?.cost_center_description}
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Internal Order</CFormLabel>
                    <Field
                      name="internal_order_id"
                      placeholder="Enter Internal Order"
                      value={values?.internal_order_id}
                      invalid={touched.internal_order_id && errors.internal_order_id}
                      onChange={handleChange}
                      type="number"
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
                      Internal Order Description
                    </CFormLabel>
                    <Field
                      name="internal_order_description"
                      placeholder="Enter Internal Order Description"
                      value={values?.internal_order_description}
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">WBS</CFormLabel>
                    <Field
                      name="wbs_id"
                      placeholder="Enter WBS"
                      value={values?.wbs_id}
                      invalid={touched.wbs_id && errors.wbs_id}
                      onChange={handleChange}
                      type="number"
                      size="md"
                      as={CFormInput}
                      disabled={disableEdit}
                    />
                    {errors.wbs_id && touched.wbs_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.wbs_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">WBS Description</CFormLabel>
                    <Field
                      name="wbs_description"
                      placeholder="Enter WBS Description"
                      value={values?.wbs_description}
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Vendor</CFormLabel>
                    <Field
                      name="vendor_id"
                      placeholder="Enter Vendor"
                      value={values?.vendor_id}
                      invalid={touched.vendor_id && errors.vendor_id}
                      onChange={handleChange}
                      type="number"
                      size="md"
                      as={CFormInput}
                      disabled={disableEdit}
                    />
                    {errors.vendor_id && touched.vendor_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.vendor_id}</div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Vendor Description</CFormLabel>
                    <Field
                      name="vendor_description"
                      placeholder="Enter Vendor Description"
                      value={values?.vendor_description}
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                      disabled={disableEdit}
                    />
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
                      disabled={disableEdit}
                    />
                    {errors.work_priority && touched.work_priority ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.work_priority}</div>
                    ) : null}
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">GL Account</CFormLabel>
                    <Field
                      name="gl_account_id"
                      placeholder="Enter GL Account"
                      value={values?.gl_account_id}
                      invalid={touched.gl_account_id && errors.gl_account_id}
                      onChange={handleChange}
                      type="number"
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
                    <CFormLabel className="text-primary fw-semibold">Attachments</CFormLabel>
                    <Field
                      name="work_order_attachment"
                      placeholder="Select File"
                      value={values?.work_order_attachment}
                      invalid={touched.work_order_attachment && errors.work_order_attachment}
                      onChange={(e) => {
                        setFieldValue('work_order_file', e.target.files[0])
                        handleChange(e)
                      }}
                      size="md"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,image/*"
                      as={CFormInput}
                      disabled={disableEdit}
                    />
                    {errors.work_order_attachment && touched.work_order_attachment ? (
                      <div className="text-sm text-[#e55353] mt-1">
                        {errors.work_order_attachment}
                      </div>
                    ) : null}
                  </CCol>
                  <CCol>
                    <Field
                      name="work_order_attachment_url"
                      value={values?.work_order_attachment_url}
                      className="hidden"
                    />
                    {data?.work_order_attachment_url && (
                      <>
                        <br />
                        <div
                          className="flex font-semibold text-primary items-center cursor-pointer mt-3"
                          onClick={() => handleDownload()}
                        >
                          <GrAttachment />
                          <span className="underline">Attachments</span>
                        </div>
                      </>
                    )}
                  </CCol>
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
                    <CFormLabel className="text-primary fw-semibold">Job Plan</CFormLabel>
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
                      disabled={disableEdit}
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
                      value={values?.job_plan_id?.plan_description}
                      onChange={handleChange}
                      size="md"
                      disabled
                      as={CFormTextarea}
                    />
                  </CCol>
                  <CCol md={6} />
                </CRow>
                <div className="flex items-center mt-2 justify-between -mx-2">
                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                    Scheduling Information
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <CRow>
                  <CCol>
                    <CFormLabel className="text-primary fw-semibold">Actual Start</CFormLabel>
                    <Field
                      name="actual_start"
                      placeholder="Choose Actual Start"
                      onChange={(e) => {
                        setFieldValue(`actual_start`, e.target.value)
                      }}
                      size="md"
                      min={new Date().toISOString().slice(0, 10)}
                      value={values?.actual_start}
                      as={CFormInput}
                      type="date"
                      disabled={disableEdit}
                    />
                    {errors?.actual_start && touched?.actual_start ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.actual_start}</div>
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
                      min={new Date(new Date(values?.actual_start ?? null).getTime() + 86400000)
                        ?.toISOString()
                        .slice(0, 10)}
                      value={values?.actual_finish}
                      as={CFormInput}
                      type="date"
                    />
                    {errors?.actual_finish && touched?.actual_finish ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.actual_finish}</div>
                    ) : null}
                  </CCol>
                  <CCol md={6} />
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

export default ManualWOForm
