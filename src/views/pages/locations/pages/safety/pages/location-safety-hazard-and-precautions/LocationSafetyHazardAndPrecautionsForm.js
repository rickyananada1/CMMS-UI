import React, { Fragment } from 'react'
import useLocationSafetyHazardAndPrecautionsForm from './hooks/useLocationSafetyHazardAndPrecautionsForm'
import { Field, FieldArray, Formik, Form } from 'formik'
import { CButton, CFooter, CFormCheck, CFormInput, CFormLabel, CSpinner } from '@coreui/react'
import { BsTrash } from 'react-icons/bs'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { DetailCard } from 'src/components/elements/cards'
import { SelectPagination } from 'src/components/elements/select'
import { CiPaperplane } from 'react-icons/ci'
import { locationSafetyHazardAndPrecautionsSchema } from './schema/locationSafetyHazardAndPrecautionsSchema'

const LocationSafetyHazardAndPrecautionsForm = ({ mode, setAction, setTabIndex }) => {
  const { formValue, selectedRow, getLocationSafetyHazards, handleSubmit } =
    useLocationSafetyHazardAndPrecautionsForm({
      mode,
      setAction,
      setTabIndex,
    })

  const isOnEdit = mode === 'Update'

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={formValue}
        validationSchema={locationSafetyHazardAndPrecautionsSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values, errors, touched, isValid, dirty }) => {
          return (
            <Form>
              <DetailCard>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="w-full text-body-bold">
                      {isOnEdit ? 'Edit' : 'Create'} Hazard and Precautions
                    </h4>
                    <div className="flex">
                      <p>
                        <span className="text-neutral-text-disabled">
                          Fill this column to {isOnEdit ? 'Update' : 'Create'} Hazard and
                          Precautions
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="py-1" />

                <FieldArray
                  name="location_hazard_and_precautions"
                  render={(arrayHelpers) =>
                    values.location_hazard_and_precautions.map((item, index) => {
                      return (
                        <div className="my-2" key={`${index}-new-hazards`}>
                          {!isOnEdit ? (
                            <div className="flex">
                              <div className="bg-primary-main rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                <span className="text-white mb-1">{index + 1}</span>
                              </div>
                              {values.location_hazard_and_precautions.length > 1 && (
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
                            </div>
                          ) : null}
                          <div className="my-4">
                            <div className="row">
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Hazard <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name={`location_hazard_and_precautions.${index}.hazard`}
                                  placeholder="Choose Hazard"
                                  value={item.hazard}
                                  apiController={getLocationSafetyHazards}
                                  onChange={(val) => {
                                    setFieldValue(
                                      `location_hazard_and_precautions.${index}.hazard`,
                                      val,
                                    )
                                  }}
                                  query={{
                                    site: selectedRow?.site_id,
                                  }}
                                  valueKey={'hazard'}
                                  labelKey={'hazard'}
                                  nestedLabelKey={'hazard_code'}
                                  nestedValueKey={'hazard_id'}
                                  otherKey={{
                                    hazard_desc: 'hazard.hazard_desc',
                                    hazmate_enabled: 'hazard.hazmate_enabled',
                                    hazard_type: 'hazard.hazard_type',
                                  }}
                                  isNestedLabelKey
                                  isNestedValueKey
                                  searchKey={'q'}
                                  isAllData
                                  isDisabled={isOnEdit}
                                  as={SelectPagination}
                                />
                                {errors?.location_hazard_and_precautions &&
                                errors?.location_hazard_and_precautions[index]?.hazard?.value &&
                                touched?.location_hazard_and_precautions &&
                                touched?.location_hazard_and_precautions[index]?.hazard?.value ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {errors.location_hazard_and_precautions[index]?.hazard?.value}
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Hazard Description
                                </CFormLabel>
                                <Field
                                  name={`location_hazard_and_precautions.${index}.hazard_desc`}
                                  placeholder="Enter Description"
                                  value={item?.hazard?.hazard?.hazard_desc}
                                  disabled
                                  as={CFormInput}
                                />
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Can Have Hazardous Materials ?
                                </CFormLabel>
                                <div className="form-check mt-1">
                                  <Field
                                    name={`location_hazard_and_precautions.${index}.hazard.hazard.hazmate_enabled`}
                                    id={`location_hazard_and_precautions.${index}.hazard.hazard.hazmate_enabled`}
                                    checked={!!item.hazard?.hazard?.hazmate_enabled}
                                    size="lg"
                                    onChange={(event) => {
                                      setFieldValue(
                                        `location_hazard_and_precautions.${index}.hazard.hazard.hazmate_enabled`,
                                        event?.target?.checked,
                                      )
                                    }}
                                    as={CFormCheck}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`location_hazard_and_precautions.${index}.hazard.hazard.hazmate_enabled`}
                                  >
                                    Yes
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Type <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name={`location_hazard_and_precautions.${index}.hazard.hazard.hazard_type`}
                                  placeholder="Enter Type"
                                  value={item?.hazard?.hazard?.hazard_type}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `location_hazard_and_precautions.${index}.hazard.hazard.hazard_type`,
                                      event?.target?.value,
                                    )
                                  }}
                                  as={CFormInput}
                                />
                                {errors?.location_hazard_and_precautions &&
                                errors?.location_hazard_and_precautions[index]?.hazard?.hazard
                                  ?.hazard_type &&
                                touched?.errors?.location_hazard_and_precautions &&
                                touched?.location_hazard_and_precautions[index]?.hazard?.hazard
                                  ?.hazard_type ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {
                                      errors.location_hazard_and_precautions[index]?.hazard?.hazard
                                        ?.hazard_type
                                    }
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            {!isOnEdit ? (
                              <Fragment>
                                <hr />
                                <div className="w-full">
                                  {index + 1 === values.location_hazard_and_precautions.length && (
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      className="hover:text-white"
                                      onClick={() => {
                                        arrayHelpers.push({
                                          hazard: {
                                            value: '',
                                            label: '',
                                            hazard: {
                                              hazmate_enabled: false,
                                              hazard_type: '',
                                            },
                                          },
                                        })
                                      }}
                                    >
                                      <CIcon icon={cilPlus} className="me-2" />
                                      Add Hazard And Precautions
                                    </CButton>
                                  )}
                                </div>
                              </Fragment>
                            ) : null}
                          </div>
                        </div>
                      )
                    })
                  }
                />
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
                    color="primary"
                    className="hover:text-white"
                    disabled={!(isValid && dirty) || isSubmitting}
                    type="submit"
                  >
                    <div className="flex items-center">
                      {isSubmitting ? (
                        <>
                          {isOnEdit ? 'Update' : 'Submit'}{' '}
                          <CSpinner className="ms-2" color="light" size="sm" />
                        </>
                      ) : (
                        <>
                          {isOnEdit ? 'Update' : 'Submit'} <CiPaperplane className="ms-2" />
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

export default LocationSafetyHazardAndPrecautionsForm
