import React from 'react'
import { CButton, CFooter, CFormInput, CFormLabel, CSpinner } from '@coreui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import { CiPaperplane } from 'react-icons/ci'
import { SelectPagination } from 'src/components/elements/select'
import CurrencyInput from 'react-currency-input-field'
import { toolsSchemaMulti } from '../../QRLaborMaterialsToolsSchema'
import useToolsForm from './hooks/useToolsForm'
import { BsTrash } from 'react-icons/bs'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const ToolsForm = ({ mode, setAction }) => {
  const {
    textFields,
    isSubmitting,
    selectedWorkOrderRow,
    getWorkOrderTaskToolsService,
    handleSubmit,
  } = useToolsForm({
    mode,
    setAction,
  })

  return (
    <Formik
      enableReinitialize
      initialValues={textFields}
      validationSchema={toolsSchemaMulti}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, setFieldTouched, values, errors, touched, dirty, isValid }) => {
        return (
          <Form>
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-body-bold">
                    {(mode === 'Create Tools' && 'New Tools') || 'Edit Tools'}
                  </h4>
                  <p className="text-neutral-text-disabled">
                    {(mode === 'Create Tools' && 'Fill this column to Create New Tools') ||
                      'Fill this column to Edit Tools'}
                  </p>
                </div>
              </div>
              <hr className="py-1" />
              <FieldArray
                name="tools"
                render={(arrayHelpers) => (
                  <div>
                    {values?.tools.map((item, index) => {
                      return (
                        <div className="my-2" key={index}>
                          <div className="flex">
                            <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                              <span className="text-white mb-1">{index + 1}</span>
                            </div>
                            {!item?.work_order_tool_id && index > 0 && (
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
                            name={`tools.${index}.work_order_tool_id`}
                            value={item?.work_order_tool_id}
                          />
                          <div className="grid grid-cols-4 my-3">
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Task <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                name={`tools.${index}.work_order_task_id`}
                                placeholder="Choose Task"
                                parentId={selectedWorkOrderRow?.work_order_id}
                                apiController={getWorkOrderTaskToolsService}
                                onChange={(event) =>
                                  setFieldValue(`tools.${index}.work_order_task_id`, event)
                                }
                                onBlur={() =>
                                  setFieldTouched(`tools.${index}.work_order_task_id`, true)
                                }
                                valueKey="work_order_task_id"
                                labelKey="task"
                                searchKey={'search'}
                                value={item?.work_order_task_id}
                                isAllData
                                as={SelectPagination}
                              />
                              {errors?.tools?.[index]?.work_order_task_id &&
                              touched?.tools?.[index]?.work_order_task_id ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.tools?.[index]?.work_order_task_id}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Tool <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                name={`tools.${index}.tool`}
                                placeholder="Choose Tool"
                                onChange={(event) =>
                                  setFieldValue(`tools.${index}.tool`, event?.target?.value)
                                }
                                onBlur={() => setFieldTouched(`tools.${index}.tool`, true)}
                                value={item?.tool}
                                as={CFormInput}
                              />
                              {errors?.tools?.[index]?.tool && touched?.tools?.[index]?.tool ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.tools?.[index]?.tool}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Description
                              </CFormLabel>
                              <Field
                                name={`tools.${index}.description`}
                                placeholder="Enter description"
                                onChange={(event) =>
                                  setFieldValue(`tools.${index}.description`, event?.target?.value)
                                }
                                onBlur={() => setFieldTouched(`tools.${index}.description`, true)}
                                value={item?.description}
                                as={CFormInput}
                              />
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Quantity <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                type="number"
                                name={`tools.${index}.quantity`}
                                placeholder="Enter Quantity"
                                onChange={(event) =>
                                  setFieldValue(`tools.${index}.quantity`, event?.target?.value)
                                }
                                onBlur={() => setFieldTouched(`tools.${index}.quantity`, true)}
                                min={1}
                                value={item?.quantity}
                                as={CFormInput}
                              />
                              {errors?.tools?.[index]?.quantity &&
                              touched?.tools?.[index]?.quantity ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.tools?.[index]?.quantity}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Unit Cost <span className="text-red-main">*</span>
                              </CFormLabel>
                              <CurrencyInput
                                allowDecimals={false}
                                decimalSeparator=","
                                groupSeparator="."
                                id={`tools.${index}.unit_cost`}
                                name={`tools.${index}.unit_cost`}
                                placeholder="Enter Unit Cost"
                                className="form-control"
                                allowNegativeValue={false}
                                defaultValue={0}
                                decimalsLimit={2}
                                step={500}
                                value={item?.unit_cost}
                                onValueChange={(value) =>
                                  setFieldValue(`tools.${index}.unit_cost`, value)
                                }
                                onBlur={() => setFieldTouched(`tools.${index}.unit_cost`, true)}
                                prefix="Rp "
                              />
                              {errors?.tools?.[index]?.unit_cost &&
                              touched?.tools?.[index]?.unit_cost ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.tools?.[index]?.unit_cost}
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
                                id={`tools.${index}.line_cost`}
                                name={`tools.${index}.line_cost`}
                                placeholder="Enter Line Cost"
                                className="form-control"
                                allowNegativeValue={false}
                                defaultValue={0}
                                decimalsLimit={2}
                                step={500}
                                value={item?.line_cost}
                                onValueChange={(value) =>
                                  setFieldValue(`tools.${index}.line_cost`, value)
                                }
                                onBlur={() => setFieldTouched(`tools.${index}.unit_cost`, true)}
                                prefix="Rp "
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    {values.tools.length < 1 && <span>No Tools</span>}
                    <hr />
                    <div className="w-full">
                      {mode !== 'Update Tools' && (
                        <CButton
                          color="primary"
                          variant="outline"
                          className="hover:text-white"
                          onClick={() => {
                            arrayHelpers.push({
                              work_order_tool_id: null,
                              quantity: 1,
                              unit_cost: 0,
                              line_cost: 0,
                            })
                          }}
                        >
                          <CIcon icon={cilPlus} className="me-2" /> Add Tool
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

export default ToolsForm
