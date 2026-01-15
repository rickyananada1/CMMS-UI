/* eslint-disable */
/* prettier-ignore-start */
import React from 'react'
import {
  CFormLabel,
  CCol,
  CRow,
  CFooter,
  CButton,
  CSpinner,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { cilPlus } from '@coreui/icons'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import { Field, Form, Formik, FieldArray } from 'formik'
import Editor from '../../../../../../../src/components/editor/EditorTiptap'
import { Select, SelectPagination } from 'src/components/elements/select'
import useFailurreDefends from './hooks/useFailurreDefends'
import { faTaskSchema } from './schema'

const FailureDefendsForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    hasExistingData,
    isLoading,
    handleSubmit,
    handleOK,
    failure_defends_statuses,
    getMaintenance,
    selectedTask,
    data,
    disableEdit,
    disableEdited,
  } = useFailurreDefends({
    mode,
    setAction,
    setTabIndex,
  })


  return (
    <>
      <Formik
        enableReinitialize
        initialValues={formValue}
        onSubmit={handleSubmit}
        // validationSchema={faTaskSchema}
        validateOnMount
        validateOnChange
        validateOnBlur
      >
        {({
          handleChange,
          setFieldValue,
          setFieldTouched,
          errors,
          isValid,
          dirty,
          isSubmitting,
          values,
          touched,
        }) => {
          const actualMode = hasExistingData ? 'Change' : mode

          return (
            <Form>
              <DetailCard isLoading={isLoading}>
                {(actualMode === 'Update' || actualMode === 'Change') ? (
                  <div>
                    <h4 className="w-font-semibold">Update Failure Defense Task</h4>
                    <div>Update Failure Defense Task</div>
                  </div>
                ) : (
                  <div>
                    <h4 className="w-font-semibold">New Failure Defense Task</h4>
                    <div>Fill this column to add new Failure Defense Task</div>
                  </div>
                )}
                <FieldArray
                  name="data"
                  render={(arrayHelpers) => (
                    <div>
                      {Array.isArray(values.data) && values.data.map((item, index) => {
                        return (
                          <div className='mt-4'>
                            <div className='flex flex-start gap-2'>
                              <div className='border rounded bg-[#2671D9] text-[#ffffff] w-[52px] p-[12px] text-center mb-3'>
                                {index + 1}
                              </div >
                              <Field name={`data.${index}.fdt_num`}>
                                {({ form }) => {
                                  if (!form.values.data[index]?.fdt_num) {
                                    form.setFieldValue(`data.${index}.fdt_num`, index + 1)
                                  }
                                  return (
                                    <input type="hidden" />
                                  )
                                }}
                              </Field>
                              {values.data.length > 1 && (
                                <button type="button" onClick={() => {
                                  arrayHelpers.remove(index)
                                  const updated = values.data
                                    .filter((_, i) => i !== index)
                                    .map((d, i) => ({
                                      ...d,
                                      fdt_num: i + 1,
                                    }))
                                  setFieldValue('data', updated)
                                }} style={{ border: '1px solid red' }} className='rounded bg-white w-[52px] h-[49px] p-[10px] flex items-center justify-center'>
                                  <CIcon icon={cilTrash} customClassName="w-5 h-5 text-red-main" />
                                </button>
                              )}
                            </div>
                            <CRow className="mb-3">
                              <CCol>
                                <CFormLabel className="text-primary fw-semibold">
                                  Failure Failure Defense Task 
                                </CFormLabel>
                                <div>
                                  <Editor
                                    name={`data[${index}].task`}
                                    value={values?.data?.[index]?.task ?? ''}
                                    valueKey="fdt_num"
                                    labelKey="task"
                                    onChange={(val) =>
                                      setFieldValue(`data[${index}].task`, val)
                                    }
                                    onBlur={() =>
                                      setFieldTouched(`data[${index}].task`, true)
                                    }
                                    size="md"
                                  />
                                  {errors.fmea_desc && touched.fmea_desc ? (
                                    <div className="text-sm text-[#e55353] mt-1">{errors.fmea_desc}</div>
                                  ) : null}
                                </div>
                              </CCol>
                            </CRow>
                            <CRow className="mb-3">
                              <CCol>
                                <CFormLabel className="text-primary fw-semibold">
                                  Craft (M\L\K)
                                </CFormLabel>
                                <Field
                                  name={`data[${index}].craft`}
                                  placeholder="Enter Craft (M\L\K)"
                                  value={item?.craft}
                                  invalid={touched.craft && errors.craft}
                                  onChange={handleChange}
                                  size="md"
                                  as={CFormInput}
                                />
                              </CCol>
                              <CCol>
                                <CFormLabel className="text-primary fw-semibold">
                                  Maintenance Type
                                </CFormLabel>
                                <Field
                                  name={`data[${index}].maintenance_type`}
                                  placeholder="Choose Maintenance Type"
                                  value={
                                    item?.maintenance_id
                                      ? { value: item.maintenance_id, label: item.maintenance_type }
                                      : null
                                  }
                                  apiController={getMaintenance}
                                  onChange={(opt) => {
                                    if (!opt?.value) return

                                    setFieldValue(`data.${index}.maintenance_id`, opt.value)
                                    setFieldValue(`data.${index}.maintenance_type`, opt.label)
                                  }}
                                  onBlur={() => {
                                    setFieldTouched(`data.${index}.maintenance_type`, true)
                                    setFieldTouched(`data.${index}.maintenance_id`, true)
                                  }}
                                  valueKey="id"
                                  labelKey="maintenance_type"
                                  size="md"
                                  as={SelectPagination}
                                />

                              </CCol>
                              <CCol>
                                <CFormLabel className="text-primary fw-semibold">
                                  Frequency
                                </CFormLabel>
                                <Field
                                  name={`data[${index}].frequency`}
                                  placeholder="Enter frequency"
                                  value={values?.data?.[index]?.frequency ?? ''}
                                  invalid={touched?.data?.[index]?.frequency && errors?.data?.[index]?.frequency}
                                  as={CFormInput}
                                  type="number"
                                  min="0"
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    setFieldValue(`data[${index}].frequency`, value);
                                  }}
                                />
                                {errors.description && touched.description ? (
                                  <div className="text-sm text-[#e55353] mt-1">{errors.description}</div>
                                ) : null}
                              </CCol>
                              <CCol>
                                <CFormLabel className="text-primary fw-semibold">
                                  Frequency Unit
                                </CFormLabel>
                                <Field
                                  name={`data[${index}].frequency_unit`}
                                  placeholder="Choose Frequency Unit"
                                  value={
                                    item?.frequency_unit
                                      ? failure_defends_statuses.find(
                                        opt => opt.value === item.frequency_unit
                                      )
                                      : null
                                  }
                                  onChange={(val) => {
                                    setFieldValue(`data.${index}.frequency_unit`, val?.value ?? '')
                                  }}
                                  size="md"
                                  as={Select}
                                  options={failure_defends_statuses}
                                  isLocalSearch
                                />
                              </CCol>
                            </CRow>
                            <CRow className="mb-3">
                              <CCol>
                                <CFormLabel className="text-primary fw-semibold">
                                  Job Task Instruction
                                </CFormLabel>
                                <div>
                                  <Editor
                                    name={`data[${index}].job_task`}
                                    value={values?.data?.[index]?.job_task ?? ''}
                                    valueKey="fdt_num"
                                    labelKey="job_task"
                                    onChange={(val) =>
                                      setFieldValue(`data[${index}].job_task`, val)
                                    }
                                    onBlur={() =>
                                      setFieldTouched(`data[${index}].job_task`, true)
                                    }
                                    size="md"
                                  />
                                  {errors.fmea_desc && touched.fmea_desc ? (
                                    <div className="text-sm text-[#e55353] mt-1">{errors.fmea_desc}</div>
                                  ) : null}
                                </div>
                              </CCol>
                            </CRow>
                            <CRow className="mb-3">
                              <CCol>
                                <CFormLabel className="text-primary fw-semibold">
                                  Post Maintenance Testing
                                </CFormLabel>
                                <div>
                                  <Editor
                                    name={`data[${index}].post_maintenance_test`}
                                    value={values?.data?.[index]?.post_maintenance_test ?? ''}
                                    valueKey="fdt_num"
                                    labelKey="post_maintenance_test"
                                    onChange={(val) =>
                                      setFieldValue(`data[${index}].post_maintenance_test`, val)
                                    }
                                    onBlur={() =>
                                      setFieldTouched(`data[${index}].post_maintenance_test`, true)
                                    }
                                    size="md"
                                  />
                                  {errors.fmea_desc && touched.fmea_desc ? (
                                    <div className="text-sm text-[#e55353] mt-1">{errors.fmea_desc}</div>
                                  ) : null}
                                </div>
                              </CCol>
                            </CRow>
                            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                          </div>
                        )
                      })}
                      <div className="w-full">
                        {/* {index + 1 === values.meter_in_groups.length && ( */}
                        <CButton
                          color="primary"
                          variant="outline"
                          className="hover:text-white"
                          onClick={() => {
                            arrayHelpers.push({ fdt_num: null })
                          }}
                        >
                          <CIcon icon={cilPlus} className="me-2" /> Add New Failure Defense Task
                        </CButton>
                        {/* )} */}
                      </div>
                    </div>
                  )}
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
                    disabled={isSubmitting || !dirty || !isValid}
                    color="primary"
                    className="hover:text-white"
                    type="submit"
                  >
                    <div className="flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          Submit
                          <CSpinner className="ms-2" color="light" size="sm" />
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
    </>
  )
}

export default FailureDefendsForm
