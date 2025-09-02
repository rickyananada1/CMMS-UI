import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { BsTrash } from 'react-icons/bs'
import { Form, Formik, FieldArray, Field } from 'formik'
import {
  CButton,
  CCard,
  CCardBody,
  CFormInput,
  CFormTextarea,
  CFormLabel,
  CFooter,
} from '@coreui/react'
import { Select, SelectPagination } from 'src/components/elements/select'
import useJobPlanTaskForm from '../hooks/useJobPlanTaskForm'
import { jobPlanTaskSchema } from '../schema'

const JobPlanTaskForm = ({ mode, setAction, setTabIndex }) => {
  const { formValue, getLocationDropdown, getAssetDropdown, handleSubmit, status, disabled } =
    useJobPlanTaskForm({
      mode,
      setAction,
      setTabIndex,
    })

  return (
    <div className="bg-white p-4 rounded mb-5">
      <Formik
        enableReinitialize
        validationSchema={jobPlanTaskSchema}
        initialValues={formValue}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const {
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
            isSubmitting,
            isValid,
            dirty,
          } = props
          return (
            <Form>
              <CCard className="card-b-left">
                <CCardBody className="p-5">
                  <h4 className="font-semibold">
                    {mode === 'UpdateJobPlanTask' ? 'Edit' : 'New'} Job Plan Task
                  </h4>
                  <div>
                    <p>
                      {mode === 'UpdateJobPlanTask'
                        ? 'Update this column to edit job plan task'
                        : 'Fill this column to add new job plan task'}
                    </p>
                  </div>
                  <hr />

                  <FieldArray
                    name="job_plan_task"
                    render={(arrayHelpers) =>
                      values.job_plan_task?.map((item, index) => {
                        return (
                          <div className="my-2" key={index}>
                            {mode === 'CreateJobPlanTask' && (
                              <div className="flex">
                                <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                  <span className="text-white mb-1">{index + 1}</span>
                                </div>
                                {values.job_plan_task.length > 1 && (
                                  <CButton
                                    color="danger"
                                    variant="outline"
                                    className="hover:text-white"
                                    disabled={disabled || isSubmitting}
                                    onClick={() => {
                                      arrayHelpers.remove(index)
                                    }}
                                  >
                                    <BsTrash />
                                  </CButton>
                                )}
                              </div>
                            )}

                            <div className="my-4">
                              <div className="row">
                                <div className="flex items-center mt-2 justify-between">
                                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                                    Child Information
                                  </p>
                                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Sequence <span className="text-red-main">*</span>
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.sequence`}
                                    placeholder="Enter Sequence"
                                    value={item?.sequence}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.sequence`,
                                        val.target.value,
                                      )
                                    }}
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.sequence &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.sequence ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.sequence}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Task <span className="text-red-main">*</span>
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.task`}
                                    placeholder="Enter Task"
                                    value={item?.task}
                                    onChange={(val) => {
                                      setFieldValue(`job_plan_task.${index}.task`, val.target.value)
                                    }}
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.task &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.task ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.task}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Task Description <span className="text-red-main">*</span>
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.description`}
                                    placeholder="Enter Description"
                                    value={item?.description}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.description`,
                                        val.target.value,
                                      )
                                    }}
                                    disabled={disabled || isSubmitting}
                                    as={CFormTextarea}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.description &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.description ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.description}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Status <span className="text-red-main">*</span>
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.status`}
                                    options={status}
                                    placeholder="Choose Status"
                                    value={item?.status}
                                    onChange={(val) => {
                                      setFieldValue(`job_plan_task.${index}.status`, val)
                                    }}
                                    onBlur={() => {
                                      setFieldTouched(`job_plan_task.${index}.status`)
                                    }}
                                    isDisabled={disabled || isSubmitting}
                                    as={Select}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.status &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.status ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.status}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="flex items-center mt-2 justify-between">
                                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                                    Work Reference Information
                                  </p>
                                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Location
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.location_id`}
                                    placeholder="Enter Location"
                                    value={item.location_id}
                                    apiController={getLocationDropdown}
                                    valueKey="location_id"
                                    labelKey="location"
                                    otherKey={{
                                      description: 'location_description',
                                    }}
                                    onBlur={() => {
                                      setFieldTouched(`job_plan_task.${index}.location_id`)
                                    }}
                                    onChange={(val) => {
                                      setFieldValue(`job_plan_task.${index}.location_id`, val)
                                    }}
                                    searchKey="qLocation"
                                    isDisabled={disabled || isSubmitting}
                                    as={SelectPagination}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.location_id &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.location_id ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.location_id}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Location Description
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.location_description`}
                                    placeholder="Enter Location Description"
                                    value={item?.location_id?.description}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.location_description`,
                                        val.target.value,
                                      )
                                    }}
                                    disabled
                                    as={CFormTextarea}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.location_description &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.location_description ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.location_description}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Assets
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.asset_id`}
                                    placeholder="Choose Asset"
                                    value={item.asset_id}
                                    apiController={getAssetDropdown}
                                    valueKey="asset_id"
                                    labelKey="asset_num"
                                    otherKey={{
                                      description: 'asset_description',
                                    }}
                                    onBlur={() => {
                                      setFieldTouched(`job_plan_task.${index}.asset_id`)
                                    }}
                                    onChange={(val) => {
                                      setFieldValue(`job_plan_task.${index}.asset_id`, val)
                                    }}
                                    size="md"
                                    isDisabled={disabled || isSubmitting}
                                    as={SelectPagination}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.asset_id &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.asset_id ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.asset_id}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Asset Description
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.asset_description`}
                                    placeholder="Enter Asset Description"
                                    value={item?.asset_id?.description}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.asset_description`,
                                        val.target.value,
                                      )
                                    }}
                                    disabled
                                    as={CFormTextarea}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.asset_description &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.asset_description ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.asset_description}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Inspector
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.inspector`}
                                    placeholder="Enter Inspector"
                                    value={item?.inspector}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.inspector`,
                                        val.target.value,
                                      )
                                    }}
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.inspector &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.inspector ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.inspector}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Measurement Point
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.measurement_point`}
                                    placeholder="Enter Measurement Point"
                                    value={item?.measurement_point}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.measurement_point`,
                                        val.target.value,
                                      )
                                    }}
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.measurement_point &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.measurement_point ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.measurement_point}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Measurement Value
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.measurement_value`}
                                    placeholder="Enter Measurement Value"
                                    value={item?.measurement_value}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.measurement_value`,
                                        val.target.value,
                                      )
                                    }}
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.measurement_value &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.measurement_value ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.measurement_value}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Measurement Date
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.measurement_date`}
                                    placeholder="Enter Measurement Date"
                                    value={item?.measurement_date}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.measurement_date`,
                                        val.target.value,
                                      )
                                    }}
                                    type="datetime-local"
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.measurement_date &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.measurement_date ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.measurement_date}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="flex items-center mt-2 justify-between">
                                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                                    Scheduling Information
                                  </p>
                                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Target Start
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.target_start`}
                                    placeholder="Enter Target Start"
                                    value={item?.target_start}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.target_start`,
                                        val.target.value,
                                      )
                                    }}
                                    type="datetime-local"
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.target_start &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.target_start ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.target_start}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Target Finish
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.target_finish`}
                                    placeholder="Enter Target Finish"
                                    value={item?.target_finish}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.target_finish`,
                                        val.target.value,
                                      )
                                    }}
                                    type="datetime-local"
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.target_finish &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.target_finish ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.target_finish}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Scheduled Start
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.scheduled_start`}
                                    placeholder="Enter Scheduled Start"
                                    value={item?.scheduled_start}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.scheduled_start`,
                                        val.target.value,
                                      )
                                    }}
                                    type="datetime-local"
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.scheduled_start &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.scheduled_start ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.scheduled_start}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Scheduled Finish
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.scheduled_finish`}
                                    placeholder="Enter Scheduled Finish"
                                    value={item?.scheduled_finish}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.scheduled_finish`,
                                        val.target.value,
                                      )
                                    }}
                                    type="datetime-local"
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.scheduled_finish &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.scheduled_finish ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.scheduled_finish}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Start No Earlier Than
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.start_no_earlier_than`}
                                    placeholder="Enter Start No Earlier Than"
                                    value={item?.start_no_earlier_than}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.start_no_earlier_than`,
                                        val.target.value,
                                      )
                                    }}
                                    type="datetime-local"
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.start_no_earlier_than &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.start_no_earlier_than ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.start_no_earlier_than}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Finish No Later Than
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.finish_no_later_than`}
                                    placeholder="Enter Finish No Later Than"
                                    value={item?.finish_no_later_than}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.finish_no_later_than`,
                                        val.target.value,
                                      )
                                    }}
                                    type="datetime-local"
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.finish_no_later_than &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.finish_no_later_than ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.finish_no_later_than}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-6 mb-4"></div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Actual Start
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.actual_start`}
                                    placeholder="Enter Actual Start"
                                    value={item?.actual_start}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.actual_start`,
                                        val.target.value,
                                      )
                                    }}
                                    type="datetime-local"
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.actual_start &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.actual_start ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.actual_start}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Actual Finish
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.actual_finish`}
                                    placeholder="Enter Actual Finish"
                                    value={item?.actual_finish}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.actual_finish`,
                                        val.target.value,
                                      )
                                    }}
                                    type="datetime-local"
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.actual_finish &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.actual_finish ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.actual_finish}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Estimated Duration{' '}
                                    <span className="text-red-main">(In Minute)</span>
                                  </CFormLabel>
                                  <Field
                                    name={`job_plan_task.${index}.duration_in_minute`}
                                    placeholder="Enter Estimated Duration"
                                    value={item?.duration_in_minute}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `job_plan_task.${index}.duration_in_minute`,
                                        val.target.value,
                                      )
                                    }}
                                    type="number"
                                    min={0}
                                    disabled={disabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.job_plan_task &&
                                  errors.job_plan_task[index]?.duration_in_minute &&
                                  touched &&
                                  touched.job_plan_task &&
                                  touched.job_plan_task[index]?.duration_in_minute ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.job_plan_task[index]?.duration_in_minute}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <hr />
                              {mode === 'CreateJobPlanTask' && (
                                <div className="w-full">
                                  {index + 1 === values?.job_plan_task.length && (
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      className="hover:text-white"
                                      disabled={disabled || isSubmitting}
                                      onClick={() => {
                                        arrayHelpers.push({
                                          sequence: null,
                                          task: '',
                                          description: '',
                                          status: null,
                                          location_id: null,
                                          location_description: '',
                                          asset_id: null,
                                          asset_description: '',
                                          inspector: '',
                                          measurement_point: '',
                                          measurement_value: '',
                                          measurement_date: null,
                                          target_start: null,
                                          target_finish: null,
                                          scheduled_start: null,
                                          scheduled_finish: null,
                                          start_no_earlier_than: null,
                                          finish_no_later_than: null,
                                          actual_start: null,
                                          actual_finish: null,
                                          duration_in_minute: null,
                                        })
                                      }}
                                    >
                                      <CIcon icon={cilPlus} className="me-2" /> Add New Job Plan
                                      Task
                                    </CButton>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })
                    }
                  />
                </CCardBody>
              </CCard>
              <CFooter className="form-footer">
                <div className="w-full ml-[80px] bg-white flex items-center justify-between">
                  <CButton
                    color="danger"
                    variant="outline"
                    onClick={() => {
                      setAction('Read')
                    }}
                  >
                    Cancel
                  </CButton>
                  <CButton type="submit" disabled={!(isValid && dirty) || disabled || isSubmitting}>
                    Submit
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

export default JobPlanTaskForm
