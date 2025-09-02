import React from 'react'
import CurrencyInput from 'react-currency-input-field'
import { CButton, CFooter, CFormInput, CFormLabel, CFormSelect, CSpinner } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import { CiPaperplane } from 'react-icons/ci'
import { SelectPagination } from 'src/components/elements/select'
import { laborSchema } from '../../QRLaborMaterialsToolsSchema'
import useLaborForm from './hooks/useLaborForm'

const LaborFormSingle = ({ mode, setAction }) => {
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
      validationSchema={laborSchema}
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

              <div className="mt-3 mb-3">
                <div className="grid grid-cols-4 my-3">
                  <div className="mr-3 mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Task <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="work_order_task_id"
                      placeholder="Choose Task"
                      onChange={(value) => setFieldValue('work_order_task_id', value)}
                      value={values?.work_order_task_id}
                      parentId={selectedWorkOrderRow?.work_order_id}
                      apiController={getWorkOrderTaskLaborService}
                      valueKey="work_order_task_id"
                      labelKey="task"
                      searchKey="search"
                      isAllData
                      disabled
                      as={SelectPagination}
                    />
                    {errors?.work_order_task_id && touched?.work_order_task_id ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.work_order_task_id}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Craft <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="craft"
                      placeholder="Choose Craft"
                      onChange={(event) => setFieldValue('craft', event?.target?.value)}
                      size="md"
                      value={values?.craft}
                      as={CFormInput}
                    />
                    {errors?.craft && touched?.craft ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.craft}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Skill Level <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="skill_level"
                      placeholder="Choose Skill Level"
                      onChange={(event) => setFieldValue('skill_level', event?.target?.value)}
                      value={values?.skill_level}
                      options={['Choose Skill Level', ...optionsStatus]}
                      size="md"
                      as={CFormSelect}
                    />
                    {errors?.skill_level && touched?.skill_level ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.skill_level}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-4">
                    <CFormLabel className="text-primary fw-semibold">Vendor</CFormLabel>
                    <Field
                      name="vendor"
                      placeholder="Choose Vendor"
                      onChange={(event) => setFieldValue('vendor', event?.target?.value)}
                      size="md"
                      value={values?.vendor}
                      as={CFormInput}
                    />
                    {errors?.vendor && touched?.vendor ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.vendor}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Quantity <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="quantity"
                      placeholder="Enter Quantity"
                      onChange={(event) => setFieldValue('quantity', event?.target?.value)}
                      size="md"
                      value={values?.quantity}
                      type="number"
                      min={1}
                      as={CFormInput}
                    />
                    {errors?.quantity && touched?.quantity ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.quantity}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Labor <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="labor"
                      placeholder="Choose Labor"
                      onChange={(event) => setFieldValue('labor', event?.target?.value)}
                      size="md"
                      value={values?.labor}
                      as={CFormInput}
                    />
                    {errors?.labor && touched?.labor ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.labor}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Regular Hours <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="regular_hours"
                      placeholder="Enter Regular Hours"
                      onChange={(event) => setFieldValue('regular_hours', event?.target?.value)}
                      size="md"
                      type="number"
                      value={values?.regular_hours}
                      as={CFormInput}
                    />
                    {errors?.regular_hours && touched?.regular_hours ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.regular_hours}</div>
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
                      id="rate"
                      name="rate"
                      placeholder="Enter Rate"
                      className="form-control"
                      allowNegativeValue={false}
                      defaultValue={0}
                      decimalsLimit={2}
                      step={500}
                      value={values.rate}
                      onValueChange={(value) => setFieldValue('rate', value)}
                      onBlur={() => setFieldTouched('rate')}
                      prefix="Rp "
                    />
                    {errors?.rate && touched?.rate ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.rate}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-4">
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
                      value={(
                        (+values?.quantity || 0) *
                        Number(String(values?.rate ?? '0').replace(/,/g, '.') || 0) *
                        (+values?.regular_hours || 0)
                      ).toFixed(2)}
                      prefix="Rp "
                      disabled
                    />
                    {/* {errors?.line_cost && touched?.line_cost ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.line_cost}</div>
                      ) : null} */}
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

export default LaborFormSingle
