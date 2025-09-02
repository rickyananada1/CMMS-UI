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
import { SelectPagination } from 'src/components/elements/select'
import useFormSelection from '../../hooks/useFormSelection'
import useChildOfWorkOrderForm from './hooks/useChildOfWorkOrderForm'
import { childrenWOSchema } from './schema/childrenWOSchema'

const ChildernOfWorkOrderForm = ({ mode, setAction }) => {
  const {
    setFieldValue,
    setChange,
    textFields,
    optionsStatus,
    handleSubmit,
    setAutofill,
    selectedRow,
  } = useChildOfWorkOrderForm({ mode, setAction })
  const { getLocation, getAsset, getWorkOrder, location, asset, workOrder } = useFormSelection()

  return (
    <Formik
      enableReinitialize
      validationSchema={childrenWOSchema}
      onSubmit={handleSubmit}
      initialValues={textFields}
    >
      {({ errors, touched, isValid, dirty, isSubmitting, values }) => {
        return (
          <Form>
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
                        setAutofill(event, workOrder)
                      }}
                      size="md"
                      value={textFields?.record}
                      as={SelectPagination}
                      query={{ qFilterWorkOrderId: selectedRow?.work_order_id }}
                      apiController={getWorkOrder}
                      valueKey="work_order_id"
                      labelKey="work_order_code"
                      searchKey="qWorkOrderCode"
                    />
                    {errors?.record && touched?.record ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.record}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Record Description</CFormLabel>
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
                    <CFormLabel className="text-primary fw-semibold">Record Class</CFormLabel>
                    <Field
                      name="classification"
                      placeholder="Enter Record Class"
                      onChange={(val) => {
                        setFieldValue('classification', val.target.value)
                      }}
                      size="md"
                      value={textFields?.classification}
                      as={CFormInput}
                      disabled
                    />
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Priority</CFormLabel>
                    <Field
                      name="work_priority"
                      placeholder="Enter Priority"
                      onChange={(event) => setChange(event)}
                      size="md"
                      disabled
                      value={textFields?.work_priority}
                      as={CFormInput}
                    />
                    {errors?.work_priority && touched?.work_priority ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.work_priority}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Location</CFormLabel>
                    <Field
                      name="location_id"
                      placeholder="Choose Location"
                      onChange={(event) => {
                        setFieldValue('location_id', 'location_description', event, location)
                      }}
                      size="md"
                      value={textFields?.location_id}
                      disabled={true}
                      as={SelectPagination}
                      isAllData={true}
                      apiController={getLocation}
                      valueKey="location_id"
                      labelKey="location"
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
                    <CFormLabel className="text-primary fw-semibold">Asset</CFormLabel>
                    <Field
                      name="asset_id"
                      placeholder="Choose Asset"
                      onChange={(event) => {
                        setFieldValue('asset_id', 'asset_description', event, asset)
                      }}
                      size="md"
                      disabled
                      value={textFields?.asset_id}
                      as={SelectPagination}
                      apiController={getAsset}
                      valueKey="asset_id"
                      labelKey="asset_num"
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
                    <CFormLabel className="text-primary fw-semibold">Job Plan</CFormLabel>
                    <Field
                      name="job_plan_id"
                      placeholder="Choose Job Plan"
                      size="md"
                      value={textFields?.job_plan_id}
                      as={SelectPagination}
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
                      value={textFields?.job_plan_id?.description}
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
                    <CFormSelect
                      name="status"
                      placeholder="Choose Status"
                      onChange={(event) => setChange(event)}
                      value={textFields?.status}
                      options={['Choose Status', ...optionsStatus]}
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
                      value={textFields?.gl_account_id?.value}
                      disabled
                      as={CFormInput}
                      type="input"
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
                    <CFormLabel className="text-primary fw-semibold">Target Start </CFormLabel>
                    <Field
                      name="target_start"
                      placeholder="Choose Target Start"
                      onChange={(event) => setChange(event)}
                      size="md"
                      required
                      min={new Date().toISOString().slice(0, 10)}
                      value={textFields?.target_start}
                      as={CFormInput}
                      type="date"
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
                      disabled={!textFields?.target_start}
                      min={new Date(textFields?.target_start ?? null)?.toISOString().slice(0, 10)}
                      value={textFields?.target_finish}
                      as={CFormInput}
                      type="date"
                    />
                  </div> */}
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Scheduled Start <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="scheduled_start"
                      placeholder="Choose Scheduled Start"
                      onChange={(event) => setChange(event)}
                      size="md"
                      min={new Date(textFields?.scheduled_start ?? null).toISOString().slice(0, 10)}
                      value={textFields?.scheduled_start}
                      as={CFormInput}
                      type="date"
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
                      name="scheduled_finish"
                      placeholder="Choose Scheduled Finish"
                      onChange={(event) => setChange(event)}
                      size="md"
                      disabled={!textFields?.scheduled_start}
                      min={new Date(
                        new Date(textFields?.scheduled_start ?? null).getTime() + 86400000,
                      )
                        ?.toISOString()
                        .slice(0, 10)}
                      value={textFields?.scheduled_finish}
                      as={CFormInput}
                      type="date"
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
                      min={new Date().toISOString().slice(0, 10)}
                      value={textFields?.start_no_earlier_than}
                      as={CFormInput}
                      type="date"
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
                      disabled={!textFields?.start_no_earlier_than}
                      min={new Date(textFields?.start_no_earlier_than ?? null)
                        ?.toISOString()
                        .slice(0, 10)}
                      value={textFields?.finish_no_later_than}
                      as={CFormInput}
                      type="date"
                    />
                  </div> */}
                  {/* <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Actual Start</CFormLabel>
                    <Field
                      name="actual_start"
                      placeholder="Choose Scheduled Start"
                      onChange={(event) => setChange(event)}
                      size="md"
                      
                      disabled={true}
                      min={new Date().toISOString().slice(0, 10)}
                      value={textFields?.actual_start}
                      as={CFormInput}
                      type="date"
                    />
                  </div> */}
                  {/* <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Actual Finish</CFormLabel>
                    <Field
                      name="actual_finish"
                      placeholder="Choose Scheduled Finish"
                      onChange={(event) => setChange(event)}
                      size="md"
                      
                      disabled={!textFields?.actual_start}
                      min={new Date(textFields?.actual_start ?? null)?.toISOString().slice(0, 10)}
                      value={textFields?.actual_finish}
                      as={CFormInput}
                      type="date"
                    />
                  </div> */}
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
              </DetailCard>
            </Fragment>
          </Form>
        )
      }}
    </Formik>
  )
}

export default ChildernOfWorkOrderForm
