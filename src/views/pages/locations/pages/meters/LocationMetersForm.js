import {
  CButton,
  CFooter,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CSpinner,
} from '@coreui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import React from 'react'
import useLocationMeter from './hooks/useLocationMeter'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
// import CIcon from '@coreui/icons-react'
// import { cilPlus } from '@coreui/icons'
// import { BsTrash } from 'react-icons/bs'
import { Select, SelectPagination } from 'src/components/elements/select'
import { locationMetersSchema } from './schema'

// eslint-disable-next-line react/prop-types
const LocationMetersForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    isLoading,
    getMeters,
    avg_calc_types,
    accept_rolldown_options,
    handleSubmit,
    getReadingTypesService,
    populateFields,
  } = useLocationMeter({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <Formik
      enableReinitialize
      initialValues={formValue}
      onSubmit={handleSubmit}
      validationSchema={locationMetersSchema}
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
          <Form className="mb-3">
            <DetailCard isLoading={isLoading}>
              <div>
                <h4 className="w-font-semibold">{mode === 'Create' ? 'Add' : 'Edit'} Meter</h4>
                <p>{mode === 'Create' ? 'Add' : 'Update'} Meter Details</p>
              </div>
              <hr />
              <div className="container-fluid">
                <FieldArray
                  name="meter_in_groups"
                  render={(arrayHelpers) => (
                    <div>
                      {values?.meter_in_groups?.map((item, index) => {
                        return (
                          <div className="my-2" key={index}>
                            {/* <div className="flex">
                              <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                <span className="text-white mb-1">{index + 1}</span>
                              </div>
                              {!item?.meter_in_group_id && (
                                <CButton
                                  color="danger"
                                  variant="outline"
                                  className="hover:text-white"
                                  onClick={() => {
                                    arrayHelpers.remove(index)
                                  }}
                                >
                                  <BsTrash />
                                </CButton>
                              )}
                            </div> */}
                            <Field
                              className={'hidden'}
                              name={`meter_in_groups.${index}.meter_in_group_id`}
                              value={item?.meter_in_group_id}
                            />
                            <Field
                              className={'hidden'}
                              name={`meter_in_groups.${index}.meter_group_id`}
                              value={item?.meter_group_id}
                            />
                            <div className="my-4">
                              <div className="flex items-center mt-2 justify-between">
                                <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                                  Meters Details
                                </p>
                                <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Sequence
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.sequence`}
                                    placeholder="Enter Sequence"
                                    value={item?.sequence}
                                    invalid={
                                      touched?.meter_in_groups?.[index]?.sequence &&
                                      errors?.meter_in_groups?.[index]?.sequence
                                    }
                                    onChange={(e) => {
                                      setFieldValue(
                                        `meter_in_groups.${index}.sequence`,
                                        e.target.value,
                                      )
                                    }}
                                    size="md"
                                    required={errors?.meter_in_groups?.[index]?.sequence}
                                    as={CFormInput}
                                  />
                                  {errors?.meter_in_groups?.[index]?.sequence &&
                                  touched?.meter_in_groups?.[index]?.sequence ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.meter_in_groups?.[index]?.sequence}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Meter <span className="text-red-main">*</span>
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.meter_id`}
                                    placeholder="Select Meter"
                                    apiController={getMeters}
                                    isAllData={true}
                                    value={item?.meter_id}
                                    valueKey="meter_id"
                                    labelKey="meter_name"
                                    onChange={async (val) => {
                                      setFieldValue(`meter_in_groups.${index}.meter_id`, val)
                                      populateFields(setFieldValue, index, val)
                                    }}
                                    onBlur={() =>
                                      setFieldTouched(`meter_in_groups.${index}.meter_id`, true)
                                    }
                                    size="md"
                                    required={errors?.meter_in_groups?.[index]?.meter_id}
                                    searchKey="name"
                                    as={SelectPagination}
                                  />
                                  {errors?.meter_in_groups?.[index]?.meter_id &&
                                  touched?.meter_in_groups?.[index]?.meter_id ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.meter_in_groups?.[index]?.meter_id}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Description
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.meter_description`}
                                    placeholder="Enter Description"
                                    value={item?.meter_id?.meter_description}
                                    invalid={
                                      touched?.meter_in_groups?.[index]?.meter_description &&
                                      errors?.meter_in_groups?.[index]?.meter_description
                                    }
                                    onChange={(e) => {
                                      setFieldValue(
                                        `meter_in_groups.${index}.meter_description`,
                                        e.target.value,
                                      )
                                    }}
                                    size="md"
                                    disabled
                                    as={CFormTextarea}
                                  />
                                  {errors?.meter_in_groups?.[index]?.meter_description &&
                                  touched?.meter_in_groups?.[index]?.meter_description ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.meter_in_groups?.[index]?.meter_description}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Meter Type
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.meter_type`}
                                    className="capitalize"
                                    placeholder="No Meter Type"
                                    value={item?.meter_id?.meter_type}
                                    size="md"
                                    disabled
                                    as={CFormInput}
                                  />
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Unit of Meassure
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.unit_of_measure`}
                                    placeholder="No Unit of Meassure"
                                    value={item?.meter_id?.uom_description}
                                    onChange={(val) => {
                                      setFieldValue(`meter_in_groups.${index}.unit_of_measure`, val)
                                    }}
                                    size="md"
                                    disabled
                                    as={CFormInput}
                                  />
                                </div>
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Asset Up?
                                  </CFormLabel>
                                  <Field
                                    className="mt-2"
                                    name="asset_up"
                                    id="asset_up"
                                    value={item?.asset_up}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `meter_in_groups.${index}.asset_up`,
                                        e.target.checked,
                                      )
                                    }}
                                    size="md"
                                    label={item?.asset_up ? 'Yes' : 'No'}
                                    checked={item?.asset_up}
                                    as={CFormCheck}
                                  />
                                </div>
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Point
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.point`}
                                    placeholder="Enter Point"
                                    value={item?.point}
                                    invalid={
                                      touched?.meter_in_groups?.[index]?.point &&
                                      errors?.meter_in_groups?.[index]?.point
                                    }
                                    onChange={(e) => {
                                      setFieldValue(
                                        `meter_in_groups.${index}.point`,
                                        e.target.value,
                                      )
                                    }}
                                    size="md"
                                    as={CFormInput}
                                  />
                                  {errors?.meter_in_groups?.[index]?.point &&
                                  touched?.meter_in_groups?.[index]?.point ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.meter_in_groups?.[index]?.point}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Active?
                                  </CFormLabel>
                                  <Field
                                    className="mt-2"
                                    name="is_active"
                                    id="is_active"
                                    value={item?.is_active}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `meter_in_groups.${index}.is_active`,
                                        e.target.checked,
                                      )
                                    }}
                                    size="md"
                                    label={item?.is_active ? 'Yes' : 'No'}
                                    checked={item?.is_active}
                                    as={CFormCheck}
                                  />
                                </div>
                              </div>

                              <div className="flex items-center mt-2 justify-between">
                                <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                                  Continuous Meter Details
                                </p>
                                <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                              </div>
                              <div className="row">
                                <div className="col-sm-3">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Average Calculation Method{' '}
                                    {item?.meter_id?.meter_type === 'continuous' && (
                                      <span className="text-red-main">*</span>
                                    )}
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.average_calculation_method`}
                                    placeholder="Enter Average Calculation Method"
                                    value={item?.average_calculation_method}
                                    onChange={async (val) => {
                                      setFieldValue(
                                        `meter_in_groups.${index}.average_calculation_method`,
                                        val,
                                      )
                                      await setFieldValue(
                                        `meter_in_groups.${index}.sliding_window_size`,
                                        '',
                                      )
                                      setFieldValue(
                                        `meter_in_groups.${index}.sliding_window_size`,
                                        null,
                                      )
                                      await setFieldValue(
                                        `meter_in_groups.${index}.static_average`,
                                        '',
                                      )
                                      setFieldValue(`meter_in_groups.${index}.static_average`, null)
                                    }}
                                    onBlur={() =>
                                      setFieldTouched(
                                        `meter_in_groups.${index}.average_calculation_method`,
                                        true,
                                      )
                                    }
                                    size="md"
                                    options={avg_calc_types}
                                    required={
                                      errors?.meter_in_groups?.[index]?.average_calculation_method
                                    }
                                    isDisabled={item?.meter_id?.meter_type !== 'continuous'}
                                    as={Select}
                                  />
                                  {errors?.meter_in_groups?.[index]?.average_calculation_method &&
                                  touched?.meter_in_groups?.[index]?.average_calculation_method ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.meter_in_groups?.[index]?.average_calculation_method}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-sm-3">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Sliding Window Size
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.sliding_window_size`}
                                    placeholder="Enter Sliding Window Size"
                                    value={item?.sliding_window_size}
                                    invalid={
                                      touched?.meter_in_groups?.[index]?.sliding_window_size &&
                                      errors?.meter_in_groups?.[index]?.sliding_window_size
                                    }
                                    onChange={(e) => {
                                      setFieldValue(
                                        `meter_in_groups.${index}.sliding_window_size`,
                                        e.target.value,
                                      )
                                    }}
                                    size="md"
                                    required={errors?.meter_in_groups?.[index]?.sliding_window_size}
                                    disabled={
                                      item?.average_calculation_method?.value !== 'SLIDING-READINGS'
                                    }
                                    as={CFormInput}
                                  />
                                  {errors?.meter_in_groups?.[index]?.sliding_window_size &&
                                  touched?.meter_in_groups?.[index]?.sliding_window_size ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.meter_in_groups?.[index]?.sliding_window_size}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-sm-3">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Average units/Day
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.static_average`}
                                    placeholder="Enter Static Average"
                                    value={item?.static_average}
                                    invalid={
                                      touched?.meter_in_groups?.[index]?.static_average &&
                                      errors?.meter_in_groups?.[index]?.static_average
                                    }
                                    onChange={(e) => {
                                      setFieldValue(
                                        `meter_in_groups.${index}.static_average`,
                                        e.target.value,
                                      )
                                    }}
                                    size="md"
                                    required={errors?.meter_in_groups?.[index]?.static_average}
                                    disabled={item?.average_calculation_method?.value !== 'STATIC'}
                                    as={CFormInput}
                                  />
                                  {errors?.meter_in_groups?.[index]?.static_average &&
                                  touched?.meter_in_groups?.[index]?.static_average ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.meter_in_groups?.[index]?.static_average}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-sm-3" />
                              </div>
                              <div className="row mt-2">
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Meter Rollover
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.meter_rollover`}
                                    placeholder="Enter Meter Rollover"
                                    value={item?.meter_rollover}
                                    invalid={
                                      touched?.meter_in_groups?.[index]?.meter_rollover &&
                                      errors?.meter_in_groups?.[index]?.meter_rollover
                                    }
                                    onChange={(e) => {
                                      setFieldValue(
                                        `meter_in_groups.${index}.meter_rollover`,
                                        e.target.value,
                                      )
                                    }}
                                    size="md"
                                    required={errors?.meter_in_groups?.[index]?.meter_rollover}
                                    disabled={item?.meter_id?.meter_type !== 'continuous'}
                                    as={CFormInput}
                                  />
                                  {errors?.meter_in_groups?.[index]?.meter_rollover &&
                                  touched?.meter_in_groups?.[index]?.meter_rollover ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.meter_in_groups?.[index]?.meter_rollover}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Life to Date for Location
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.life_to_date_for_location`}
                                    placeholder="Enter Life to Date for Location"
                                    value={item?.life_to_date_for_location}
                                    invalid={
                                      touched?.meter_in_groups?.[index]
                                        ?.life_to_date_for_location &&
                                      errors?.meter_in_groups?.[index]?.life_to_date_for_location
                                    }
                                    onChange={(e) => {
                                      setFieldValue(
                                        `meter_in_groups.${index}.life_to_date_for_location`,
                                        e.target.value,
                                      )
                                    }}
                                    size="md"
                                    required={
                                      errors?.meter_in_groups?.[index]?.life_to_date_for_location
                                    }
                                    disabled={item?.meter_id?.meter_type !== 'continuous'}
                                    as={CFormInput}
                                  />
                                  {errors?.meter_in_groups?.[index]?.life_to_date_for_location &&
                                  touched?.meter_in_groups?.[index]?.life_to_date_for_location ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.meter_in_groups?.[index]?.life_to_date_for_location}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col">
                                  <div className="col">
                                    <CFormLabel className="text-primary fw-semibold">
                                      Reading Type
                                    </CFormLabel>
                                    <Field
                                      name={`meter_in_groups.${index}.reading_type`}
                                      placeholder="Enter Reading Type"
                                      apiController={getReadingTypesService}
                                      value={item?.reading_type}
                                      onChange={(val) => {
                                        setFieldValue(`meter_in_groups.${index}.reading_type`, val)
                                      }}
                                      valueKey="meter_reading_type_id"
                                      labelKey="value"
                                      size="md"
                                      required={errors?.meter_in_groups?.[index]?.reading_type}
                                      isDisabled={item?.meter_id?.meter_type !== 'continuous'}
                                      onBlur={() =>
                                        setFieldTouched(
                                          `meter_in_groups.${index}.reading_type`,
                                          true,
                                        )
                                      }
                                      as={SelectPagination}
                                      isClearable
                                    />
                                    {errors?.meter_in_groups?.[index]?.reading_type &&
                                    touched?.meter_in_groups?.[index]?.reading_type ? (
                                      <div className="text-sm text-[#e55353] mt-1">
                                        {errors?.meter_in_groups?.[index]?.reading_type}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-sm-3">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Accept Rolldown From
                                  </CFormLabel>
                                  <Field
                                    name={`meter_in_groups.${index}.accept_rolldown_from`}
                                    placeholder="Enter Accept Rolldown From"
                                    value={item?.accept_rolldown_from}
                                    onChange={async (val) => {
                                      setFieldValue(
                                        `meter_in_groups.${index}.accept_rolldown_from`,
                                        val,
                                      )
                                    }}
                                    onBlur={() =>
                                      setFieldTouched(
                                        `meter_in_groups.${index}.accept_rolldown_from`,
                                        true,
                                      )
                                    }
                                    size="md"
                                    options={accept_rolldown_options}
                                    required={
                                      errors?.meter_in_groups?.[index]?.accept_rolldown_from
                                    }
                                    isDisabled={item?.meter_id?.meter_type !== 'continuous'}
                                    as={Select}
                                    isClearable
                                  />
                                  {errors?.meter_in_groups?.[index]?.accept_rolldown_from &&
                                  touched?.meter_in_groups?.[index]?.accept_rolldown_from ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.meter_in_groups?.[index]?.accept_rolldown_from}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      {values.meter_in_groups.length < 1 && <span>No Meters</span>}
                      {/* <hr />
                      <div className="w-full">
                        <CButton
                          color="primary"
                          variant="outline"
                          className="hover:text-white"
                          onClick={() => {
                            arrayHelpers.push({ meter_in_group_id: null })
                          }}
                        >
                          <CIcon icon={cilPlus} className="me-2" /> Add new meter
                        </CButton>
                      </div> */}
                    </div>
                  )}
                />
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

export default LocationMetersForm
