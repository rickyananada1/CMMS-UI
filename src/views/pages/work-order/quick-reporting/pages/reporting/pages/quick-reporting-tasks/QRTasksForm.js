import { CButton, CFooter, CFormInput, CFormLabel, CFormSelect, CSpinner } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { Fragment } from 'react'
import { CiPaperplane } from 'react-icons/ci'
import { DetailCard } from 'src/components/elements/cards'
import { SelectPagination } from 'src/components/elements/select'
import useQRTaskForm from './hooks/useQRTaskForm'
import { QRTaskSchema } from './schema/QRTaskSchema'
import useFormSelection from 'src/views/pages/work-order/work-order-tracking/pages/plans/hooks/useFormSelection'

const QRTasksForm = ({ mode, setAction }) => {
  const { optionsStatus, setField, setChange, textFields, handleSubmit } = useQRTaskForm({
    mode,
    setAction,
  })
  const { getLocation, getAsset, location, asset } = useFormSelection()

  return (
    <Formik
      enableReinitialize
      initialValues={textFields}
      validationSchema={QRTaskSchema}
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

                <div className="flex items-center justify-between mt-2">
                  <p className="mt-2 font-normal text-body-small text-neutral-text-field text-nowrap">
                    Task information
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="my-2">
                  <div className="row">
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">Sequence</CFormLabel>
                      <Field
                        name="sequence"
                        placeholder="Enter Sequence"
                        onChange={(event) => setChange(event)}
                        size="md"
                        min={0}
                        type="number"
                        // required
                        value={textFields?.sequence}
                        as={CFormInput}
                      />
                      {errors?.sequence && touched?.sequence ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.sequence}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Task <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="task"
                        placeholder="Enter Task"
                        onChange={(event) => setChange(event)}
                        size="md"
                        // required
                        value={textFields?.task}
                        as={CFormInput}
                      />
                      {errors?.task && touched?.task ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.task}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">Task Description</CFormLabel>
                      <Field
                        name="description"
                        placeholder="Enter Task Description"
                        onChange={(event) => setChange(event)}
                        size="md"
                        // required
                        value={textFields?.description}
                        as={CFormInput}
                      />
                      {errors?.description && touched?.description ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.description}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
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
                        // required
                      />
                      {errors?.status && touched?.status ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.status}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="mt-2 font-normal text-body-small text-neutral-text-field text-nowrap">
                    Work Reference Infromation
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>

                <div className="my-2">
                  <div className="row">
                    <div className="mb-4 col-md-3">
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
                        // required
                        value={values?.location_id}
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
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Location Description
                      </CFormLabel>
                      <Field
                        name="location_description"
                        placeholder="Enter Location Description"
                        onChange={(event) => setChange(event)}
                        size="md"
                        // required
                        value={textFields?.location_description}
                        as={CFormInput}
                        disabled
                      />
                      {errors?.location_description && touched?.location_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
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
                        // required
                        value={values?.asset_id}
                        as={SelectPagination}
                        apiController={getAsset}
                        valueKey="asset_id"
                        labelKey="asset_num"
                      />
                      {errors?.asset_id && touched?.asset_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.asset_id}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Asset Description
                      </CFormLabel>
                      <Field
                        name="asset_description"
                        placeholder="Enter Asset Description"
                        onChange={(event) => setChange(event)}
                        size="md"
                        // required
                        value={textFields?.asset_description}
                        as={CFormInput}
                        disabled
                      />
                      {errors?.asset_description && touched?.asset_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.asset_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">Inspector</CFormLabel>
                      <Field
                        name="inspector"
                        placeholder="Choose Inspector"
                        onChange={(event) => setChange(event)}
                        size="md"
                        // required
                        value={textFields?.inspector}
                        as={CFormInput}
                      />
                      {errors?.inspector && touched?.inspector ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.inspector}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Measurement Point
                      </CFormLabel>
                      <Field
                        name="measurement_point"
                        placeholder="Choose Measurement Point"
                        onChange={(event) => setChange(event)}
                        size="md"
                        // required
                        value={textFields?.measurement_point}
                        as={CFormInput}
                      />
                      {errors?.measurement_point && touched?.measurement_point ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.measurement_point}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Measurement Value
                      </CFormLabel>
                      <Field
                        name="measurement_value"
                        placeholder="Choose Measurement Point"
                        onChange={(event) => setChange(event)}
                        size="md"
                        // required
                        value={textFields?.measurement_value}
                        as={CFormInput}
                      />
                      {errors?.measurement_value && touched?.measurement_value ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.measurement_value}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">Measurement Date</CFormLabel>
                      <Field
                        name="measurement_date"
                        placeholder="Choose Measurement Point"
                        onChange={(event) => setChange(event)}
                        size="md"
                        // required
                        value={textFields?.measurement_date}
                        as={CFormInput}
                        type="date"
                      />
                      {errors?.measurement_date && touched?.measurement_date ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.measurement_date}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="mt-2 font-normal text-body-small text-neutral-text-field text-nowrap">
                    Scheduling Information
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>

                <div className="my-2">
                  <div className="row">
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Scheduled Start <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="scheduled_start"
                        placeholder="Choose Scheduled Start"
                        onChange={(event) => setChange(event)}
                        size="md"
                        // required
                        min={new Date(textFields?.scheduled_start ?? null)
                          .toISOString()
                          .slice(0, 10)}
                        value={textFields?.scheduled_start}
                        as={CFormInput}
                        type="date"
                      />
                      {errors?.scheduled_start && touched?.scheduled_start ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.scheduled_start}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Scheduled Finish <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="scheduled_finish"
                        placeholder="Choose Scheduled Finish"
                        onChange={(event) => setChange(event)}
                        size="md"
                        // required
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
                    {/* <div className="mt-3 mr-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Actual Start <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="actual_start"
                      placeholder="Choose Actual Start"
                      onChange={(event) => setChange(event)}
                      size="md"
                      min={new Date().toISOString().slice(0, 10)}
                      required
                      disabled={true}
                      value={textFields?.actual_start}
                      as={CFormInput}
                      type="date"
                    />
                  </div> */}
                    {/* <div className="mt-3 mr-3">
                    <CFormLabel className="text-primary fw-semibold">
                      Actual Finish <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="actual_finish"
                      placeholder="Choose Actual Finish"
                      onChange={(event) => setChange(event)}
                      size="md"
                      required
                      disabled={true}
                      min={new Date(textFields?.actual_start ?? null)?.toISOString().slice(0, 10)}
                      value={textFields?.actual_finish}
                      as={CFormInput}
                      type="date"
                    />
                  </div> */}
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

export default QRTasksForm
