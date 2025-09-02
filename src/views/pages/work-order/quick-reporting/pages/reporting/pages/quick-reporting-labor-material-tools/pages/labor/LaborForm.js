import React from 'react'
import CurrencyInput from 'react-currency-input-field'
import { CButton, CFooter, CFormInput, CFormLabel, CFormSelect, CSpinner } from '@coreui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import { CiPaperplane } from 'react-icons/ci'
import { SelectPagination } from 'src/components/elements/select'
import { laborSchemaMulti } from '../../QRLaborMaterialsToolsSchema'
import useLaborForm from './hooks/useLaborForm'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { BsTrash } from 'react-icons/bs'

const LaborForm = ({ mode, setAction }) => {
  const {
    textFields,
    optionsStatus,
    isSubmitting,
    handleSubmit,
    getWorkOrderTaskLaborService,
    selectedWorkOrderRow,
  } = useLaborForm({
    mode,
    setAction,
  })

  return (
    <Formik
      enableReinitialize
      initialValues={textFields}
      validationSchema={laborSchemaMulti}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, setFieldTouched, values, errors, touched, dirty, isValid }) => {
        return (
          <Form>
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-body-bold">
                    {(mode === 'Create Labor' && 'New Labor') || 'Edit Labor'}
                  </h4>
                  <p className="text-neutral-text-disabled">
                    {(mode === 'Create Labor' && 'Fill this column to Create New Labor') ||
                      'Fill this column to Edit Labor'}
                  </p>
                </div>
              </div>
              <hr className="py-1" />

              <FieldArray
                name="labors"
                render={(arrayHelpers) => (
                  <div>
                    {values?.labors.map((item, index) => {
                      return (
                        <div className="my-2" key={index}>
                          <div className="flex">
                            <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                              <span className="text-white mb-1">{index + 1}</span>
                            </div>
                            {!item?.work_order_labor_id && index > 0 && (
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
                          <Field
                            className={'hidden'}
                            name={`labors.${index}.work_order_labor_id`}
                            value={item?.work_order_labor_id}
                          />
                          <div className="grid grid-cols-4 mb-4">
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Task <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                name={`labors.${index}.work_order_task_id`}
                                placeholder="Choose Task"
                                onChange={(value) =>
                                  setFieldValue(`labors.${index}.work_order_task_id`, value)
                                }
                                onBlur={() =>
                                  setFieldTouched(`labors.${index}.work_order_task_id`, true)
                                }
                                value={item?.work_order_task_id}
                                parentId={selectedWorkOrderRow?.work_order_id}
                                apiController={getWorkOrderTaskLaborService}
                                valueKey="work_order_task_id"
                                labelKey="task"
                                searchKey="search"
                                isAllData
                                as={SelectPagination}
                              />
                              {errors?.labors?.[index]?.work_order_task_id &&
                              touched?.labors?.[index]?.work_order_task_id ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.labors?.[index]?.work_order_task_id}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Craft <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                name={`labors.${index}.craft`}
                                placeholder="Choose Craft"
                                onChange={(event) =>
                                  setFieldValue(`labors.${index}.craft`, event?.target?.value)
                                }
                                onBlur={() => setFieldTouched(`labors.${index}.craft`, true)}
                                size="md"
                                value={item?.craft}
                                as={CFormInput}
                              />
                              {errors?.labors?.[index]?.craft && touched?.labors?.[index]?.craft ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.labors?.[index]?.craft}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Skill Level <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                name={`labors.${index}.skill_level`}
                                placeholder="Choose Skill Level"
                                onChange={(event) =>
                                  setFieldValue(`labors.${index}.skill_level`, event?.target?.value)
                                }
                                onBlur={() => setFieldTouched(`labors.${index}.skill_level`, true)}
                                value={item?.skill_level}
                                options={['Choose Skill Level', ...optionsStatus]}
                                size="md"
                                as={CFormSelect}
                              />
                              {errors?.labors?.[index]?.skill_level &&
                              touched?.labors?.[index]?.skill_level ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.labors?.[index]?.skill_level}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">Vendor</CFormLabel>
                              <Field
                                name={`labors.${index}.vendor`}
                                placeholder="Choose Vendor"
                                onChange={(event) =>
                                  setFieldValue(`labors.${index}.vendor`, event?.target?.value)
                                }
                                onBlur={() => setFieldTouched(`labors.${index}.vendor`, true)}
                                size="md"
                                value={item?.vendor}
                                as={CFormInput}
                              />
                              {errors?.labors?.[index]?.vendor &&
                              touched?.labors?.[index]?.vendor ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.labors?.[index]?.vendor}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Quantity <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                name={`labors.${index}.quantity`}
                                placeholder="Enter Quantity"
                                onChange={(event) =>
                                  setFieldValue(`labors.${index}.quantity`, event?.target?.value)
                                }
                                onBlur={() => setFieldTouched(`labors.${index}.quantity`, true)}
                                size="md"
                                value={item?.quantity}
                                type="number"
                                min={1}
                                as={CFormInput}
                              />
                              {errors?.labors?.[index]?.quantity &&
                              touched?.labors?.[index]?.quantity ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.labors?.[index]?.quantity}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Labor <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                name={`labors.${index}.labor`}
                                placeholder="Choose Labor"
                                onChange={(event) =>
                                  setFieldValue(`labors.${index}.labor`, event?.target?.value)
                                }
                                onBlur={() => setFieldTouched(`labors.${index}.labor`, true)}
                                size="md"
                                value={item?.labor}
                                as={CFormInput}
                              />
                              {errors?.labors?.[index]?.labor && touched?.labors?.[index]?.labor ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.labors?.[index]?.labor}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Regular Hours <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                name={`labors.${index}.regular_hours`}
                                placeholder="Enter Regular Hours"
                                onChange={(event) =>
                                  setFieldValue(
                                    `labors.${index}.regular_hours`,
                                    event?.target?.value,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched(`labors.${index}.regular_hours`, true)
                                }
                                size="md"
                                type="number"
                                value={item?.regular_hours}
                                as={CFormInput}
                              />
                              {errors?.labors?.[index]?.regular_hours &&
                              touched?.labors?.[index]?.regular_hours ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.labors?.[index]?.regular_hours}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Rate <span className="text-red-main">*</span>
                              </CFormLabel>
                              <CurrencyInput
                                allowDecimals={false}
                                decimalSeparator=","
                                groupSeparator="."
                                id={`labors.${index}.rate`}
                                name={`labors.${index}.rate`}
                                placeholder="Enter Rate"
                                className="form-control"
                                allowNegativeValue={false}
                                defaultValue={0}
                                decimalsLimit={2}
                                step={500}
                                value={item?.rate}
                                onValueChange={(value) =>
                                  setFieldValue(`labors.${index}.rate`, value)
                                }
                                onBlur={() => setFieldTouched(`labors.${index}.rate`, true)}
                                prefix="Rp "
                              />
                              {errors?.labors?.[index]?.rate && touched?.labors?.[index]?.rate ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.labors?.[index]?.rate}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Line Cost <span className="text-red-main">*</span>
                              </CFormLabel>
                              <CurrencyInput
                                decimalSeparator=","
                                groupSeparator="."
                                id={`labors.${index}.line_cost`}
                                name={`labors.${index}.line_cost`}
                                placeholder="Enter Line Cost"
                                className="form-control"
                                allowNegativeValue={false}
                                defaultValue={0}
                                decimalsLimit={2}
                                step={500}
                                value={(
                                  (+item?.quantity || 0) *
                                  Number(String(item?.rate ?? '0').replace(/,/g, '.') || 0) *
                                  (+item?.regular_hours || 0)
                                ).toFixed(2)}
                                prefix="Rp "
                                disabled
                              />
                              {errors?.labors?.[index]?.line_cost &&
                              touched?.labors?.[index]?.line_cost ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.labors?.[index]?.line_cost}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    {values.labors.length < 1 && <span>No Labor</span>}
                    <hr />
                    <div className="w-full">
                      {mode !== 'Update Labor' && (
                        <CButton
                          color="primary"
                          variant="outline"
                          className="hover:text-white"
                          onClick={() => {
                            arrayHelpers.push({
                              work_order_labor_id: null,
                              quantity: 1,
                              unit_cost: 0,
                              regular_hours: 0,
                              rate: 0,
                              line_cost: 0,
                            })
                          }}
                        >
                          <CIcon icon={cilPlus} className="me-2" /> Add Labor
                        </CButton>
                      )}
                    </div>
                  </div>
                )}
              />
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
            </CFooter>
          </Form>
        )
      }}
    </Formik>
  )
}

export default LaborForm
