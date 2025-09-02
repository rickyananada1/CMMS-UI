import React from 'react'
import { CButton, CFooter, CFormInput, CFormLabel, CFormTextarea, CSpinner } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import { CiPaperplane } from 'react-icons/ci'
import { SelectPagination } from 'src/components/elements/select'
import useToolsForm from '../../hooks/tools/useToolsForm'
import { toolsSchema } from '../../schema/laborMaterialsToolsSchema'
import CurrencyInput from 'react-currency-input-field'

const ToolsFormSingle = ({ mode, setAction }) => {
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
      validationSchema={toolsSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, setFieldTouched, values, errors, touched, dirty, isValid }) => {
        return (
          <Form>
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-body-bold">
                    {(mode === 'Create Tools' && 'New Actuals Tools') || 'Edit Actuals Tools'}
                  </h4>
                  <p className="text-neutral-text-disabled">
                    {(mode === 'Create Tools' && 'Fill this column to Create New Actuals Tools') ||
                      'Fill this column to Edit Actuals Tools'}
                  </p>
                </div>
              </div>
              <hr className="py-1" />
            </div>

            <div className="mt-3">
              <div className="mb-3">
                <div className="grid grid-cols-4 my-3">
                  <div className="mr-3  mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Task <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="work_order_task_id"
                      placeholder="Choose Task"
                      parentId={selectedWorkOrderRow?.work_order_id}
                      apiController={getWorkOrderTaskToolsService}
                      onChange={(event) => setFieldValue('work_order_task_id', event)}
                      valueKey="work_order_task_id"
                      labelKey="task"
                      searchKey={'search'}
                      value={values?.work_order_task_id}
                      isAllData
                      as={SelectPagination}
                    />
                    {errors?.work_order_task_id && touched?.work_order_task_id ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.work_order_task_id}</div>
                    ) : null}
                  </div>
                  <div className="mr-3  mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Tool <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="tool"
                      placeholder="Enter Tool"
                      onChange={(event) => setFieldValue('tool', event?.target?.value)}
                      size="md"
                      value={values?.tool}
                      as={CFormInput}
                    />
                    {errors?.tool && touched?.tool ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.tool}</div>
                    ) : null}
                  </div>
                  <div className="mr-3  mt-4">
                    <CFormLabel className="text-primary fw-semibold">Description</CFormLabel>
                    <Field
                      name="description"
                      placeholder="Enter description"
                      onChange={(event) => setFieldValue('description', event?.target?.value)}
                      size="md"
                      value={values?.description}
                      as={CFormTextarea}
                    />
                    {errors?.description && touched?.description ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.description}</div>
                    ) : null}
                  </div>
                  <div className="mr-3  mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Quantity <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      type="number"
                      name="quantity"
                      placeholder="Enter Quantity"
                      onChange={(event) => setFieldValue('quantity', event?.target?.value)}
                      min={1}
                      value={values?.quantity}
                      as={CFormInput}
                    />
                    {errors?.quantity && touched?.quantity ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.quantity}</div>
                    ) : null}
                  </div>
                  <div className="mr-3  mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Unit Cost <span className="text-red-main">*</span>
                    </CFormLabel>
                    <CurrencyInput
                      allowDecimals={false}
                      decimalSeparator=","
                      groupSeparator="."
                      id="unit_cost"
                      name="unit_cost"
                      placeholder="Enter Unit Cost"
                      className="form-control"
                      allowNegativeValue={false}
                      defaultValue={0}
                      decimalsLimit={2}
                      step={500}
                      value={values?.unit_cost}
                      onValueChange={(value) => setFieldValue('unit_cost', value)}
                      onBlur={() => setFieldTouched('unit_cost')}
                      prefix="Rp "
                    />
                    {errors?.unit_cost && touched?.unit_cost ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.unit_cost}</div>
                    ) : null}
                  </div>
                  <div className="mr-3  mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Line Cost <span className="text-red-main">*</span>
                    </CFormLabel>
                    <CurrencyInput
                      decimalSeparator=","
                      groupSeparator="."
                      id="line_cost"
                      name="line_cost"
                      placeholder="Enter Line Cost"
                      className="form-control"
                      allowNegativeValue={false}
                      defaultValue={0}
                      decimalsLimit={2}
                      step={500}
                      value={+values?.line_cost}
                      onValueChange={(value) => setFieldValue('line_cost', value)}
                      prefix="Rp "
                    />
                  </div>
                </div>
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

export default ToolsFormSingle
