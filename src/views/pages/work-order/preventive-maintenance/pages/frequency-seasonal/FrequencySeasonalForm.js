import React from 'react'
import { Form, Formik, Field } from 'formik'
import { CiPaperplane } from 'react-icons/ci'
import { CButton, CFormInput, CFormLabel, CFooter, CSpinner, CFormCheck } from '@coreui/react'
import { frequencySchema } from './schema'
import { DetailCard } from 'src/components/elements/cards'
import useFrequencySeasonalForm from './hooks/useFrequencySeasonalForm'
import { Select } from 'src/components/elements/select'

const FrequencySeasonalForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    handleSubmit,
    frequencyUnitOptions,
    daysOfWeek,
    monthOptions,
    startDateOptions,
    endDateOptions,
    updateDates,
    disabledDate,
  } = useFrequencySeasonalForm({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <div className="p-4 mb-5 bg-white rounded">
      <Formik
        enableReinitialize
        validationSchema={frequencySchema}
        initialValues={formValue}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const {
            setFieldValue,
            setFieldTouched,
            isValid,
            dirty,
            isSubmitting,
            values,
            errors,
            touched,
          } = props

          return (
            <Form>
              <DetailCard isLoading={false}>
                <h4 className="font-semibold">
                  {mode === 'Update' ? 'Edit' : 'New'} Frequency & Seasonal
                </h4>
                <div>
                  <p>
                    {mode === 'Update'
                      ? 'Update this column to edit frequency & seasonal'
                      : 'Fill this column to add new frequency & seasonal'}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
                    Time Based Frequency
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="my-2">
                  <div className="row">
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Frequency <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="frequency"
                        placeholder="Enter Frequency"
                        value={values.frequency}
                        onChange={(val) => {
                          setFieldValue('frequency', val.target.value)
                        }}
                        disabled={isSubmitting}
                        type="number"
                        as={CFormInput}
                      />
                      {errors && errors.frequency && touched && touched.frequency ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.frequency}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Frequency Units <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="frequency_unit"
                        placeholder="Choose Frequency Unit"
                        value={values?.frequency_unit}
                        onChange={(val) => {
                          setFieldValue(`frequency_unit`, val)
                        }}
                        onBlur={() => {
                          setFieldTouched('frequency_unit')
                        }}
                        size="md"
                        options={frequencyUnitOptions}
                        required
                        as={Select}
                      />
                      {errors && errors.frequency_unit && touched && touched.frequency_unit ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.frequency_unit}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Est Next Due Date <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="estimated_next_schedule"
                        placeholder="Choose Est Next Due"
                        value={values.estimated_next_schedule}
                        onChange={(val) => {
                          setFieldValue('estimated_next_schedule', val.target.value)
                        }}
                        disabled={true}
                        type="datetime-local"
                        as={CFormInput}
                      />
                      {errors &&
                      errors.estimated_next_schedule &&
                      touched &&
                      touched.estimated_next_schedule ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.estimated_next_schedule}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Auto-Creation of Work Orders?
                      </CFormLabel>
                      <Field
                        className="mt-2"
                        name="auto_create_work_order"
                        id="auto_create_work_order"
                        value={values?.auto_create_work_order}
                        size="md"
                        label={values?.auto_create_work_order ? 'Yes' : 'No'}
                        checked={values?.auto_create_work_order}
                        as={CFormCheck}
                      />
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Start Date <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="start_month"
                        placeholder="Choose Start Month"
                        value={values?.start_month}
                        onChange={(val) => {
                          setFieldValue(`start_month`, val)
                          setFieldValue('start_date', null)
                          updateDates('start', val.value)
                        }}
                        onBlur={() => {
                          setFieldTouched('start_month')
                        }}
                        size="md"
                        options={monthOptions}
                        required
                        as={Select}
                        disabled={disabledDate}
                      />
                      {errors && errors.start_month && touched && touched.start_month ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.start_month}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold opacity-0">
                        Start Day <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="start_date"
                        placeholder="Choose Start Day"
                        value={values?.start_date}
                        onChange={(val) => {
                          setFieldValue('start_date', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('start_date')
                        }}
                        size="md"
                        options={startDateOptions}
                        required
                        as={Select}
                        disabled={!values?.start_month || disabledDate}
                      />
                      {errors && errors.start_date && touched && touched.start_date ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.start_date}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        End Date <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="end_month"
                        placeholder="Choose End Month"
                        value={values?.end_month}
                        onChange={(val) => {
                          setFieldValue(`end_month`, val)
                          setFieldValue('end_date', null)
                          updateDates('end', val.value)
                        }}
                        onBlur={() => {
                          setFieldTouched('end_month')
                        }}
                        size="md"
                        options={monthOptions}
                        required
                        as={Select}
                        disabled={disabledDate}
                      />
                      {errors && errors.end_month && touched && touched.end_month ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.end_month}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold opacity-0">
                        End Day <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="end_date"
                        placeholder="Choose End Day"
                        value={values?.end_date}
                        onChange={(val) => {
                          setFieldValue('end_date', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('end_date')
                        }}
                        size="md"
                        options={endDateOptions}
                        required
                        as={Select}
                        disabled={!values?.end_month || disabledDate}
                      />
                      {errors && errors.end_date && touched && touched.end_date ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.end_date}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
                    Active Days
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="my-2">
                  <div className="row">
                    {daysOfWeek.map((day) => (
                      <div className="mb-4 col-md-3" key={day}>
                        <CFormLabel className="text-primary fw-semibold">{day}?</CFormLabel>
                        <Field
                          className="mt-2"
                          name={`working_day_${day.toLowerCase()}`}
                          id={`working_day_${day.toLowerCase()}`}
                          value={values?.[`working_day_${day.toLowerCase()}`]}
                          size="md"
                          label={values?.[`working_day_${day.toLowerCase()}`] ? 'Yes' : 'No'}
                          checked={values?.[`working_day_${day.toLowerCase()}`]}
                          as={CFormCheck}
                        />
                      </div>
                    ))}
                  </div>
                </div>
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
                  <div>
                    {process.env.REACT_APP_HIDE_FEATURE !== 'true' && (
                      <CButton
                        onClick={() => {
                          setTabIndex(2)
                          setAction('Read')
                          setTimeout(() => {
                            setAction('Create')
                          }, 1000)
                        }}
                        color="primary"
                        variant="outline"
                        className="mr-2 hover:text-white"
                        type="button"
                      >
                        <div className="flex items-center justify-center">
                          <>Next</>
                        </div>
                      </CButton>
                    )}
                    <CButton
                      color="primary"
                      className="hover:text-white"
                      type="submit"
                      disabled={!(isValid && dirty) || isSubmitting}
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
                </div>
              </CFooter>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default FrequencySeasonalForm
