import {
  CButton,
  CFooter,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CSpinner,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { Fragment } from 'react'
import { CiPaperplane } from 'react-icons/ci'
import { DetailCard } from 'src/components/elements/cards'
import useFormSelection from '../../hooks/useFormSelection'
import useChildOfWorkOrderForm from './hooks/useChildOfWorkOrderForm'
import { childrenWOSchema } from './schema/childrenWOSchema'

const ChildernOfWorkOrderForm = ({ mode, setAction }) => {
  const {
    setFieldValue,
    setChange,
    textFields,
    // handleCreateChildOfWorkOrder,
    // handleUpdateChildOfWorkOrder,
    optionsStatus,
    // isSubmitting,
    handleSubmit,
  } = useChildOfWorkOrderForm({ mode, setAction })
  const { location, asset, workOrder } = useFormSelection()

  return (
    <Formik validationSchema={childrenWOSchema} onSubmit={handleSubmit} initialValues={textFields}>
      {({ errors, touched, isValid, dirty, isSubmitting, values }) => {
        return (
          <Fragment>
            <DetailCard>
              <h6 className="text-heading-small">
                {(mode === 'Create' && 'New Children of Work Order') ||
                  'Edit Children of Work Order'}
              </h6>
              <p className="text-neutral-text-disabled">
                {(mode === 'Create' && 'Fill this column to add New Children of Work Order') ||
                  'Fill this column to edit Children of Work Order'}
              </p>
              <Form>
                <div className="flex items-center mt-2 justify-between">
                  <p className="mt-2 text-body-small text-neutral-text-field text-nowrap font-normal">
                    Child information
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="grid grid-cols-4 my-1">
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Sequence</CFormLabel>
                    <Field
                      name="sequence"
                      placeholder="Enter Sequence"
                      onChange={(event) => setChange(event)}
                      size="md"
                      min={0}
                      value={textFields?.sequence}
                      as={CFormInput}
                      type="number"
                    />
                    {errors?.sequence && touched?.sequence ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.sequence}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Record <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="record"
                      placeholder="Choose Record"
                      onChange={(event) => {
                        setFieldValue('record', 'description', event, workOrder, 'work_order_code')
                        console.log(values?.record)
                      }}
                      size="md"
                      value={values?.record}
                      as={CFormInput}
                      disabled
                    />
                    {errors?.record && touched?.record ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.record}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Record Description <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="description"
                      placeholder="Enter Record Description"
                      onChange={(val) => {
                        setFieldValue('description', val.target.value)
                      }}
                      size="md"
                      value={textFields?.description}
                      as={CFormTextarea}
                      disabled
                    />
                    {errors?.description && touched?.description ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.description}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Priority <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="work_priority"
                      placeholder="Enter Priority"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.work_priority}
                      as={CFormInput}
                      disabled
                    />
                    {errors?.work_priority && touched?.work_priority ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.work_priority}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Location <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="location_id"
                      placeholder="Choose Location"
                      onChange={(event) => {
                        setFieldValue('location_id', 'location_description', event, location)
                      }}
                      size="md"
                      value={values?.location_id}
                      as={CFormInput}
                      disabled
                    />
                    {errors?.location_id && touched?.location_id ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.location_id}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Location Description
                    </CFormLabel>
                    <Field
                      name="location_description"
                      placeholder="Enter Location Description"
                      disabled
                      size="md"
                      value={textFields?.location_description}
                      as={CFormTextarea}
                    />
                    {errors?.location_description && touched?.location_description ? (
                      <div className="text-sm text-[#b03434] mt-1">
                        {errors.location_description}
                      </div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Asset <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="asset_id"
                      placeholder="Choose Asset"
                      onChange={(event) => {
                        setFieldValue('asset_id', 'asset_description', event, asset)
                      }}
                      size="md"
                      value={values?.asset_id}
                      as={CFormInput}
                      disabled
                    />
                    {errors?.asset_id && touched?.asset_id ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.asset_id}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Asset Description</CFormLabel>
                    <Field
                      name="asset_description"
                      placeholder="Enter Asset Description"
                      onChange={(val) => {
                        setFieldValue('asset_description', val.target.value)
                      }}
                      size="md"
                      value={textFields?.asset_description}
                      as={CFormTextarea}
                      disabled
                    />
                    {errors?.asset_description && touched?.asset_description ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.asset_description}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Job Plan <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="job_plan_id"
                      placeholder="Choose Job Plan"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.job_plan_id}
                      // as={SelectPagination}
                      as={CFormInput}
                      type="number"
                      disabled
                    />
                    {errors?.job_plan_id && touched?.job_plan_id ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.job_plan_id}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Job Plan Description
                    </CFormLabel>
                    <Field
                      name="job_plan_description"
                      placeholder="Enter Job Plan Description"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.job_plan_description}
                      as={CFormTextarea}
                      disabled
                    />
                    {errors?.job_plan_description && touched?.job_plan_description ? (
                      <div className="text-sm text-[#b03434] mt-1">
                        {errors.job_plan_description}
                      </div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Status <span className="text-red-main">*</span>
                    </CFormLabel>
                    {/* <Field
                      name="status_id"
                      placeholder="Choose Status"
                      onChange={(event) => setChange(event)}
                      size="md"
                      required
                      value={values?.status_id}
                      as={CFormInput}
                    /> */}
                    <CFormSelect
                      name="status"
                      placeholder="Choose Status"
                      onChange={(event) => setChange(event)}
                      value={textFields?.status}
                      options={optionsStatus}
                      size="md"
                    />
                    {errors?.status && touched?.status ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.status}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      GL Account <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="gl_account_id"
                      placeholder="Choose GL Account"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.gl_account_id}
                      // as={SelectPagination}
                      as={CFormInput}
                      type="text"
                      disabled
                    />
                    {errors?.gl_account_id && touched?.gl_account_id ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.gl_account_id}</div>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center mt-2 justify-between">
                  <p className="mt-2 text-body-small text-neutral-text-field text-nowrap font-normal">
                    Scheduling information
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="grid grid-cols-4 my-1">
                  {/* <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Target Start</CFormLabel>
                    <Field
                      name="target_start"
                      placeholder="Choose Target Start"
                      onChange={(event) => setChange(event)}
                      size="md"
                      required
                      value={textFields?.target_start}
                      as={CFormInput}
                      type="date"
                      disabled
                    />
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Target Finish</CFormLabel>
                    <Field
                      name="target_finish"
                      placeholder="Choose Target Finish"
                      onChange={(event) => setChange(event)}
                      size="md"
                      required
                      value={textFields?.target_finish}
                      as={CFormInput}
                      type="date"
                      disabled
                    />
                  </div> */}
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Scheduled Start <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="schedule_start"
                      placeholder="Choose Scheduled Start"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.scheduled_start}
                      as={CFormInput}
                      type="date"
                      disabled
                    />
                    {errors?.scheduled_start && touched?.scheduled_start ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.scheduled_start}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Scheduled Finish <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="schedule_finish"
                      placeholder="Choose Scheduled Finish"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.scheduled_finish}
                      as={CFormInput}
                      type="date"
                      disabled
                    />
                    {errors?.scheduled_finish && touched?.scheduled_finish ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.scheduled_finish}</div>
                    ) : null}
                  </div>
                  {/* <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Start No Earlier Than
                    </CFormLabel>
                    <Field
                      name="start_no_earlier_than"
                      placeholder="Choose Start No Earlier Than"
                      onChange={(event) => setChange(event)}
                      size="md"
                      required
                      value={textFields?.start_no_earlier_than}
                      as={CFormInput}
                      type="date"
                      disabled
                    />
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Finish No Later Than
                    </CFormLabel>
                    <Field
                      name="finish_no_later_than"
                      placeholder="Choose Finish No Later Than"
                      onChange={(event) => setChange(event)}
                      size="md"
                      required
                      value={textFields?.finish_no_later_than}
                      as={CFormInput}
                      type="date"
                      disabled
                    />
                  </div> */}
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Actual Start</CFormLabel>
                    <Field
                      name="actual_start"
                      placeholder="Choose Scheduled Start"
                      onChange={(event) => setChange(event)}
                      size="md"
                      disabled
                      min={new Date().toISOString().slice(0, 10)}
                      value={textFields?.actual_start}
                      as={CFormInput}
                      type="date"
                    />
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Actual Finish</CFormLabel>
                    <Field
                      name="actual_finish"
                      placeholder="Choose Scheduled Finish"
                      onChange={(event) => setChange(event)}
                      size="md"
                      disabled
                      min={new Date(textFields?.actual_start ?? null)?.toISOString().slice(0, 10)}
                      value={textFields?.actual_finish}
                      as={CFormInput}
                      type="date"
                    />
                  </div>
                </div>
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
                      disabled={isSubmitting}
                      color="primary"
                      type="submit"
                      className="hover:text-white"
                      // onClick={
                      //   mode === 'Create'
                      //     ? handleCreateChildOfWorkOrder
                      //     : handleUpdateChildOfWorkOrder
                      // }
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
            </DetailCard>
          </Fragment>
        )
      }}
    </Formik>
  )
}

export default ChildernOfWorkOrderForm
