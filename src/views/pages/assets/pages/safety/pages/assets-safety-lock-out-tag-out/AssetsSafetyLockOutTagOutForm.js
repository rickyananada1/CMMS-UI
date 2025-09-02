import React, { Fragment } from 'react'
import useAssetsSafetyLockOutTagOutForm from './hooks/useAssetsSafetyLockOutTagOutForm'
import { Field, FieldArray, Formik, Form } from 'formik'
import { CButton, CFooter, CFormInput, CFormLabel, CSpinner, CFormTextarea } from '@coreui/react'
import { BsTrash } from 'react-icons/bs'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { DetailCard } from 'src/components/elements/cards'
import { SelectPagination } from 'src/components/elements/select'
import { CiPaperplane } from 'react-icons/ci'
import { assetsSafetyLockOutTagOutSchema } from './schema/assetsSafetyLockOutTagOutSchema'

const AssetsSafetyHazardAndPrecautionsForm = ({ mode, setAction, setTabIndex }) => {
  const {
    selectedRow,
    formValue,
    getAssetsSafetyHazardsTagOut,
    getAssetsSafetyTagOut,
    handleSubmit,
  } = useAssetsSafetyLockOutTagOutForm({
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
        validationSchema={assetsSafetyLockOutTagOutSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values, errors, touched, isValid, dirty }) => {
          return (
            <Form>
              <DetailCard>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="w-full text-body-bold">
                      {isOnEdit ? 'Edit' : 'Add'} Hazard and Tag Out
                    </h4>
                    <div className="flex">
                      <p>
                        <span className="text-neutral-text-disabled">
                          Fill this column to {isOnEdit ? 'Update' : 'Add'} Hazard and Tag Out
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="py-1" />

                <FieldArray
                  name="safety_lock_out_tag_out"
                  render={(arrayHelpers) =>
                    values.safety_lock_out_tag_out.map((item, index) => {
                      return (
                        <div className="my-2" key={`${index}-new-hazard-tag-out`}>
                          {!isOnEdit ? (
                            <div className="flex">
                              <div className="bg-primary-main rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                <span className="text-white mb-1">{index + 1}</span>
                              </div>
                              {values.safety_lock_out_tag_out.length > 1 && (
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
                            <div className="flex items-center justify-between">
                              <p className="text-base text-neutral-text-field text-nowrap font-normal">
                                Hazard
                              </p>
                              <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                            </div>
                            <div className="row">
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Hazard <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name={`safety_lock_out_tag_out.${index}.hazard`}
                                  placeholder="Choose Hazard"
                                  value={item?.hazard}
                                  apiController={getAssetsSafetyHazardsTagOut}
                                  parentId={selectedRow?.asset_id}
                                  query={{
                                    site: selectedRow?.site_id,
                                    tagOutEnabled: true,
                                  }}
                                  onChange={(val) => {
                                    setFieldValue(`safety_lock_out_tag_out.${index}.hazard`, val)
                                  }}
                                  valueKey={'hazard'}
                                  labelKey={'hazard'}
                                  nestedLabelKey={'hazard_code'}
                                  nestedValueKey={'hazard_id'}
                                  otherKey={{
                                    hazard_desc: 'hazard.hazard_desc',
                                    hazmate_enabled: 'hazard.hazmate_enabled',
                                    msds: 'safety_extended_data.msds_num',
                                  }}
                                  isNestedLabelKey
                                  isNestedValueKey
                                  searchKey={'q'}
                                  isAllData
                                  as={SelectPagination}
                                />
                                {errors?.safety_lock_out_tag_out &&
                                errors?.safety_lock_out_tag_out[index]?.hazard &&
                                touched?.safety_lock_out_tag_out &&
                                touched?.safety_lock_out_tag_out[index]?.hazard ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {errors.safety_lock_out_tag_out[index]?.hazard?.value}
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Hazard Description
                                </CFormLabel>
                                <Field
                                  name={`safety_lock_out_tag_out.${index}.hazard.hazard_desc`}
                                  placeholder="Enter Hazard Description"
                                  value={item?.hazard?.hazard?.hazard_desc}
                                  disabled
                                  as={CFormTextarea}
                                />
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">MSDS</CFormLabel>
                                <Field
                                  name={`safety_lock_out_tag_out.${index}.hazard.msds`}
                                  placeholder="Enter Type"
                                  value={item?.hazard?.safety_extended_data?.msds_num || '-'}
                                  disabled
                                  as={CFormInput}
                                />
                              </div>
                            </div>
                            {isOnEdit && !item?.tag_out ? (
                              <div className="w-full mb-2">
                                <CButton
                                  color="primary"
                                  variant="outline"
                                  className="hover:text-white"
                                  onClick={() => {
                                    setFieldValue(`safety_lock_out_tag_out.${index}.tag_out`, {
                                      label: '',
                                      value: '',
                                    })
                                  }}
                                >
                                  <CIcon icon={cilPlus} className="me-2" />
                                  Add Tag Out
                                </CButton>
                              </div>
                            ) : null}
                            {(isOnEdit && item?.tag_out) || !isOnEdit ? (
                              <Fragment>
                                <div className="flex items-center justify-between">
                                  <p className="text-base text-neutral-text-field text-nowrap font-normal">
                                    Tag Out
                                  </p>
                                  {/* {isOnEdit && item?.tag_out ? (
                                    <CButton
                                      color="danger"
                                      variant="outline"
                                      className="hover:text-white mb-3 ml-2"
                                      onClick={() => {
                                        setFieldValue(
                                          `safety_lock_out_tag_out.${index}.tag_out`,
                                          null,
                                        )
                                      }}
                                    >
                                      <BsTrash />
                                    </CButton>
                                  ) : null} */}
                                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                                </div>
                                <div className="row">
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      Tag Out <span className="text-red-main">*</span>
                                    </CFormLabel>
                                    <Field
                                      name={`safety_lock_out_tag_out.${index}.tag_out`}
                                      placeholder="Choose Tag Out"
                                      value={item.tag_out}
                                      apiController={getAssetsSafetyTagOut}
                                      valueKey={'tag_out'}
                                      labelKey={'tag_out'}
                                      nestedValueKey={'tag_out_id'}
                                      nestedLabelKey={'tag_out_desc'}
                                      otherKey={{
                                        tag_out: 'tag_out',
                                        lock_outs: 'lock_outs',
                                      }}
                                      searchKey={'q'}
                                      query={{
                                        site: selectedRow?.site_id,
                                      }}
                                      onChange={(val) => {
                                        setFieldValue(
                                          `safety_lock_out_tag_out.${index}.tag_out`,
                                          val,
                                        )
                                      }}
                                      isNestedValueKey
                                      isNestedLabelKey
                                      as={SelectPagination}
                                    />
                                    {errors?.safety_lock_out_tag_out &&
                                    errors?.safety_lock_out_tag_out[index]?.tag_out &&
                                    touched?.safety_lock_out_tag_out &&
                                    touched?.safety_lock_out_tag_out[index]?.tag_out ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.safety_lock_out_tag_out[index]?.tag_out?.value}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      Tag Out Code
                                    </CFormLabel>
                                    <Field
                                      name={`safety_lock_out_tag_out.${index}.tag_out_code`}
                                      placeholder="Enter Tag Out Code"
                                      value={item?.tag_out?.tag_out?.tag_out_code}
                                      disabled
                                      as={CFormInput}
                                    />
                                  </div>
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      Apply Sequence
                                    </CFormLabel>
                                    <Field
                                      name={`safety_lock_out_tag_out.${index}.tag_out.apply_sequence`}
                                      placeholder="Enter Apply Sequence"
                                      value={item?.tag_out?.apply_sequence}
                                      onChange={(event) =>
                                        setFieldValue(
                                          `safety_lock_out_tag_out.${index}.tag_out.apply_sequence`,
                                          event.target?.value,
                                        )
                                      }
                                      size="md"
                                      type="number"
                                      min={0}
                                      max={999}
                                      as={CFormInput}
                                    />
                                    {errors?.safety_lock_out_tag_out &&
                                    errors?.safety_lock_out_tag_out[index]?.tag_out
                                      ?.apply_sequence &&
                                    touched?.safety_lock_out_tag_out &&
                                    touched?.safety_lock_out_tag_out[index]?.tag_out
                                      ?.apply_sequence ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {
                                          errors.safety_lock_out_tag_out[index]?.tag_out
                                            ?.apply_sequence
                                        }
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      Remove Sequence
                                    </CFormLabel>
                                    <Field
                                      name={`safety_lock_out_tag_out.${index}.tag_out.remove_sequence`}
                                      placeholder="Enter Remove Sequence"
                                      value={item?.tag_out?.remove_sequence}
                                      onChange={(event) =>
                                        setFieldValue(
                                          `safety_lock_out_tag_out.${index}.tag_out.remove_sequence`,
                                          event.target?.value,
                                        )
                                      }
                                      size="md"
                                      type="number"
                                      min={0}
                                      max={999}
                                      as={CFormInput}
                                    />
                                    {errors?.safety_lock_out_tag_out &&
                                    errors?.safety_lock_out_tag_out[index]?.tag_out
                                      ?.remove_sequence &&
                                    touched?.safety_lock_out_tag_out &&
                                    touched?.safety_lock_out_tag_out[index]?.tag_out
                                      ?.remove_sequence ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {
                                          errors.safety_lock_out_tag_out[index]?.tag_out
                                            ?.remove_sequence
                                        }
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      Asset
                                    </CFormLabel>
                                    <Field
                                      name={`safety_lock_out_tag_out.${index}.tag_out.remove_sequence`}
                                      placeholder="Enter Asset"
                                      value={item?.tag_out?.value ? selectedRow?.asset_num : null}
                                      size="md"
                                      disabled
                                      as={CFormInput}
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <p className="text-base text-neutral-text-field text-nowrap font-normal">
                                    Lock Out
                                  </p>
                                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                                </div>
                                <FieldArray
                                  name={`safety_lock_out_tag_out.${index}.lock_out`}
                                  render={() =>
                                    item?.tag_out?.lock_outs?.length > 0 ? (
                                      item?.tag_out?.lock_outs?.map((itemLock, indexLock) => {
                                        return (
                                          <div
                                            key={`lock_out-${index}-${indexLock}`}
                                            className="row"
                                          >
                                            <div className="flex col-auto items-center mt-2">
                                              <div className="bg-primary-main rounded w-[35px] h-[40px] p-2 text-center">
                                                <span className="text-white mb-1">
                                                  {indexLock + 1}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="col-md-3 mb-4">
                                              <CFormLabel className="text-primary fw-semibold">
                                                Lock Out
                                              </CFormLabel>
                                              <Field
                                                name={`safety_lock_out_tag_out.${index}.lock_out.${indexLock}.lock_out`}
                                                placeholder="Enter Lock Out"
                                                value={itemLock?.lock_out_desc}
                                                size="md"
                                                disabled
                                                as={CFormInput}
                                              />
                                            </div>
                                            <div className="col-md-3 mb-4">
                                              <CFormLabel className="text-primary fw-semibold">
                                                Apply Sequence
                                              </CFormLabel>
                                              <Field
                                                name={`safety_lock_out_tag_out.${index}.lock_out.${indexLock}.apply_sequence`}
                                                placeholder="Enter Apply Sequence"
                                                value={itemLock?.apply_sequence}
                                                size="md"
                                                disabled
                                                as={CFormInput}
                                              />
                                            </div>
                                            <div className="col-md-3 mb-4">
                                              <CFormLabel className="text-primary fw-semibold">
                                                Remove Sequence
                                              </CFormLabel>
                                              <Field
                                                name={`safety_lock_out_tag_out.${index}.lock_out.${indexLock}.remove_sequence`}
                                                placeholder="Enter Remove Sequence"
                                                value={itemLock?.remove_sequence}
                                                size="md"
                                                disabled
                                                as={CFormInput}
                                              />
                                            </div>
                                          </div>
                                        )
                                      })
                                    ) : (
                                      <div>No Lock Outs</div>
                                    )
                                  }
                                />
                              </Fragment>
                            ) : null}
                            {!isOnEdit ? (
                              <Fragment>
                                <hr />
                                <div className="w-full">
                                  {index + 1 === values.safety_lock_out_tag_out.length && (
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      className="hover:text-white"
                                      onClick={() => {
                                        arrayHelpers.push({
                                          hazard: null,
                                          tag_out: {
                                            value: '',
                                            label: '',
                                            apply_sequence: '',
                                            remove_sequence: '',
                                          },
                                        })
                                      }}
                                    >
                                      <CIcon icon={cilPlus} className="me-2" />
                                      Add Hazard And Tag Out
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
                    disabled={!dirty || isSubmitting}
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

export default AssetsSafetyHazardAndPrecautionsForm
