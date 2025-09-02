import React from 'react'
import CurrencyInput from 'react-currency-input-field'
import { CButton, CFooter, CFormInput, CFormLabel, CSpinner } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import { CiPaperplane } from 'react-icons/ci'
import { SelectPagination } from 'src/components/elements/select'
import useMaterialsForm from './hooks/useMaterialsForm'
import { materialsSchema } from '../../QRLaborMaterialsToolsSchema'

const MaterialsFormSingle = ({ mode, setAction }) => {
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
      validationSchema={materialsSchema}
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

              <div className="mt-3 mb-3">
                <div className="grid grid-cols-4 my-3">
                  <div className="mr-3 mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Task <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="work_order_task_id"
                      placeholder="Choose Task"
                      parentId={selectedWorkOrderRow?.work_order_id}
                      apiController={getWorkOrderTaskMaterialsService}
                      onChange={(event) => setFieldValue('work_order_task_id', event)}
                      valueKey="work_order_task_id"
                      labelKey="task"
                      searchKey={'search'}
                      value={values?.work_order_task_id}
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
                      Item <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="sparepart_id"
                      placeholder="Choose Item"
                      onChange={(value) => setFieldValue('sparepart_id', value)}
                      value={values?.sparepart_id}
                      apiController={getSparepartsService}
                      searchKey={'qAssetNum'}
                      valueKey="sparepart_id"
                      labelKey="item_num"
                      isAllData
                      as={SelectPagination}
                    />
                    {errors?.sparepart_id && touched?.sparepart_id ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.sparepart_id}</div>
                    ) : null}
                  </div>
                  <div className="mr-3 mt-4">
                    <CFormLabel className="text-primary fw-semibold">Description</CFormLabel>
                    <Field
                      name="description"
                      placeholder="Enter description"
                      value={values?.sparepart_id?.description}
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
                  <div className="mr-3 mt-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Issue Unit <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="issue_unit"
                      placeholder="Enter Issue Unit"
                      onChange={(event) => setFieldValue('issue_unit', event?.target?.value)}
                      value={values?.issue_unit}
                      as={CFormInput}
                    />
                    {errors?.issue_unit && touched?.issue_unit ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.issue_unit}</div>
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
                      value={((+values?.quantity || 0) * (+values?.unit_cost || 0)).toFixed(2)}
                      prefix="Rp "
                      disabled
                    />
                  </div>
                  <div className="mr-3 mt-4">
                    <CFormLabel className="text-primary fw-semibold">Store Room</CFormLabel>
                    <Field
                      name="store_room"
                      placeholder="Enter Store Room"
                      onChange={(event) => setFieldValue('store_room', event?.target?.value)}
                      size="md"
                      value={values?.store_room}
                      as={CFormInput}
                    />
                    {errors?.store_room && touched?.store_room ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.store_room}</div>
                    ) : null}
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
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default MaterialsFormSingle
