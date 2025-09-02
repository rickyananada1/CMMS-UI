import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { BsTrash } from 'react-icons/bs'
import { Form, Formik, FieldArray, Field } from 'formik'
import {
  CButton,
  CCard,
  CCardBody,
  CFormInput,
  CFormLabel,
  CFooter,
  CFormTextarea,
} from '@coreui/react'
import { SelectPagination } from 'src/components/elements/select'
import useToolForm from '../hooks/useToolForm'
import { toolSchema } from '../schema'
import CurrencyInput from 'react-currency-input-field'

const ToolForm = ({ mode, setAction, setTabIndex }) => {
  const { formValue, handleSubmit, selectedRow, getWoTaskDropdown, isDisabled } = useToolForm({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <div className="bg-white p-4 rounded mb-5">
      <Formik
        enableReinitialize
        validationSchema={toolSchema}
        initialValues={formValue}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const {
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
            dirty,
            isValid,
            isSubmitting,
          } = props

          return (
            <Form>
              <CCard className="card-b-left">
                <CCardBody className="p-5">
                  <h4 className="font-semibold">{mode === 'UpdateTool' ? 'Edit' : 'New'} Tools</h4>
                  <div>
                    <p>
                      {mode === 'UpdateTool'
                        ? 'Update this column to edit tool'
                        : 'Fill this column to add new tool'}
                    </p>
                  </div>
                  <hr />

                  <FieldArray
                    name="tool"
                    render={(arrayHelpers) =>
                      values.tool?.map((item, index) => {
                        return (
                          <div className="my-2" key={index}>
                            {mode === 'CreateTool' && (
                              <div className="flex">
                                <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                  <span className="text-white mb-1">{index + 1}</span>
                                </div>
                                {values.tool.length > 1 && (
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
                            )}

                            <div className="my-4">
                              <div className="row">
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">Task</CFormLabel>
                                  <Field
                                    name={`tool.${index}.work_order_task_id`}
                                    placeholder="Choose Task"
                                    apiController={getWoTaskDropdown}
                                    value={item?.work_order_task_id}
                                    valueKey="work_order_task_id"
                                    labelKey="task"
                                    parentId={selectedRow.job_plan_id}
                                    onChange={(val) => {
                                      setFieldValue(`tool.${index}.work_order_task_id`, val)
                                    }}
                                    onBlur={() => {
                                      setFieldTouched(`tool.${index}.work_order_task_id`)
                                    }}
                                    searchKey="q"
                                    isDisabled={isDisabled || isSubmitting}
                                    as={SelectPagination}
                                  />
                                  {errors &&
                                  errors.tool &&
                                  errors.tool[index]?.work_order_task_id &&
                                  touched &&
                                  touched.tool &&
                                  touched.tool[index]?.work_order_task_id ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.tool[index]?.work_order_task_id}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">Tool</CFormLabel>
                                  <Field
                                    name={`tool.${index}.tool`}
                                    placeholder="Enter Tool"
                                    value={item?.tool}
                                    onChange={(val) => {
                                      setFieldValue(`tool.${index}.tool`, val.target.value)
                                    }}
                                    disabled={isDisabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.tool &&
                                  errors.tool[index]?.tool &&
                                  touched &&
                                  touched.tool &&
                                  touched.tool[index]?.tool ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.tool[index]?.tool}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Description
                                  </CFormLabel>
                                  <Field
                                    name={`tool.${index}.description`}
                                    placeholder="Enter Description"
                                    value={item?.description}
                                    onChange={(val) => {
                                      setFieldValue(`tool.${index}.description`, val.target.value)
                                    }}
                                    disabled={isDisabled || isSubmitting}
                                    as={CFormTextarea}
                                  />
                                  {errors &&
                                  errors.tool &&
                                  errors.tool[index]?.description &&
                                  touched &&
                                  touched.tool &&
                                  touched.tool[index]?.description ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.tool[index]?.description}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Quantity
                                  </CFormLabel>
                                  <Field
                                    name={`tool.${index}.quantity`}
                                    placeholder="Enter Quantity"
                                    value={item?.quantity}
                                    onBlur={() => {
                                      setFieldTouched(`tool.${index}.quantity`)
                                    }}
                                    onChange={(val) => {
                                      setFieldValue(`tool.${index}.quantity`, val.target.value)
                                    }}
                                    type="number"
                                    min={0}
                                    disabled={isDisabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.tool &&
                                  errors.tool[index]?.quantity &&
                                  touched &&
                                  touched.tool &&
                                  touched.tool[index]?.quantity ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.tool[index]?.quantity}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Unit Cost
                                  </CFormLabel>
                                  <CurrencyInput
                                    allowDecimals={false}
                                    decimalSeparator=","
                                    groupSeparator="."
                                    id={`unit_cost.${index}`}
                                    name={`tool.${index}.unit_cost`}
                                    placeholder="Enter Unit Cost"
                                    className="form-control"
                                    allowNegativeValue={false}
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    step={500}
                                    value={item?.unit_cost || 0}
                                    onValueChange={(value) => {
                                      setFieldValue(`tool.${index}.unit_cost`, value || 0)
                                    }}
                                    onBlur={() => {
                                      setFieldTouched(`tool.${index}.unit_cost`)
                                    }}
                                    disabled={isDisabled || isSubmitting}
                                    prefix="Rp. "
                                  />
                                  {errors &&
                                  errors.tool &&
                                  errors.tool[index]?.unit_cost &&
                                  touched &&
                                  touched.tool &&
                                  touched.tool[index]?.unit_cost ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.tool[index]?.unit_cost}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Line Cost
                                  </CFormLabel>
                                  <CurrencyInput
                                    allowDecimals={false}
                                    decimalSeparator=","
                                    groupSeparator="."
                                    id={`line_cost.${index}`}
                                    name={`tool.${index}.line_cost`}
                                    placeholder="Enter Line Cost"
                                    className="form-control"
                                    allowNegativeValue={false}
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    step={500}
                                    value={item?.line_cost || 0}
                                    onValueChange={(value) => {
                                      setFieldValue(`tool.${index}.line_cost`, value || 0)
                                    }}
                                    onBlur={() => {
                                      setFieldTouched(`tool.${index}.line_cost`)
                                    }}
                                    disabled={isDisabled || isSubmitting}
                                    prefix="Rp. "
                                  />
                                  {errors &&
                                  errors.tool &&
                                  errors.tool[index]?.line_cost &&
                                  touched &&
                                  touched.tool &&
                                  touched.tool[index]?.line_cost ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.tool[index]?.line_cost}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <hr />
                              {mode === 'CreateTool' && (
                                <div className="w-full">
                                  {index + 1 === values?.tool.length && (
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      className="hover:text-white"
                                      onClick={() => {
                                        arrayHelpers.push({
                                          task_id: null,
                                          tool_id: null,
                                          description: '',
                                          quantity: '',
                                          unit_cost: '',
                                          line_cost: '',
                                        })
                                      }}
                                    >
                                      <CIcon icon={cilPlus} className="me-2" /> Add New Tool
                                    </CButton>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })
                    }
                  />
                </CCardBody>
              </CCard>
              <CFooter className="form-footer">
                <div className="w-full ml-[80px] bg-white flex items-center justify-between">
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
                    type="submit"
                    disabled={!(isValid && dirty) || isDisabled || isSubmitting}
                  >
                    Submit
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

export default ToolForm
