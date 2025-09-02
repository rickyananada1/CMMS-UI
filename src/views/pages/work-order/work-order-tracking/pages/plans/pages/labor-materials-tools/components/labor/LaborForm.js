import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CFooter,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { Fragment } from 'react'
import { BsTrash } from 'react-icons/bs'
import { CiPaperplane } from 'react-icons/ci'
// import { DetailCard } from 'src/components/elements/cards'
import { SelectPagination } from 'src/components/elements/select'
import useLaborForm from '../../hooks/labor/useLaborForm'
import useTaskForWorkOrderList from '../../../task-for-wo/hooks/useTaskForWorkOrderList'

const LaborForm = ({ mode, setAction }) => {
  const {
    textFields,
    handleAddTextField,
    handleRemoveTextField,
    setChange,
    setField,
    handleCreateLabor,
    optionsStatus,
  } = useLaborForm({ setAction })
  const { getTaskForWorkOrder_ } = useTaskForWorkOrderList()

  return (
    <Formik initialValues={textFields}>
      {({ setFieldValue, values, isSubmitting }) => {
        return (
          <Fragment>
            <Form>
              <CTable>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>
                      <h4 className="text-body-bold">
                        {(mode === 'Create' && 'New Labor') || 'Edit Labor'}
                      </h4>
                      <p className="text-neutral-text-disabled">
                        {(mode === 'Create' && 'Fill this column to add New Labor') ||
                          'Fill this column to edit Labor'}
                      </p>
                    </CTableDataCell>
                  </CTableRow>
                  {textFields.map((textField, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell scope="row">
                        <div className="mt-3">
                          <div className="flex">
                            <div className="bg-primary-main rounded w-[35px] h-[40px] p-2 text-center mr-3">
                              <span className="text-white mb-1">{index + 1}</span>
                            </div>
                            <CButton
                              color="danger"
                              variant="outline"
                              className="hover:text-white"
                              onClick={() => handleRemoveTextField(index)}
                            >
                              <BsTrash />
                            </CButton>
                          </div>
                          <div className="mb-3">
                            <div className="grid grid-cols-4 my-3">
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Task <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="work_order_task_id"
                                  placeholder="Choose Task"
                                  onChange={(event) => setField(index, 'work_order_task_id', event)}
                                  size="md"
                                  required
                                  value={values?.work_order_task_id}
                                  as={SelectPagination}
                                  type="date"
                                  apiController={getTaskForWorkOrder_}
                                  valueKey="work_order_task_id"
                                  labelKey="task"
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Craft <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="craft"
                                  placeholder="Choose Craft"
                                  onChange={(event) => setChange(index, event)}
                                  size="md"
                                  required
                                  value={values?.craft}
                                  as={CFormInput}
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Skill Level <span className="text-red-main">*</span>
                                </CFormLabel>
                                {/* <Field
                                  name="skill_level"
                                  placeholder="Choose Skill Level"
                                  onChange={(val) => {
                                    setFieldValue('skill_level', val.target.value)
                                  }}
                                  size="md"
                                  required
                                  value={values?.skill_level}
                                  as={SelectPagination}
                                /> */}
                                <CFormSelect
                                  name="skill_level"
                                  placeholder="Choose Skill Level"
                                  onChange={(event) => setChange(index, event)}
                                  value={textFields?.skill_level}
                                  options={['Choose Status', ...optionsStatus]}
                                  size="md"
                                  required
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Vendor <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="vendor"
                                  placeholder="Choose Vendor"
                                  onChange={(event) => setChange(index, event)}
                                  size="md"
                                  required
                                  value={values?.vendor}
                                  as={CFormInput}
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Quantity <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="quantity"
                                  placeholder="Enter Quantity"
                                  onChange={(event) => setChange(index, event)}
                                  size="md"
                                  required
                                  value={values?.quantity}
                                  as={CFormInput}
                                  type="number"
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Labor <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="labor"
                                  placeholder="Choose Labor"
                                  onChange={(event) => setChange(index, event)}
                                  size="md"
                                  required
                                  value={values?.labor}
                                  as={CFormInput}
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Regular Hours <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="regular_hours"
                                  placeholder="Enter Regular Hours"
                                  onChange={(event) => setChange(index, event)}
                                  size="md"
                                  required
                                  value={values?.regular_hours}
                                  as={CFormInput}
                                  type="number"
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Rate <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="rate"
                                  placeholder="Enter Rate"
                                  onChange={(event) => setChange(index, event)}
                                  size="md"
                                  required
                                  value={values?.rate}
                                  as={CFormInput}
                                  type="number"
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Line Cost <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="line_cost"
                                  placeholder="Enter Line Cost"
                                  onChange={(event) => setChange(index, event)}
                                  size="md"
                                  required
                                  value={values?.line_cost}
                                  as={CFormInput}
                                  type="number"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div className="mb-3">
                {textFields.length === 2 ? (
                  <CButton color="primary" variant="outline" disabled>
                    <div className="flex items-center">
                      <CIcon icon={cilPlus} className="me-2" />
                      <span>Add Labor</span>
                    </div>
                  </CButton>
                ) : (
                  <CButton color="primary" variant="outline" onClick={handleAddTextField}>
                    <div className="flex items-center">
                      <CIcon icon={cilPlus} className="me-2" />
                      <span>Add Labor</span>
                    </div>
                  </CButton>
                )}
              </div>
            </Form>
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
                  onClick={handleCreateLabor}
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
          </Fragment>
        )
      }}
    </Formik>
  )
}

export default LaborForm
