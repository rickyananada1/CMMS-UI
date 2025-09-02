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
import useMaterialForm from '../hooks/useMaterialForm'
import { materialSchema } from '../schema'
import CurrencyInput from 'react-currency-input-field'

const MaterialForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    handleSubmit,
    getSparepartsService,
    getWoTaskDropdown,
    isDisabled,
    selectedRow,
  } = useMaterialForm({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <div className="bg-white p-4 rounded mb-5">
      <Formik
        enableReinitialize
        validationSchema={materialSchema}
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
                  <h4 className="font-semibold">
                    {mode === 'UpdateMaterial' ? 'Edit' : 'New'} Materials
                  </h4>
                  <div>
                    <p>
                      {mode === 'UpdateMaterial'
                        ? 'Update this column to edit material'
                        : 'Fill this column to add new material'}
                    </p>
                  </div>
                  <hr />

                  <FieldArray
                    name="material"
                    render={(arrayHelpers) =>
                      values.material?.map((item, index) => {
                        return (
                          <div className="my-2" key={index}>
                            {mode === 'CreateMaterial' && (
                              <div className="flex">
                                <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                  <span className="text-white mb-1">{index + 1}</span>
                                </div>
                                {values.material.length > 1 && (
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
                                    name={`material.${index}.work_order_task_id`}
                                    placeholder="Choose Task"
                                    apiController={getWoTaskDropdown}
                                    value={item?.work_order_task_id}
                                    valueKey="work_order_task_id"
                                    labelKey="task"
                                    parentId={selectedRow.job_plan_id}
                                    onChange={(val) => {
                                      setFieldValue(`material.${index}.work_order_task_id`, val)
                                    }}
                                    onBlur={() => {
                                      setFieldTouched(`material.${index}.work_order_task_id`)
                                    }}
                                    searchKey="q"
                                    isDisabled={isDisabled || isSubmitting}
                                    as={SelectPagination}
                                  />
                                  {errors &&
                                  errors.material &&
                                  errors.material[index]?.work_order_task_id &&
                                  touched &&
                                  touched.material &&
                                  touched.material[index]?.work_order_task_id ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.material[index]?.work_order_task_id}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">Item</CFormLabel>
                                  <Field
                                    name={`material.${index}.sparepart_id`}
                                    placeholder="Choose Item"
                                    value={item?.sparepart_id}
                                    onChange={(val) => {
                                      setFieldValue(`material.${index}.sparepart_id`, val)
                                    }}
                                    onBlur={() =>
                                      setFieldTouched(`material.${index}.sparepart_id`, true)
                                    }
                                    apiController={getSparepartsService}
                                    searchKey={'qAssetNum'}
                                    valueKey="sparepart_id"
                                    labelKey="item_num"
                                    otherKey={{
                                      description: 'description',
                                    }}
                                    isAllData
                                    isDisabled={isDisabled || isSubmitting}
                                    as={SelectPagination}
                                  />
                                  {errors &&
                                  errors.material &&
                                  errors.material[index]?.sparepart_id &&
                                  touched &&
                                  touched.material &&
                                  touched.material[index]?.sparepart_id ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.material[index]?.sparepart_id}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Description
                                  </CFormLabel>
                                  <Field
                                    name={`material.${index}.description`}
                                    placeholder="Enter Description"
                                    value={item?.sparepart_id?.description}
                                    defaultValue={item?.description}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `material.${index}.description`,
                                        val.target.value,
                                      )
                                    }}
                                    disabled
                                    as={CFormTextarea}
                                  />
                                  {errors &&
                                  errors.material &&
                                  errors.material[index]?.description &&
                                  touched &&
                                  touched.material &&
                                  touched.material[index]?.description ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.material[index]?.description}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Quantity
                                  </CFormLabel>
                                  <Field
                                    name={`material.${index}.quantity`}
                                    placeholder="Enter Quantity"
                                    value={item?.quantity}
                                    onBlur={() => {
                                      setFieldTouched(`material.${index}.quantity`)
                                    }}
                                    onChange={(val) => {
                                      setFieldValue(`material.${index}.quantity`, val.target.value)
                                    }}
                                    type="number"
                                    min={0}
                                    disabled={isDisabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.material &&
                                  errors.material[index]?.quantity &&
                                  touched &&
                                  touched.material &&
                                  touched.material[index]?.quantity ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.material[index]?.quantity}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Issue Unit
                                  </CFormLabel>
                                  <Field
                                    name={`material.${index}.issue_unit`}
                                    placeholder="Enter Issue Unit"
                                    value={item?.issue_unit}
                                    onBlur={() => {
                                      setFieldTouched(`material.${index}.issue_unit`)
                                    }}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `material.${index}.issue_unit`,
                                        val.target.value,
                                      )
                                    }}
                                    disabled={isDisabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.material &&
                                  errors.material[index]?.issue_unit &&
                                  touched &&
                                  touched.material &&
                                  touched.material[index]?.issue_unit ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.material[index]?.issue_unit}
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
                                    name={`material.${index}.unit_cost`}
                                    placeholder="Enter Unit Cost"
                                    className="form-control"
                                    allowNegativeValue={false}
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    step={500}
                                    value={item?.unit_cost || 0}
                                    onValueChange={(value) => {
                                      setFieldValue(`material.${index}.unit_cost`, value || 0)
                                    }}
                                    onBlur={() => {
                                      setFieldTouched(`material.${index}.unit_cost`)
                                    }}
                                    disabled={isDisabled || isSubmitting}
                                    prefix="Rp. "
                                  />
                                  {errors &&
                                  errors.material &&
                                  errors.material[index]?.unit_cost &&
                                  touched &&
                                  touched.material &&
                                  touched.material[index]?.unit_cost ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.material[index]?.unit_cost}
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
                                      (+item?.quantity || 0) * (+item?.unit_cost || 0)
                                    ).toFixed(2)}
                                    disabled
                                    prefix="Rp. "
                                  />
                                  {errors &&
                                  errors.material &&
                                  errors.material[index]?.line_cost &&
                                  touched &&
                                  touched.material &&
                                  touched.material[index]?.line_cost ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.material[index]?.line_cost}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col-md-3 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Storeroom
                                  </CFormLabel>
                                  <Field
                                    name={`material.${index}.store_room`}
                                    placeholder="Enter Store Room"
                                    value={item?.store_room}
                                    onBlur={() => {
                                      setFieldTouched(`material.${index}.store_room`)
                                    }}
                                    onChange={(val) => {
                                      setFieldValue(
                                        `material.${index}.store_room`,
                                        val.target.value,
                                      )
                                    }}
                                    disabled={isDisabled || isSubmitting}
                                    as={CFormInput}
                                  />
                                  {errors &&
                                  errors.material &&
                                  errors.material[index]?.store_room &&
                                  touched &&
                                  touched.material &&
                                  touched.material[index]?.store_room ? (
                                    <div className="text-sm text-[#b03434] mt-1">
                                      {errors.material[index]?.store_room}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <hr />
                              {mode === 'CreateMaterial' && (
                                <div className="w-full">
                                  {index + 1 === values?.material.length && (
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      className="hover:text-white"
                                      onClick={() => {
                                        arrayHelpers.push({
                                          task_id: null,
                                          sparepart_id: null,
                                          description: '',
                                          quantity: '',
                                          issue_unit: '',
                                          unit_cost: '',
                                          line_cost: '',
                                          store_room: null,
                                        })
                                      }}
                                    >
                                      <CIcon icon={cilPlus} className="me-2" /> Add New Material
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

export default MaterialForm
