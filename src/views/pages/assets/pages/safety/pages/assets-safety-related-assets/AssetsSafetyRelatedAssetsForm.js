import React from 'react'
import { Field, FieldArray, Formik, Form } from 'formik'
import { CButton, CFooter, CFormInput, CFormLabel, CSpinner } from '@coreui/react'
import { BsTrash } from 'react-icons/bs'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { DetailCard } from 'src/components/elements/cards'
import { SelectPagination } from 'src/components/elements/select'
import { CiPaperplane } from 'react-icons/ci'
import useAssetsSafetyRelatedAssetsForm from './hooks/useAssetsSafetyRelatedAssetsForm'
import { assetsSafetyRelatedAssetsSchema } from './schema/assetsSafetyRelatedAssetsSchema'

const AssetsSafetyRelatedAssetsForm = ({ mode, setAction, setTabIndex }) => {
  const { formValue, getAssets, handleSubmit } = useAssetsSafetyRelatedAssetsForm({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={formValue}
        validationSchema={assetsSafetyRelatedAssetsSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values, errors, isValid, dirty, touched }) => {
          return (
            <Form>
              <DetailCard>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="w-full text-body-bold">
                      {mode === 'Update' ? 'Edit' : 'Create'} Safety - Related Assets
                    </h4>
                    <div className="flex">
                      <p>
                        <span className="text-neutral-text-disabled">
                          {mode === 'Update' ? 'Update' : 'Create'} this column to add Safety -
                          Related Assets
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="py-1" />

                <FieldArray
                  name="related_assets_ids"
                  render={(arrayHelpers) =>
                    values.related_assets_ids.map((item, index) => {
                      return (
                        <div className="my-2" key={`${index}-related-assets`}>
                          <div className="flex">
                            <div className="bg-primary-main rounded w-[35px] h-[40px] p-2 text-center mr-3">
                              <span className="text-white mb-1">{index + 1}</span>
                            </div>
                            {values.related_assets_ids.length > 1 && (
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
                          <div className="my-4">
                            <div className="flex items-center justify-between">
                              <p className="text-base text-neutral-text-field text-nowrap font-normal">
                                Asset
                              </p>
                              <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                            </div>
                            <div className="row">
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Asset <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name={`related_assets_ids.${index}.asset`}
                                  placeholder="Choose Asset"
                                  value={item.asset}
                                  apiController={getAssets}
                                  valueKey={'asset_id'}
                                  labelKey={'asset_num'}
                                  onChange={(val) => {
                                    setFieldValue(`related_assets_ids.${index}.asset`, val)
                                  }}
                                  isAllData
                                  as={SelectPagination}
                                />
                                {errors?.related_assets_ids &&
                                errors?.related_assets_ids[index]?.asset &&
                                touched?.related_assets_ids &&
                                touched?.related_assets_ids[index]?.asset ? (
                                  <div className="text-sm text-[#b03434] mt-1">
                                    {errors.related_assets_ids[index]?.asset?.value}
                                  </div>
                                ) : null}
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Asset Description
                                </CFormLabel>
                                <Field
                                  name={`related_assets_ids.${index}.asset.asset_description`}
                                  placeholder="Enter Description"
                                  value={item?.asset?.asset_description}
                                  disabled
                                  as={CFormInput}
                                />
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  KKS Number
                                </CFormLabel>
                                <Field
                                  name={`related_assets_ids.${index}.asset.kks_number`}
                                  placeholder="Enter KKS Number"
                                  value={item?.asset?.kks_number}
                                  disabled
                                  as={CFormInput}
                                />
                              </div>
                            </div>

                            {/* <div className="flex items-center justify-between">
                              <p className="text-base text-neutral-text-field text-nowrap font-normal">
                                Location
                              </p>
                              <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                            </div>
                            <div className="row">
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Location
                                </CFormLabel>
                                <Field
                                  name={`related_assets_ids.${index}.asset.location`}
                                  placeholder="Enter Description"
                                  value={item?.asset?.location}
                                  disabled
                                  as={CFormInput}
                                />
                              </div>
                              <div className="col-md-3 mb-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Location Description
                                </CFormLabel>
                                <Field
                                  name={`related_assets_ids.${index}.asset.location_description`}
                                  placeholder="Enter Location Description"
                                  value={item?.asset?.location_description}
                                  disabled
                                  as={CFormInput}
                                />
                              </div>
                            </div> */}

                            <hr />
                            <div className="w-full">
                              {index + 1 === values.related_assets_ids.length && (
                                <CButton
                                  color="primary"
                                  variant="outline"
                                  className="hover:text-white"
                                  onClick={() => {
                                    arrayHelpers.push({
                                      asset: {
                                        value: '',
                                        label: '',
                                      },
                                    })
                                  }}
                                >
                                  <CIcon icon={cilPlus} className="me-2" /> Add Safety - Related
                                  Assets
                                </CButton>
                              )}
                            </div>
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
                          {mode === 'Update' ? 'Update' : 'Submit'}{' '}
                          <CSpinner className="ms-2" color="light" size="sm" />
                        </>
                      ) : (
                        <>
                          {mode === 'Update' ? 'Update' : 'Submit'}{' '}
                          <CiPaperplane className="ms-2" />
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

export default AssetsSafetyRelatedAssetsForm
