import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { BsTrash } from 'react-icons/bs'
import { Form, Formik, FieldArray, Field } from 'formik'
import { CButton, CCard, CCardBody, CFormInput, CFormLabel, CFooter } from '@coreui/react'
import { Select, SelectPagination } from 'src/components/elements/select'
import useLaborForm from '../hooks/useLaborForm'
import { laborSchema } from '../schema'
import CurrencyInput from 'react-currency-input-field'

const LaborForm = ({ mode, setAction, setTabIndex }) => {
  const { formValue, handleSubmit, optionsSkillLevel, isDisabled, getWoTaskDropdown, selectedRow } =
    useLaborForm({
      mode,
      setAction,
      setTabIndex,
    })

  return (
    <div className="bg-white p-4 rounded mb-5">
      <Formik
        enableReinitialize
        validationSchema={laborSchema}
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
                  <h4 className="font-semibold">{mode === 'UpdateLabor' ? 'Edit' : 'New'} Labor</h4>
                  <div>
                    <p>
                      {mode === 'UpdateLabor'
                        ? 'Update this column to edit labor'
                        : 'Fill this column to add new labor'}
                    </p>
                  </div>
                  <hr />

                  <FieldArray
                    name="labor"
                    render={(arrayHelpers) =>
                      values.labor?.map((item, index) => {
                        return (
                          <div className="my-2" key={index}>
                            {mode === 'CreateLabor' && (
                              <div className="flex">
                                <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                  <span className="text-white mb-1">{index + 1}</span>
                                </div>
                                {values.labor.length > 1 && (
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
                                    name={`labor.${index}.work_order_task_id`}
                                    placeholder="Choose Task"
                                    apiController={getWoTaskDropdown}
                                    value={item?.work_order_task_id}
                                    valueKey="work_order_task_id"
                                    labelKey="task"
                                    parentId={selectedRow.job_plan_id}
                                    onChange={(val) => {
                                      setFieldValue(`labor.${index}.work_order_task_id`, val)
                                    }}
                                    onBlur={() => {
                                      setFieldTouched(`labor.${index}.work_order_task_id`)
                                    }}
                                    searchKey="q"
                                    isDisabled={isDisabled || isSubmitting}
                                    as={SelectPagination}
                                  />
                                  {errors &&
                                  errors.labor &&
                                  errors.labor[index]?.work_order_task_id &&
                                  touched &&
                                  touched.labor &&
                                  touched.labor[index]?.work_order_task_id ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.labor[index]?.work_order_task_id}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Craft
                                  </CFormLabel>
                                  <Field
                                    name={`labor.${index}.craft`}
                                    placeholder="Choose Craft"
                                    value={item?.craft}
                                    onChange={(val) => {
                                      setFieldValue(`labor.${index}.craft`, val.target.value)
                                    }}
                                    disabled={isDisabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.labor &&
                                  errors.labor[index]?.craft &&
                                  touched &&
                                  touched.labor &&
                                  touched.labor[index]?.craft ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.labor[index]?.craft}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Skill Level
                                  </CFormLabel>
                                  <Field
                                    name={`labor.${index}.skill_level`}
                                    placeholder="Choose Skill Level"
                                    options={optionsSkillLevel}
                                    value={item?.skill_level}
                                    onChange={(val) => {
                                      setFieldValue(`labor.${index}.skill_level`, val)
                                    }}
                                    onBlur={() => {
                                      setFieldTouched(`labor.${index}.skill_level`)
                                    }}
                                    isDisabled={isDisabled || isSubmitting}
                                    as={Select}
                                  />
                                  {errors &&
                                  errors.labor &&
                                  errors.labor[index]?.skill_level &&
                                  touched &&
                                  touched.labor &&
                                  touched.labor[index]?.skill_level ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.labor[index]?.skill_level}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Vendor
                                  </CFormLabel>
                                  <Field
                                    name={`labor.${index}.vendor`}
                                    placeholder="Enter Vendor"
                                    value={item?.vendor}
                                    onChange={(val) => {
                                      setFieldValue(`labor.${index}.vendor`, val.target.value)
                                    }}
                                    disabled={isDisabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.labor &&
                                  errors.labor[index]?.vendor &&
                                  touched &&
                                  touched.labor &&
                                  touched.labor[index]?.vendor ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.labor[index]?.vendor}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Quantity
                                  </CFormLabel>
                                  <Field
                                    name={`labor.${index}.quantity`}
                                    placeholder="Enter Quantity"
                                    value={item?.quantity}
                                    onBlur={() => {
                                      setFieldTouched(`labor.${index}.quantity`)
                                    }}
                                    onChange={(val) => {
                                      setFieldValue(`labor.${index}.quantity`, val.target.value)
                                    }}
                                    type="number"
                                    min={0}
                                    disabled={isDisabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.labor &&
                                  errors.labor[index]?.quantity &&
                                  touched &&
                                  touched.labor &&
                                  touched.labor[index]?.quantity ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.labor[index]?.quantity}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Labor
                                  </CFormLabel>
                                  <Field
                                    name={`labor.${index}.labor`}
                                    placeholder="Enter Labor"
                                    value={item?.labor}
                                    onChange={(val) => {
                                      setFieldValue(`labor.${index}.labor`, val.target.value)
                                    }}
                                    disabled={isDisabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.labor &&
                                  errors.labor[index]?.labor &&
                                  touched &&
                                  touched.labor &&
                                  touched.labor[index]?.labor ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.labor[index]?.labor}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Regular Hours
                                  </CFormLabel>
                                  <Field
                                    name={`labor.${index}.regular_hours`}
                                    placeholder="Enter Regular Hours"
                                    value={item?.regular_hours}
                                    onChange={(val) => {
                                      let inputValue = val.target.value
                                      if (
                                        /^\d+([.,]\d{0,2})?$/.test(inputValue) ||
                                        inputValue === ''
                                      ) {
                                        setFieldValue(`labor.${index}.regular_hours`, inputValue)
                                      }
                                    }}
                                    onBlur={(e) => {
                                      let value = e.target.value
                                      if (value !== '') {
                                        const formattedValue = String(value).replace(',', '.')
                                        setFieldValue(
                                          `labor.${index}.regular_hours`,
                                          parseFloat(formattedValue),
                                        )
                                      }
                                    }}
                                    type="text"
                                    inputMode="decimal"
                                    disabled={isDisabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.labor &&
                                  errors.labor[index]?.regular_hours &&
                                  touched &&
                                  touched.labor &&
                                  touched.labor[index]?.regular_hours ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.labor[index]?.regular_hours}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">Rate</CFormLabel>
                                  <CurrencyInput
                                    allowDecimals={false}
                                    decimalSeparator=","
                                    groupSeparator="."
                                    id={`labor.${index}.rate`}
                                    name={`labor.${index}.rate`}
                                    placeholder="Enter Rate"
                                    className="form-control"
                                    allowNegativeValue={false}
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    step={500}
                                    value={item?.rate || 0}
                                    onValueChange={(value) => {
                                      setFieldValue(`labor.${index}.rate`, value)
                                    }}
                                    onBlur={() => setFieldTouched(`labor.${index}.rate`)}
                                    prefix="Rp "
                                  />
                                  {errors &&
                                  errors.labor &&
                                  errors.labor[index]?.rate &&
                                  touched &&
                                  touched.labor &&
                                  touched.labor[index]?.rate ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.labor[index]?.rate}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Line Cost
                                  </CFormLabel>
                                  <CurrencyInput
                                    decimalSeparator=","
                                    groupSeparator="."
                                    id={`line_cost.${index}`}
                                    name={`labor.${index}.line_cost`}
                                    placeholder="Enter Line Cost"
                                    className="form-control"
                                    allowNegativeValue={false}
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    step={500}
                                    value={(
                                      (+item?.quantity || 0) *
                                      Number(String(item?.rate ?? '0').replace(/,/g, '.') || 0) *
                                      (parseFloat(
                                        String(item?.regular_hours ?? '0').replace(',', '.'),
                                      ) || 0)
                                    ).toFixed(2)}
                                    disabled
                                    prefix="Rp. "
                                  />
                                  {errors &&
                                  errors.labor &&
                                  errors.labor[index]?.line_cost &&
                                  touched &&
                                  touched.labor &&
                                  touched.labor[index]?.line_cost ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.labor[index]?.line_cost}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <hr />
                              {mode === 'CreateLabor' && (
                                <div className="w-full">
                                  {index + 1 === values?.labor.length && (
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      className="hover:text-white"
                                      onClick={() => {
                                        arrayHelpers.push({
                                          work_order_task_id: null,
                                          craft: '',
                                          skill_level: null,
                                          vendor_id: null,
                                          quantity: '',
                                          labor: null,
                                          regular_hours: '',
                                          rate: '',
                                          line_cost: null,
                                        })
                                      }}
                                    >
                                      <CIcon icon={cilPlus} className="me-2" /> Add New labor
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

export default LaborForm
