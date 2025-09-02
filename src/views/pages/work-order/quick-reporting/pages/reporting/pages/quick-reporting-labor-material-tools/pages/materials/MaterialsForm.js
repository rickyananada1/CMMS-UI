import React from 'react'
import CurrencyInput from 'react-currency-input-field'
import { CButton, CFooter, CFormInput, CFormLabel, CSpinner } from '@coreui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import { CiPaperplane } from 'react-icons/ci'
import { SelectPagination } from 'src/components/elements/select'
import useMaterialsForm from './hooks/useMaterialsForm'
import { materialsSchemaMulti } from '../../QRLaborMaterialsToolsSchema'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { BsTrash } from 'react-icons/bs'

const MaterialsForm = ({ mode, setAction }) => {
  const {
    textFields,
    isSubmitting,
    getWorkOrderTaskMaterialsService,
    getSparepartsService,
    selectedWorkOrderRow,
    handleSubmit,
  } = useMaterialsForm({
    mode,
    setAction,
  })

  return (
    <Formik
      enableReinitialize
      initialValues={textFields}
      validationSchema={materialsSchemaMulti}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, setFieldTouched, values, errors, touched, dirty, isValid }) => {
        return (
          <Form>
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-body-bold">
                    {(mode === 'Create Materials' && 'New Materials') || 'Edit Materials'}
                  </h4>
                  <p className="text-neutral-text-disabled">
                    {(mode === 'Create Materials' && 'Fill this column to Create New Materials') ||
                      'Fill this column to Edit Materials'}
                  </p>
                </div>
              </div>
              <hr className="py-1" />

              <FieldArray
                name="materials"
                render={(arrayHelpers) => (
                  <div>
                    {values?.materials.map((item, index) => {
                      return (
                        <div className="my-2" key={index}>
                          <div className="flex">
                            <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                              <span className="text-white mb-1">{index + 1}</span>
                            </div>
                            {!item?.work_order_material_id && index > 0 && (
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
                            name={`materials.${index}.work_order_material_id`}
                            value={item?.work_order_material_id}
                          />
                          <div className="grid grid-cols-4 mb-3">
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Task <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                name={`materials.${index}.work_order_task_id`}
                                placeholder="Choose Task"
                                parentId={selectedWorkOrderRow?.work_order_id}
                                apiController={getWorkOrderTaskMaterialsService}
                                onChange={(event) =>
                                  setFieldValue(`materials.${index}.work_order_task_id`, event)
                                }
                                onBlur={() =>
                                  setFieldTouched(`materials.${index}.work_order_task_id`, true)
                                }
                                valueKey="work_order_task_id"
                                labelKey="task"
                                searchKey={'search'}
                                value={item?.work_order_task_id}
                                isAllData
                                as={SelectPagination}
                              />
                              {errors?.materials?.[index]?.work_order_task_id &&
                              touched?.materials?.[index]?.work_order_task_id ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.materials?.[index]?.work_order_task_id}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Item <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                name={`materials.${index}.sparepart_id`}
                                placeholder="Choose Item"
                                onChange={(value) =>
                                  setFieldValue(`materials.${index}.sparepart_id`, value)
                                }
                                onBlur={() =>
                                  setFieldTouched(`materials.${index}.sparepart_id`, true)
                                }
                                value={item?.sparepart_id}
                                apiController={getSparepartsService}
                                searchKey={'qAssetNum'}
                                valueKey="sparepart_id"
                                labelKey="item_num"
                                isAllData
                                as={SelectPagination}
                              />
                              {errors?.materials?.[index]?.sparepart_id &&
                              touched?.materials?.[index]?.sparepart_id ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.materials?.[index]?.sparepart_id}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Description
                              </CFormLabel>
                              <Field
                                name={`materials.${index}.description`}
                                placeholder="Enter description"
                                value={item?.sparepart_id?.description}
                                as={CFormInput}
                                disabled
                              />
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Quantity <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                type="number"
                                name={`materials.${index}.quantity`}
                                placeholder="Enter Quantity"
                                onChange={(event) =>
                                  setFieldValue(`materials.${index}.quantity`, event?.target?.value)
                                }
                                onBlur={() => setFieldTouched(`materials.${index}.quantity`, true)}
                                min={1}
                                value={item?.quantity}
                                as={CFormInput}
                              />
                              {errors?.materials?.[index]?.quantity &&
                              touched?.materials?.[index]?.quantity ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.materials?.[index]?.quantity}
                                </div>
                              ) : null}
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Issue Unit <span className="text-red-main">*</span>
                              </CFormLabel>
                              <Field
                                name={`materials.${index}.issue_unit`}
                                placeholder="Enter Issue Unit"
                                onChange={(event) =>
                                  setFieldValue(
                                    `materials.${index}.issue_unit`,
                                    event?.target?.value,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched(`materials.${index}.issue_unit`, true)
                                }
                                value={item?.issue_unit}
                                as={CFormInput}
                              />
                              {errors?.materials?.[index]?.issue_unit &&
                              touched?.materials?.[index]?.issue_unit ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.materials?.[index]?.issue_unit}
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
                                id={`materials.${index}.unit_cost`}
                                name={`materials.${index}.unit_cost`}
                                placeholder="Enter Unit Cost"
                                className="form-control"
                                allowNegativeValue={false}
                                defaultValue={0}
                                decimalsLimit={2}
                                step={500}
                                value={item?.unit_cost}
                                onValueChange={(value) =>
                                  setFieldValue(`materials.${index}.unit_cost`, value)
                                }
                                onBlur={() => setFieldTouched(`materials.${index}.unit_cost`, true)}
                                prefix="Rp "
                              />
                              {errors?.materials?.[index]?.unit_cost &&
                              touched?.materials?.[index]?.unit_cost ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.materials?.[index]?.unit_cost}
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
                                id={`materials.${index}.line_cost`}
                                name={`materials.${index}.line_cost`}
                                placeholder="Enter Line Cost"
                                className="form-control"
                                allowNegativeValue={false}
                                defaultValue={0}
                                decimalsLimit={2}
                                step={500}
                                value={((+item?.quantity || 0) * (+item?.unit_cost || 0)).toFixed(
                                  2,
                                )}
                                prefix="Rp "
                                disabled
                              />
                            </div>
                            <div className="mr-3 mt-4">
                              <CFormLabel className="text-primary fw-semibold">
                                Store Room
                              </CFormLabel>
                              <Field
                                name={`materials.${index}.store_room`}
                                placeholder="Enter Store Room"
                                onChange={(event) =>
                                  setFieldValue(
                                    `materials.${index}.store_room`,
                                    event?.target?.value,
                                  )
                                }
                                onBlur={() =>
                                  setFieldTouched(`materials.${index}.store_room`, true)
                                }
                                size="md"
                                value={item?.store_room}
                                as={CFormInput}
                              />
                              {errors?.materials?.[index]?.store_room &&
                              touched?.materials?.[index]?.store_room ? (
                                <div className="text-sm text-[#b03434] mt-1">
                                  {errors.materials?.[index]?.store_room}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    {values.materials.length < 1 && <span>No Materials</span>}
                    <hr />
                    <div className="w-full">
                      {mode !== 'Update Materials' && (
                        <CButton
                          color="primary"
                          variant="outline"
                          className="hover:text-white"
                          onClick={() => {
                            arrayHelpers.push({
                              work_order_material_id: null,
                              quantity: 1,
                              unit_cost: 0,
                              line_cost: 0,
                            })
                          }}
                        >
                          <CIcon icon={cilPlus} className="me-2" /> Add Material
                        </CButton>
                      )}
                    </div>
                  </div>
                )}
              />

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
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default MaterialsForm
