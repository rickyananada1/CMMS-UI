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
import useTaskForWorkOrderForm from './hooks/useTaskForWorkOrderForm'
import useFormSelection from '../../hooks/useFormSelection'
import { taskWOSchema } from './schema/taskWOSchema'

const TaskForWorkOrderForm = ({ mode, setAction }) => {
  const {
    optionsStatus,
    setField,
    setChange,
    textFields,
    // handleCreateTaskforWorkOrder,
    // handleUpdateTaskforWorkOrder,
    handleSubmit,
  } = useTaskForWorkOrderForm({ mode, setAction })
  const { location, asset } = useFormSelection()

  return (
    <Formik
      enableReinitialize
      validationSchema={taskWOSchema}
      initialValues={textFields}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, dirty, values, isSubmitting, setFieldValue }) => {
        return (
          <Form>
            <Fragment>
              <DetailCard>
                <h6 className="text-heading-small">
                  {(mode === 'Create' && 'New Task for Work Order') || 'Edit Task for Work Order'}
                </h6>
                <p className="text-neutral-text-disabled">
                  {(mode === 'Create' && 'Fill this column to add New Task for Work Order') ||
                    'Fill this column to edit Task for Work Order'}
                </p>

                <div className="flex items-center mt-2 justify-between">
                  <p className="mt-2 text-body-small text-neutral-text-field text-nowrap font-normal">
                    Task information
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="grid grid-cols-4 my-1">
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Sequence <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="sequence"
                      placeholder="Enter Sequence"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.sequence}
                      as={CFormInput}
                    />
                    {errors?.sequence && touched?.sequence ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.sequence}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Task <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="task"
                      placeholder="Enter Task"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.task}
                      as={CFormInput}
                      disabled
                    />
                    {errors?.task && touched?.task ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.task}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Task Description</CFormLabel>
                    <Field
                      name="description"
                      placeholder="Enter Task Description"
                      onChange={(event) => setChange(event)}
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
                </div>
                <div className="flex items-center mt-2 justify-between">
                  <p className="mt-2 text-body-small text-neutral-text-field text-nowrap font-normal">
                    Work Reference Infromation
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="grid grid-cols-4 my-1">
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Location <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="location_id"
                      placeholder="Choose Location"
                      onChange={(event) => {
                        setField('location_id', 'location_description', event, location)
                        setFieldValue('location_id', event)
                      }}
                      size="md"
                      value={textFields?.location_id}
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
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.location_description}
                      as={CFormTextarea}
                      disabled
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
                        setField('asset_id', 'asset_description', event, asset)
                        setFieldValue('asset_id', event)
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
                      onChange={(event) => setChange(event)}
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
                      Inspector <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="inscpector"
                      placeholder="Choose Inspector"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.inspector}
                      as={CFormInput}
                      disabled
                    />
                    {errors?.inspector && touched?.inspector ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.inspector}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Measurement Point <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="measurement_point"
                      placeholder="Choose Measurement Point"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.measurement_point}
                      as={CFormInput}
                      disabled
                    />
                    {errors?.measurement_point && touched?.measurement_point ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.measurement_point}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Measurement Value <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="measurement_value"
                      placeholder="Choose Measurement Point"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.measurement_value}
                      as={CFormInput}
                      disabled
                    />
                    {errors?.measurement_value && touched?.measurement_value ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.measurement_value}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Measurement Date <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="measurement_date"
                      placeholder="Choose Measurement Point"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.measurement_date}
                      as={CFormInput}
                      disabled
                    />
                    {errors?.measurement_date && touched?.measurement_date ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.measurement_date}</div>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center mt-2 justify-between">
                  <p className="mt-2 text-body-small text-neutral-text-field text-nowrap font-normal">
                    Scheduling Information
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="grid grid-cols-4 my-1">
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Scheduled Start</CFormLabel>
                    <Field
                      name="schedule_start"
                      placeholder="Choose Scheduled Start"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.schedule_start}
                      as={CFormInput}
                      disabled
                    />
                    {errors?.schedule_start && touched?.schedule_start ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.schedule_start}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Scheduled Finish</CFormLabel>
                    <Field
                      name="schedule_finish"
                      placeholder="Choose Scheduled Finish"
                      onChange={(event) => setChange(event)}
                      size="md"
                      value={textFields?.schedule_finish}
                      as={CFormInput}
                      disabled
                    />
                    {errors?.schedule_finish && touched?.schedule_finish ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.schedule_finish}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Actual Start</CFormLabel>
                    <Field
                      name="actual_start"
                      placeholder="Choose Target Start"
                      onChange={(event) => setChange(event)}
                      size="md"
                      min={new Date().toISOString().slice(0, 10)}
                      value={textFields?.actual_start}
                      as={CFormInput}
                      type="date"
                    />
                    {errors?.actual_start && touched?.actual_start ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.actual_start}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-3">
                    <CFormLabel className="text-primary fw-semibold">Actual Finish</CFormLabel>
                    <Field
                      name="actual_finish"
                      placeholder="Choose Target Finish"
                      onChange={(event) => setChange(event)}
                      size="md"
                      min={new Date(textFields?.actual_start ?? null)?.toISOString().slice(0, 10)}
                      value={textFields?.actual_finish}
                      as={CFormInput}
                      type="date"
                    />
                    {errors?.actual_finish && touched?.actual_finish ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.actual_finish}</div>
                    ) : null}
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
                      //     ? handleCreateTaskforWorkOrder
                      //     : handleUpdateTaskforWorkOrder
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

export default TaskForWorkOrderForm
