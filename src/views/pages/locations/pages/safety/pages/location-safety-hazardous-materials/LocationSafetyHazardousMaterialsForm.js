import React, { Fragment } from 'react'
import useLocationSafetyHazardousMaterialsForm from './hooks/useLocationSafetyHazardousMaterialsForm'
import { Field, FieldArray, Formik, Form } from 'formik'
import { CButton, CFooter, CFormInput, CFormLabel, CFormTextarea, CSpinner } from '@coreui/react'
import { BsTrash } from 'react-icons/bs'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { DetailCard } from 'src/components/elements/cards'
import { SelectPagination } from 'src/components/elements/select'
import { CiPaperplane } from 'react-icons/ci'

const LocationSafetyHazardousMaterialsForm = ({ mode, setAction, setTabIndex }) => {
  const { formValue, getLocationSafetyHazards, handleSubmit } =
    useLocationSafetyHazardousMaterialsForm({
      mode,
      setAction,
      setTabIndex,
    })

  const isOnEdit = mode === 'Update'

  return (
    <div>
      <Formik enableReinitialize initialValues={formValue} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting, values, errors, touched, dirty, isValid }) => {
          return (
            <Form>
              <DetailCard>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="w-full text-body-bold">
                      {isOnEdit ? 'Edit' : 'Create'} Hazardous Materials
                    </h4>
                    <div className="flex">
                      <p>
                        <span className="text-neutral-text-disabled">
                          Fill this column to {isOnEdit ? 'Update' : 'Create'} Hazardous Materials
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="py-1" />

                <FieldArray
                  name="location_hazardous_materials"
                  render={(arrayHelpers) =>
                    values.location_hazardous_materials.map((item, index) => {
                      return (
                        <div className="my-2" key={`${index}-new-hazardous-material`}>
                          {!isOnEdit ? (
                            <div className="flex">
                              <div className="bg-primary-main rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                <span className="text-white mb-1">{index + 1}</span>
                              </div>
                              {values.location_hazardous_materials.length > 1 && (
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
                                  name={`location_hazardous_materials.${index}.hazard`}
                                  placeholder="Choose Hazard"
                                  value={item.hazard}
                                  apiController={getLocationSafetyHazards}
                                  valueKey={'hazard_id'}
                                  labelKey={'hazard_desc'}
                                  otherKey={{
                                    msds_num: 'msds_num',
                                    health_rating: 'health_rating',
                                    flammability_rating: 'flammability_rating',
                                    reactivity_rating: 'reactivity_rating',
                                    contact_rating: 'contact_rating',
                                  }}
                                  onChange={(val) => {
                                    setFieldValue(
                                      `location_hazardous_materials.${index}.hazard`,
                                      val,
                                    )
                                  }}
                                  disabled={isOnEdit}
                                  as={SelectPagination}
                                />
                                {errors?.location_hazardous_materials &&
                                errors?.location_hazardous_materials[index]?.hazard &&
                                touched?.location_hazardous_materials &&
                                touched?.location_hazardous_materials[index]?.hazard?.value ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {errors.location_hazardous_materials[index]?.hazard?.value}
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Hazard Description
                                </CFormLabel>
                                <Field
                                  name={`location_hazardous_materials.${index}.hazard_desc`}
                                  placeholder="Enter Description"
                                  value={item?.hazard?.hazard_desc}
                                  disabled
                                  as={CFormTextarea}
                                />
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  MSDS <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name={`location_hazardous_materials.${index}.msds_num`}
                                  placeholder="Enter MSDS"
                                  type="number"
                                  min={0}
                                  value={item?.hazard?.msds_num}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `location_hazardous_materials.${index}.hazard.msds_num`,
                                      event?.target?.value,
                                    )
                                  }}
                                  as={CFormInput}
                                />
                                {errors?.location_hazardous_materials &&
                                errors?.location_hazardous_materials[index]?.hazard?.msds_num &&
                                touched?.location_hazardous_materials &&
                                touched?.location_hazardous_materials[index]?.hazard?.msds_num ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {errors.location_hazardous_materials[index]?.hazard?.msds_num}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Health <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name={`location_hazardous_materials.${index}.hazard.health_rating`}
                                  placeholder="Enter Health"
                                  type="number"
                                  min={0}
                                  value={item?.hazard?.health_rating}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `location_hazardous_materials.${index}.hazard.health_rating`,
                                      event?.target?.value,
                                    )
                                  }}
                                  as={CFormInput}
                                />
                                {errors?.location_hazardous_materials &&
                                errors?.location_hazardous_materials[index]?.hazard
                                  ?.health_rating &&
                                touched?.location_hazardous_materials &&
                                touched?.location_hazardous_materials[index]?.hazard
                                  ?.health_rating ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {
                                      errors.location_hazardous_materials[index]?.hazard
                                        ?.health_rating
                                    }
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Flammability <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name={`location_hazardous_materials.${index}.flammability_rating`}
                                  placeholder="Enter Flammability"
                                  type="number"
                                  min={0}
                                  value={item?.hazard?.flammability_rating}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `location_hazardous_materials.${index}.hazard.flammability_rating`,
                                      event?.target?.value,
                                    )
                                  }}
                                  as={CFormInput}
                                />
                                {errors?.location_hazardous_materials &&
                                errors?.location_hazardous_materials[index]?.hazard
                                  ?.flammability_rating &&
                                touched?.location_hazardous_materials &&
                                touched?.location_hazardous_materials[index]?.hazard
                                  ?.flammability_rating ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {
                                      errors.location_hazardous_materials[index]?.hazard
                                        ?.flammability_rating
                                    }
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Reactivity <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name={`location_hazardous_materials.${index}.reactivity_rating`}
                                  placeholder="Enter Reactivity"
                                  type="number"
                                  min={0}
                                  value={item?.hazard?.reactivity_rating}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `location_hazardous_materials.${index}.hazard.reactivity_rating`,
                                      event?.target?.value,
                                    )
                                  }}
                                  as={CFormInput}
                                />
                                {errors?.location_hazardous_materials &&
                                errors?.location_hazardous_materials[index]?.hazard
                                  ?.reactivity_rating &&
                                touched?.location_hazardous_materials &&
                                touched?.location_hazardous_materials[index]?.hazard
                                  ?.reactivity_rating ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {
                                      errors.location_hazardous_materials[index]?.hazard
                                        ?.reactivity_rating
                                    }
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Contact <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name={`location_hazardous_materials.${index}.contact_rating`}
                                  placeholder="Enter Contact"
                                  type="number"
                                  min={0}
                                  value={item?.hazard?.contact_rating}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `location_hazardous_materials.${index}.hazard.contact_rating`,
                                      event?.target?.value,
                                    )
                                  }}
                                  as={CFormInput}
                                />
                                {errors?.location_hazardous_materials &&
                                errors?.location_hazardous_materials[index]?.hazard
                                  ?.contact_rating &&
                                touched?.location_hazardous_materials &&
                                touched?.location_hazardous_materials[index]?.hazard
                                  ?.contact_rating ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {
                                      errors.location_hazardous_materials[index]?.hazard
                                        ?.contact_rating
                                    }
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            {!isOnEdit ? (
                              <Fragment>
                                <hr />
                                <div className="w-full">
                                  {index + 1 === values.location_hazardous_materials.length && (
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      className="hover:text-white"
                                      onClick={() => {
                                        arrayHelpers.push({
                                          hazard: {
                                            value: '',
                                            label: '',
                                            hazard_desc: '',
                                            msds_num: '',
                                            health_rating: '',
                                            flammability_rating: '',
                                            reactivity_rating: '',
                                            contact_rating: '',
                                          },
                                        })
                                      }}
                                    >
                                      <CIcon icon={cilPlus} className="me-2" /> Add Hazard Materials
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

export default LocationSafetyHazardousMaterialsForm
