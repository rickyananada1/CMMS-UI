import { Field, FieldArray, Form, Formik } from 'formik'
import React, { Fragment } from 'react'
import useConditionMonitoringForm from './hooks/useConditionMonitoringForm'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFooter,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CSpinner,
} from '@coreui/react'
import { SelectPagination } from 'src/components/elements/select'
import { BsTrash } from 'react-icons/bs'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { CiPaperplane } from 'react-icons/ci'
import { conditionMonitoringSchema } from './schema'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'

const ConditionMonitoringForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    getLocationDropdown,
    getAssetDropdown,
    getMeterDropdown,
    getSiteDropdown,
    handleSubmit,
    isDisabled,
    getJobPlanDropdown,
    getPMDropdown,
    isModalOpen,
    setIsModalOpen,
    uploadModalProps,
  } = useConditionMonitoringForm({
    mode,
    setAction,
    setTabIndex,
  })
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-b-lg">
      <Formik
        enableReinitialize
        validationSchema={conditionMonitoringSchema}
        initialValues={formValue}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          isValid,
          dirty,
          isSubmitting,
          setFieldTouched,
          setFieldValue,
          values,
        }) => {
          return (
            <Form>
              <CCard className="card-b-left">
                <CCardBody className="p-3 mb-5">
                  <div className="w-full p-2">
                    <h5 className="font-semibold">
                      {mode === 'Create' ? 'New Condition Monitoring' : 'Edit Condition Monitoring'}{' '}
                    </h5>
                    <div>
                      <p className="text-sm">
                        {'Fill this column to add new Condition Monitoring'}
                      </p>
                    </div>
                    <hr />
                    <CContainer fluid>
                      <CRow>
                        <CCol sm={12} md={3} className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">Point</CFormLabel>
                          <Field
                            name="data.condition_monitoring.point_num"
                            placeholder="Enter Point"
                            value={values.data.condition_monitoring.point_num}
                            onChange={(val) =>
                              setFieldValue('data.condition_monitoring.point_num', val.target.value)
                            }
                            onBlur={() => {
                              setFieldTouched('data.condition_monitoring.point_num')
                            }}
                            size="md"
                            disabled={isSubmitting}
                            as={CFormInput}
                          />
                          {errors &&
                          errors.data?.condition_monitoring?.point_num &&
                          touched &&
                          touched.data?.condition_monitoring?.point_num ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.data.condition_monitoring.point_num}
                            </div>
                          ) : null}
                        </CCol>
                        <CCol sm={12} md={3} className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">
                            Description Point
                          </CFormLabel>
                          <Field
                            name="data.condition_monitoring.point_description"
                            placeholder="Enter Description Point"
                            value={values.data.condition_monitoring.point_description}
                            onChange={(val) =>
                              setFieldValue(
                                'data.condition_monitoring.point_description',
                                val.target.value,
                              )
                            }
                            onBlur={() =>
                              setFieldTouched('data.condition_monitoring.point_description')
                            }
                            size="md"
                            disabled={isSubmitting}
                            as={CFormTextarea}
                          />
                          {errors &&
                          errors.data?.condition_monitoring?.point_description &&
                          touched &&
                          touched.data?.condition_monitoring?.point_description ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.data.condition_monitoring.point_description}
                            </div>
                          ) : null}
                        </CCol>
                        <CCol sm={12} md={3} className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">Location</CFormLabel>
                          <Field
                            key={`location-${values.data.condition_monitoring.location_id?.value}`}
                            name="data.condition_monitoring.location_id"
                            placeholder="Choose Location"
                            value={values.data.condition_monitoring.location_id}
                            apiController={getLocationDropdown}
                            valueKey="location_id"
                            labelKey="location"
                            otherKey={{
                              description: 'location_description',
                              uom: 'uom',
                            }}
                            onBlur={() => {
                              setFieldTouched('data.condition_monitoring.location_id')
                            }}
                            onChange={(val) => {
                              setFieldValue('data.condition_monitoring.location_id', val)
                              if (val) {
                                setFieldValue('data.condition_monitoring.meter_id', null)
                              }
                            }}
                            size="md"
                            isDisabled={
                              mode === 'Update' ||
                              isSubmitting ||
                              !!values.data.condition_monitoring.asset_id?.value
                            }
                            searchKey="qLocation"
                            isClearable
                            as={SelectPagination}
                          />
                          {errors &&
                          errors.data?.condition_monitoring?.location_id &&
                          touched &&
                          touched.data?.condition_monitoring?.location_id ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.data.condition_monitoring.location_id}
                            </div>
                          ) : null}
                        </CCol>
                        <CCol sm={12} md={3} className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">
                            Description Location
                          </CFormLabel>
                          <Field
                            name="data.condition_monitoring.location_id"
                            placeholder="Enter Description Location"
                            value={
                              values.data.condition_monitoring.location_id === null
                                ? ''
                                : values.data.condition_monitoring.location_id?.description
                            }
                            onChange
                            disabled
                            size="md"
                            as={CFormTextarea}
                          />
                        </CCol>
                        <CCol sm={12} md={3} className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">Asset</CFormLabel>
                          <Field
                            key={`asset-${values.data.condition_monitoring.asset_id?.value}`}
                            name="data.condition_monitoring.asset_id"
                            placeholder="Choose Asset"
                            value={values.data.condition_monitoring.asset_id}
                            apiController={getAssetDropdown}
                            valueKey="asset_id"
                            labelKey="asset_num"
                            otherKey={{
                              description: 'asset_description',
                            }}
                            onBlur={() => {
                              setFieldTouched('data.condition_monitoring.asset_id')
                            }}
                            onChange={(val) => {
                              setFieldValue('data.condition_monitoring.asset_id', val)
                              if (val) {
                                setFieldValue('data.condition_monitoring.meter_id', null)
                              }
                            }}
                            size="md"
                            isDisabled={
                              mode === 'Update' ||
                              isSubmitting ||
                              !!values.data.condition_monitoring.location_id?.value
                            }
                            isClearable
                            as={SelectPagination}
                          />
                          {errors &&
                          errors.data?.condition_monitoring?.asset_id &&
                          touched &&
                          touched.data?.condition_monitoring?.asset_id ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.data.condition_monitoring.asset_id}
                            </div>
                          ) : null}
                        </CCol>
                        <CCol sm={12} md={3} className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">
                            Description Asset
                          </CFormLabel>
                          <Field
                            name="description"
                            placeholder="Enter Description Asset"
                            value={
                              values.data.condition_monitoring.asset_id === null
                                ? ''
                                : values.data.condition_monitoring.asset_id?.description
                            }
                            disabled
                            size="md"
                            as={CFormTextarea}
                          />
                        </CCol>
                        <CCol sm={12} md={3} className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">Meter</CFormLabel>
                          <Field
                            key={`${values.data.condition_monitoring.asset_id?.value || ''}-${
                              values.data.condition_monitoring.location_id?.value || ''
                            }`}
                            name="data.condition_monitoring.meter_id"
                            placeholder="Choose Meter"
                            value={values.data.condition_monitoring.meter_id}
                            apiController={getMeterDropdown}
                            query={{
                              locationId: values.data.condition_monitoring.location_id?.value || 0,
                              assetId: values.data.condition_monitoring.asset_id?.value || 0,
                            }}
                            valueKey="meter_id"
                            labelKey="meter_name"
                            otherKey={{
                              description: 'meter_description',
                              meter_type: 'meter_type',
                              asset_id: 'asset_id',
                              uom: 'uom',
                            }}
                            onBlur={() => {
                              setFieldTouched('data.condition_monitoring.meter_id')
                            }}
                            onChange={(val) => {
                              setFieldValue('data.condition_monitoring.meter_id', val)
                              if (val) {
                                setFieldValue(
                                  'data.condition_monitoring.meter_type',
                                  val.meter_type,
                                )
                              }
                            }}
                            isDisabled={
                              mode === 'Update' ||
                              isSubmitting ||
                              (values.data.condition_monitoring.asset_id === null &&
                                values.data.condition_monitoring.location_id === null)
                            }
                            cahceUniqs={[
                              values.data.condition_monitoring.asset_id?.value || '',
                              values.data.condition_monitoring.location_id?.value || '',
                            ]}
                            size="md"
                            isClearable
                            as={SelectPagination}
                          />
                          {errors &&
                          errors.data?.condition_monitoring?.meter_id &&
                          touched &&
                          touched.data?.condition_monitoring?.meter_id ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.data.condition_monitoring.meter_id}
                            </div>
                          ) : null}
                        </CCol>
                        <CCol sm={12} md={3} className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">
                            Description Meter
                          </CFormLabel>
                          <Field
                            name="description"
                            placeholder="Enter Description Meter"
                            value={
                              values.data.condition_monitoring.meter_id === null
                                ? ''
                                : values.data.condition_monitoring.meter_id?.description
                            }
                            disabled
                            size="md"
                            as={CFormTextarea}
                          />
                        </CCol>
                        <CCol sm={12} md={3} className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">Site</CFormLabel>
                          <Field
                            name="data.condition_monitoring.site_id"
                            placeholder="Choose Site"
                            value={values.data.condition_monitoring.site_id}
                            apiController={getSiteDropdown}
                            valueKey="site_id"
                            labelKey="site"
                            onBlur={() => {
                              setFieldTouched('data.condition_monitoring.site_id')
                            }}
                            onChange={(val) =>
                              setFieldValue('data.condition_monitoring.site_id', val)
                            }
                            size="md"
                            isDisabled={true}
                            as={SelectPagination}
                          />
                          {errors &&
                          errors.data?.condition_monitoring?.site_id &&
                          touched &&
                          touched.data?.condition_monitoring?.site_id ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.data.condition_monitoring.site_id}
                            </div>
                          ) : null}
                        </CCol>
                        <CCol sm={12} md={3} className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">Meter Type</CFormLabel>
                          <Field
                            name="data.condition_monitoring.meter_type"
                            placeholder="Enter Meter Type"
                            value={
                              values.data.condition_monitoring.meter_id === null
                                ? ''
                                : values.data.condition_monitoring.meter_id?.meter_type
                            }
                            disabled
                            size="md"
                            as={CFormInput}
                          />
                        </CCol>
                        <CCol sm={12} md={3} className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">
                            Unit Of Measure
                          </CFormLabel>
                          <Field
                            name="description"
                            placeholder="Unit Of Measure"
                            value={
                              values.data.condition_monitoring.meter_id === null
                                ? ''
                                : values.data.condition_monitoring.meter_id?.uom
                            }
                            disabled
                            size="md"
                            as={CFormInput}
                          />
                        </CCol>
                        <CCol sm={12} md={3} className="mb-4">
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
                          {errors &&
                          errors.data?.attachment &&
                          touched &&
                          touched.data?.attachment ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.data.attachment}
                            </div>
                          ) : null}
                        </CCol>
                      </CRow>
                      {(values.data.condition_monitoring.meter_id?.meter_type === 'gauge' ||
                        values.data.condition_monitoring.meter_id?.meter_type === 'continuous') && (
                        <Fragment>
                          <div className="flex items-center justify-between mt-2">
                            <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
                              Upper Limits
                            </p>
                            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                          </div>
                          <CRow>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Upper Warning Limit
                              </CFormLabel>
                              <Field
                                name="data.measure_point.upper_warning_limit"
                                placeholder="Enter Upper Warning Limit"
                                value={values.data.measure_point.upper_warning_limit}
                                onChange={(val) =>
                                  setFieldValue(
                                    'data.measure_point.upper_warning_limit',
                                    val.target.valueAsNumber,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched('data.measure_point.upper_warning_limit')
                                }
                                type="number"
                                size="md"
                                disabled={isSubmitting || isDisabled}
                                as={CFormInput}
                              />
                              {errors &&
                              errors.data?.measure_point?.upper_warning_limit &&
                              touched &&
                              touched.data?.measure_point?.upper_warning_limit ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.upper_warning_limit}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Upper Action Limit
                              </CFormLabel>
                              <Field
                                name="data.measure_point.upper_action_limit"
                                placeholder="Enter Upper Action Limit"
                                value={values.data.measure_point.upper_action_limit}
                                onChange={(val) =>
                                  setFieldValue(
                                    'data.measure_point.upper_action_limit',
                                    val.target.valueAsNumber,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched('data.measure_point.upper_action_limit')
                                }
                                type="number"
                                size="md"
                                disabled={isSubmitting || isDisabled}
                                as={CFormInput}
                              />
                              {errors &&
                              errors.data?.measure_point?.upper_action_limit &&
                              touched &&
                              touched.data?.measure_point?.upper_action_limit ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.upper_action_limit}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Upper Limit PM
                              </CFormLabel>
                              <Field
                                key={`upper-pm-${values.data.measure_point.upper_limit_pm}`}
                                name="data.measure_point.upper_limit_pm"
                                placeholder="Choose Upper Limit PM"
                                value={values.data.measure_point.upper_limit_pm}
                                apiController={getPMDropdown}
                                valueKey="preventive_maintenance_id"
                                labelKey="preventive_maintenance_name"
                                otherKey={{
                                  description: 'preventive_maintenance_description',
                                  job_plan_id: 'job_plan_id',
                                  plan_name: 'plan_name',
                                  plan_description: 'plan_description',
                                }}
                                onChange={(val) => {
                                  setFieldValue('data.measure_point.upper_limit_pm', val)
                                  if (val) {
                                    setFieldValue('data.measure_point.upper_limit_job_plan', {
                                      label: val.plan_name,
                                      value: val.job_plan_id,
                                      plan_description: val.plan_description,
                                      pm: true,
                                    })
                                  } else {
                                    setFieldValue('data.measure_point.upper_limit_job_plan', null)
                                  }
                                }}
                                onBlur={() => setFieldTouched('data.measure_point.upper_limit_pm')}
                                size="md"
                                disabled={
                                  isSubmitting ||
                                  (values.data.measure_point.upper_limit_job_plan &&
                                    !values.data.measure_point.upper_limit_job_plan?.pm)
                                }
                                searchKey="qPreventiveMaintenanceName"
                                isClearable
                                as={SelectPagination}
                              />
                              {errors &&
                              errors.data?.measure_point?.upper_limit_pm &&
                              touched &&
                              touched.data?.measure_point?.upper_limit_pm ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.upper_limit_pm}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Upper Limit PM Description
                              </CFormLabel>
                              <Field
                                name="data.measure_point.upper_limit_pm_description"
                                placeholder="Enter Upper Limit PM Description"
                                value={
                                  values.data.measure_point.upper_limit_pm === null
                                    ? ''
                                    : values.data.measure_point.upper_limit_pm?.description
                                }
                                onChange={(val) =>
                                  setFieldValue(
                                    'data.measure_point.upper_limit_pm_description',
                                    val.target.value,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched('data.measure_point.upper_limit_pm_description')
                                }
                                size="md"
                                disabled
                                as={CFormTextarea}
                              />
                              {errors &&
                              errors.data?.measure_point?.upper_limit_pm_description &&
                              touched &&
                              touched.data?.measure_point?.upper_limit_pm_description ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.upper_limit_pm_description}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Upper Limit Job Plan
                              </CFormLabel>
                              <Field
                                key={`upper-job-plan-${values.data.measure_point.upper_limit_job_plan?.value}`}
                                name={`data.measure_point.upper_limit_job_plan`}
                                placeholder="Choose Job Plan"
                                value={values.data.measure_point.upper_limit_job_plan}
                                apiController={getJobPlanDropdown}
                                valueKey="job_plan_id"
                                labelKey="job_plan"
                                otherKey={{
                                  plan_description: 'plan_description',
                                }}
                                onBlur={() => {
                                  setFieldTouched(`data.measure_point.upper_limit_job_plan`)
                                }}
                                onChange={(val) => {
                                  setFieldValue(`data.measure_point.upper_limit_job_plan`, val)
                                  if (val) setFieldValue('data.measure_point.upper_limit_pm', null)
                                }}
                                size="md"
                                isDisabled={
                                  isSubmitting || values.data.measure_point.upper_limit_pm?.value
                                }
                                searchKey="qJobPlan"
                                isClearable
                                as={SelectPagination}
                              />
                              {errors &&
                              errors.data?.measure_point?.upper_limit_job_plan &&
                              touched &&
                              touched.data?.measure_point?.upper_limit_job_plan ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.upper_limit_job_plan}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Upper Limit Job Plan Description
                              </CFormLabel>
                              <Field
                                name="data.measure_point.upper_limit_job_plan_description"
                                placeholder="Enter Upper Limit Job Plan Description"
                                value={
                                  values.data.measure_point.upper_limit_job_plan === null
                                    ? ''
                                    : values.data.measure_point.upper_limit_job_plan
                                        ?.plan_description
                                }
                                onChange={() =>
                                  setFieldValue(
                                    'data.measure_point.upper_limit_job_plan_description',
                                    values.data.measure_point.upper_limit_job_plan
                                      ?.plan_description,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched(
                                    'data.measure_point.upper_limit_job_plan_description',
                                  )
                                }
                                size="md"
                                disabled
                                as={CFormTextarea}
                              />
                              {errors &&
                              errors.data?.measure_point?.upper_limit_job_plan_description &&
                              touched &&
                              touched.data?.measure_point?.upper_limit_job_plan_description ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.upper_limit_job_plan_description}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Upper Limit Priority
                              </CFormLabel>
                              <Field
                                name="data.measure_point.upper_limit_priority"
                                placeholder="Enter Upper Limit Priority"
                                value={values.data.measure_point.upper_limit_priority}
                                onChange={(val) =>
                                  setFieldValue(
                                    'data.measure_point.upper_limit_priority',
                                    val.target.valueAsNumber,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched('data.measure_point.upper_limit_priority')
                                }
                                type="number"
                                size="md"
                                disabled={isSubmitting}
                                as={CFormInput}
                              />
                              {errors &&
                              errors.data?.measure_point?.upper_limit_priority &&
                              touched &&
                              touched.data?.measure_point?.upper_limit_priority ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.upper_limit_priority}
                                </div>
                              ) : null}
                            </CCol>
                          </CRow>
                          <div className="flex items-center justify-between mt-2">
                            <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
                              Lower Limits
                            </p>
                            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                          </div>
                          <CRow>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Lower Warning Limit
                              </CFormLabel>
                              <Field
                                name="data.measure_point.lower_warning_limit"
                                placeholder="Enter Upper Warning Limit"
                                value={values.data.measure_point.lower_warning_limit}
                                onChange={(val) =>
                                  setFieldValue(
                                    'data.measure_point.lower_warning_limit',
                                    val.target.valueAsNumber,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched('data.measure_point.lower_warning_limit')
                                }
                                type="number"
                                size="md"
                                disabled={isSubmitting || isDisabled}
                                as={CFormInput}
                              />
                              {errors &&
                              errors.data?.measure_point?.lower_warning_limit &&
                              touched &&
                              touched.data?.measure_point?.lower_warning_limit ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.lower_warning_limit}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Lower Action Limit
                              </CFormLabel>
                              <Field
                                name="data.measure_point.lower_action_limit"
                                placeholder="Enter Upper Action Limit"
                                value={values.data.measure_point.lower_action_limit}
                                onChange={(val) =>
                                  setFieldValue(
                                    'data.measure_point.lower_action_limit',
                                    val.target.valueAsNumber,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched('data.measure_point.lower_action_limit')
                                }
                                type="number"
                                size="md"
                                disabled={isSubmitting || isDisabled}
                                as={CFormInput}
                              />
                              {errors &&
                              errors.data?.measure_point?.lower_action_limit &&
                              touched &&
                              touched.data?.measure_point?.lower_action_limit ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.lower_action_limit}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Lower Limit PM
                              </CFormLabel>
                              <Field
                                key={`lower-pm-${values.data.measure_point.lower_limit_pm?.value}`}
                                name="data.measure_point.lower_limit_pm"
                                placeholder="Choose Upper Limit PM"
                                value={values.data.measure_point.lower_limit_pm}
                                apiController={getPMDropdown}
                                valueKey="preventive_maintenance_id"
                                labelKey="preventive_maintenance_name"
                                otherKey={{
                                  description: 'preventive_maintenance_description',
                                  job_plan_id: 'job_plan_id',
                                  plan_name: 'plan_name',
                                  plan_description: 'plan_description',
                                }}
                                onBlur={() => setFieldTouched('data.measure_point.lower_limit_pm')}
                                onChange={(val) => {
                                  setFieldValue('data.measure_point.lower_limit_pm', val)
                                  if (val) {
                                    setFieldValue('data.measure_point.lower_limit_job_plan', {
                                      label: val.plan_name,
                                      value: val.job_plan_id,
                                      plan_description: val.plan_description,
                                      pm: true,
                                    })
                                  } else {
                                    setFieldValue('data.measure_point.lower_limit_job_plan', null)
                                  }
                                }}
                                size="md"
                                isDisabled={
                                  isSubmitting ||
                                  (values.data.measure_point.lower_limit_job_plan &&
                                    !values.data.measure_point.lower_limit_job_plan?.pm)
                                }
                                searchKey="qPreventiveMaintenanceName"
                                isClearable
                                as={SelectPagination}
                              />
                              {errors &&
                              errors.data?.measure_point?.lower_limit_pm &&
                              touched &&
                              touched.data?.measure_point?.lower_limit_pm ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.lower_limit_pm}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Lower Limit PM Description
                              </CFormLabel>
                              <Field
                                name="data.measure_point.lower_limit_pm_description"
                                placeholder="Enter Upper Limit PM Description"
                                value={
                                  values.data.measure_point.lower_limit_pm === null
                                    ? ''
                                    : values.data.measure_point.lower_limit_pm?.description
                                }
                                onChange={(val) =>
                                  setFieldValue(
                                    'data.measure_point.lower_limit_pm_description',
                                    val.target.value,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched('data.measure_point.lower_limit_pm_description')
                                }
                                size="md"
                                disabled
                                as={CFormTextarea}
                              />
                              {errors &&
                              errors.data?.measure_point?.lower_limit_pm_description &&
                              touched &&
                              touched.data?.measure_point?.lower_limit_pm_description ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.lower_limit_pm_description}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Lower Limit Job Plan
                              </CFormLabel>
                              <Field
                                key={`lower-job-plan-${values.data.measure_point.lower_limit_job_plan?.value}`}
                                name={`data.measure_point.lower_limit_job_plan`}
                                placeholder="Choose Job Plan"
                                value={values.data.measure_point.lower_limit_job_plan}
                                apiController={getJobPlanDropdown}
                                valueKey="job_plan_id"
                                labelKey="job_plan"
                                otherKey={{
                                  plan_description: 'plan_description',
                                }}
                                onBlur={() => {
                                  setFieldTouched(`data.measure_point.lower_limit_job_plan`)
                                }}
                                onChange={(val) => {
                                  setFieldValue(`data.measure_point.lower_limit_job_plan`, val)
                                  if (val) {
                                    setFieldValue(`data.measure_point.lower_limit_pm`, null)
                                  }
                                }}
                                size="md"
                                isDisabled={
                                  isSubmitting || !!values.data.measure_point.lower_limit_pm?.value
                                }
                                searchKey="qJobPlan"
                                menuPlacement="top"
                                isClearable
                                as={SelectPagination}
                              />
                              {errors &&
                              errors.data?.measure_point?.lower_limit_job_plan &&
                              touched &&
                              touched.data?.measure_point?.lower_limit_job_plan ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.lower_limit_job_plan}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Lower Limit Job Plan Description
                              </CFormLabel>
                              <Field
                                name="data.measure_point.lower_limit_job_plan_description"
                                placeholder="Enter Upper Limit Job Plan Description"
                                value={
                                  values.data.measure_point.lower_limit_job_plan === null
                                    ? ''
                                    : values.data.measure_point.lower_limit_job_plan
                                        ?.plan_description
                                }
                                onChange={() =>
                                  setFieldValue(
                                    'data.measure_point.lower_limit_job_plan_description',
                                    values.data.measure_point.lower_limit_job_plan
                                      ?.plan_description,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched(
                                    'data.measure_point.lower_limit_job_plan_description',
                                  )
                                }
                                size="md"
                                disabled
                                as={CFormTextarea}
                              />
                              {errors &&
                              errors.data?.measure_point?.lower_limit_job_plan_description &&
                              touched &&
                              touched.data?.measure_point?.lower_limit_job_plan_description ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.lower_limit_job_plan_description}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol sm={12} md={3} className="mb-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Lower Limit Priority
                              </CFormLabel>
                              <Field
                                name="data.measure_point.lower_limit_priority"
                                placeholder="Enter Upper Limit Priority"
                                value={values.data.measure_point.lower_limit_priority}
                                onChange={(val) =>
                                  setFieldValue(
                                    'data.measure_point.lower_limit_priority',
                                    val.target.valueAsNumber,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched('data.measure_point.lower_limit_priority')
                                }
                                type="number"
                                size="md"
                                disabled={isSubmitting}
                                as={CFormInput}
                              />
                              {errors &&
                              errors.data?.measure_point?.lower_limit_priority &&
                              touched &&
                              touched.data?.measure_point?.lower_limit_priority ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.data.measure_point.lower_limit_priority}
                                </div>
                              ) : null}
                            </CCol>
                          </CRow>
                        </Fragment>
                      )}
                      {values.data.condition_monitoring.meter_id?.meter_type ===
                        'characteristic' && (
                        <Fragment>
                          <div className="flex items-center justify-between mt-2">
                            <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
                              Characteristic Action Values
                            </p>
                            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                          </div>
                          <FieldArray
                            name="data.characteristic_action_values"
                            render={(arrayHelpers) =>
                              values.data.characteristic_action_values?.map((item, index) => {
                                return (
                                  <div className="flex flex-col w-full" key={index}>
                                    <div className="flex">
                                      <p className="px-3 py-2 text-white rounded bg-cmms-blue">
                                        {index + 1}
                                      </p>
                                      {mode === 'Create' && (
                                        <Fragment>
                                          {values.data.characteristic_action_values.length > 1 && (
                                            <CButton
                                              color="danger"
                                              variant="outline"
                                              className="h-10 ml-2 hover:text-white"
                                              onClick={() => {
                                                arrayHelpers.remove(index)
                                              }}
                                            >
                                              <BsTrash />
                                            </CButton>
                                          )}
                                        </Fragment>
                                      )}
                                    </div>
                                    <CContainer fluid>
                                      <CRow>
                                        <CCol sm={12} md={3} className="mb-4">
                                          <CFormLabel className="text-primary fw-semibold">
                                            Value
                                          </CFormLabel>
                                          <Field
                                            name={`data.characteristic_action_values.${index}.ca_value`}
                                            placeholder="Enter Value"
                                            value={item.ca_value}
                                            onChange={(val) => {
                                              setFieldValue(
                                                `data.characteristic_action_values.${index}.ca_value`,
                                                val.target.value,
                                              )
                                            }}
                                            onBlur={() =>
                                              setFieldTouched(
                                                `data.characteristic_action_values.${index}.ca_value`,
                                              )
                                            }
                                            size="md"
                                            disabled={isSubmitting || isDisabled}
                                            as={CFormInput}
                                          />
                                          {errors &&
                                          errors.data?.characteristic_action_values?.[index]?.[
                                            'ca_value'
                                          ] &&
                                          touched &&
                                          touched.data?.characteristic_action_values?.[index]?.[
                                            'ca_value'
                                          ] ? (
                                            <div className="text-sm text-[#b03434] mt-1">
                                              {
                                                errors.data.characteristic_action_values?.[index]
                                                  ?.ca_value
                                              }
                                            </div>
                                          ) : null}
                                        </CCol>
                                        <CCol sm={12} md={3} className="mb-4">
                                          <CFormLabel className="text-primary fw-semibold">
                                            PM
                                          </CFormLabel>
                                          <Field
                                            name={`data.characteristic_action_values.${index}.pm`}
                                            placeholder="Choose PM"
                                            value={item.pm}
                                            apiController={getPMDropdown}
                                            valueKey="preventive_maintenance_id"
                                            labelKey="preventive_maintenance_name"
                                            otherKey={{
                                              description: 'preventive_maintenance_description',
                                              job_plan_id: 'job_plan_id',
                                              plan_name: 'plan_name',
                                            }}
                                            onBlur={() => {
                                              setFieldTouched(
                                                `data.characteristic_action_values.${index}.pm`,
                                              )
                                            }}
                                            onChange={(val) => {
                                              setFieldValue(
                                                `data.characteristic_action_values.${index}.pm`,
                                                val,
                                              )

                                              if (val) {
                                                setFieldValue(
                                                  `data.characteristic_action_values.${index}.job_plan_id`,
                                                  {
                                                    label: val.plan_name,
                                                    value: val.job_plan_id,
                                                    pm: true,
                                                  },
                                                )
                                              } else {
                                                setFieldValue(
                                                  `data.characteristic_action_values.${index}.job_plan_id`,
                                                  null,
                                                )
                                              }
                                            }}
                                            size="md"
                                            isDisabled={
                                              isSubmitting ||
                                              (item.job_plan_id && !item.job_plan_id?.pm)
                                            }
                                            searchKey="qPreventiveMaintenanceName"
                                            menuPlacement="top"
                                            isClearable
                                            as={SelectPagination}
                                          />
                                          {errors &&
                                          errors.data?.characteristic_action_values?.[index]?.pm &&
                                          touched &&
                                          touched.data?.characteristic_action_values?.[index]
                                            ?.pm ? (
                                            <div className="text-sm text-[#b03434] mt-1">
                                              {
                                                errors.data.characteristic_action_values?.[index]
                                                  ?.pm
                                              }
                                            </div>
                                          ) : null}
                                        </CCol>
                                        <CCol sm={12} md={3} className="mb-4">
                                          <CFormLabel className="text-primary fw-semibold">
                                            Job Plan
                                          </CFormLabel>
                                          <Field
                                            name={`data.characteristic_action_values.${index}.job_plan_id`}
                                            placeholder="Choose Job Plan"
                                            value={item.job_plan_id}
                                            apiController={getJobPlanDropdown}
                                            valueKey="job_plan_id"
                                            labelKey="job_plan"
                                            otherKey={{
                                              description: 'plan_description',
                                            }}
                                            onBlur={() => {
                                              setFieldTouched(
                                                `data.characteristic_action_values.${index}.job_plan_id`,
                                              )
                                            }}
                                            onChange={(val) => {
                                              setFieldValue(
                                                `data.characteristic_action_values.${index}.job_plan_id`,
                                                val,
                                              )
                                              setFieldValue(
                                                `data.characteristic_action_values.${index}.pm`,
                                                null,
                                              )
                                            }}
                                            size="md"
                                            isDisabled={isSubmitting || !!item.pm?.value}
                                            searchKey="qJobPlan"
                                            menuPlacement="top"
                                            isClearable
                                            as={SelectPagination}
                                          />
                                          {errors &&
                                          errors.data?.characteristic_action_values?.[index]
                                            ?.job_plan_id &&
                                          touched &&
                                          touched.data?.characteristic_action_values?.[index]
                                            ?.job_plan_id ? (
                                            <div className="text-sm text-[#b03434] mt-1">
                                              {
                                                errors.data.characteristic_action_values?.[index]
                                                  ?.job_plan_id
                                              }
                                            </div>
                                          ) : null}
                                        </CCol>
                                        <CCol sm={12} md={3} className="mb-4">
                                          <CFormLabel className="text-primary fw-semibold">
                                            Priority
                                          </CFormLabel>
                                          <Field
                                            name={`data.characteristic_action_values.${index}.priority`}
                                            placeholder="Enter Priority"
                                            value={item.priority}
                                            onChange={(val) => {
                                              setFieldValue(
                                                `data.characteristic_action_values.${index}.priority`,
                                                val.target.valueAsNumber,
                                              )
                                            }}
                                            onBlur={() =>
                                              setFieldTouched(
                                                `data.characteristic_action_values.${index}.priority`,
                                              )
                                            }
                                            type="number"
                                            size="md"
                                            disabled={isSubmitting}
                                            as={CFormInput}
                                          />
                                          {errors &&
                                          errors.data?.characteristic_action_values?.[index]
                                            ?.priority &&
                                          touched &&
                                          touched.data?.characteristic_action_values?.[index]
                                            ?.priority ? (
                                            <div className="text-sm text-[#b03434] mt-1">
                                              {
                                                errors.data.characteristic_action_values?.[index]
                                                  ?.priority
                                              }
                                            </div>
                                          ) : null}
                                        </CCol>
                                      </CRow>
                                    </CContainer>
                                    {!isDisabled && (
                                      <Fragment>
                                        <hr />
                                        <div className="w-full">
                                          {index + 1 ===
                                            values.data.characteristic_action_values.length && (
                                            <CButton
                                              color="primary"
                                              variant="outline"
                                              className="hover:text-white"
                                              onClick={() => {
                                                arrayHelpers.push({
                                                  ca_value: '',
                                                  pm: '',
                                                  job_plan: '',
                                                  priority: 0,
                                                })
                                              }}
                                            >
                                              <CIcon icon={cilPlus} className="me-2" /> Add Value
                                            </CButton>
                                          )}
                                        </div>
                                      </Fragment>
                                    )}
                                  </div>
                                )
                              })
                            }
                          />
                        </Fragment>
                      )}
                    </CContainer>
                  </div>
                </CCardBody>
              </CCard>
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
                    color="primary"
                    className="hover:text-white"
                    type="submit"
                    disabled={isSubmitting || !(dirty && isValid)}
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
    </div>
  )
}

export default ConditionMonitoringForm
