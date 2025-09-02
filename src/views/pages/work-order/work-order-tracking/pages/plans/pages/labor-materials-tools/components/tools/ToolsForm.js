import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CFooter,
  CFormInput,
  CFormLabel,
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
import { SelectPagination } from 'src/components/elements/select'
import useToolsForm from '../../hooks/useToolsForm'

const ToolsForm = ({ mode, setAction }) => {
  const { initialValue, textFields, handleAddTextField, handleRemoveTextField } = useToolsForm()

  return (
    <Formik initialValues={initialValue}>
      {({ setFieldValue, values, isSubmitting }) => {
        return (
          <Fragment>
            <Form>
              <CTable>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>
                      <h4 className="text-body-bold">
                        {(mode === 'Create' && 'New Tools') || 'Edit Tools'}
                      </h4>
                      <p className="text-neutral-text-disabled">
                        {(mode === 'Create' && 'Fill this column to add New Tools') ||
                          'Fill this column to add Edit Tools'}
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
                                  name="task_id"
                                  placeholder="Choose Task"
                                  onChange={(val) => {
                                    setFieldValue('task_id', val.target.value)
                                  }}
                                  size="md"
                                  required
                                  value={values?.target_start}
                                  as={SelectPagination}
                                  type="date"
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Tool <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="task_id"
                                  placeholder="Choose Tool"
                                  onChange={(val) => {
                                    setFieldValue('task_id', val.target.value)
                                  }}
                                  size="md"
                                  required
                                  value={values?.target_start}
                                  as={SelectPagination}
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Description
                                </CFormLabel>
                                <Field
                                  name="task_id"
                                  placeholder="Enter Description"
                                  onChange={(val) => {
                                    setFieldValue('task_id', val.target.value)
                                  }}
                                  size="md"
                                  required
                                  value={values?.target_start}
                                  as={CFormInput}
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Quantity <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="task_id"
                                  placeholder="Enter Quantity"
                                  onChange={(val) => {
                                    setFieldValue('task_id', val.target.value)
                                  }}
                                  size="md"
                                  required
                                  value={values?.target_start}
                                  as={CFormInput}
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Unit Cost <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="task_id"
                                  placeholder="Enter Unit Cost"
                                  onChange={(val) => {
                                    setFieldValue('task_id', val.target.value)
                                  }}
                                  size="md"
                                  required
                                  value={values?.target_start}
                                  as={CFormInput}
                                />
                              </div>
                              <div className="mr-3  mt-4">
                                <CFormLabel className="text-primary fw-semibold">
                                  Line Cost <span className="text-red-main">*</span>
                                </CFormLabel>
                                <Field
                                  name="task_id"
                                  placeholder="Enter Line Cost"
                                  onChange={(val) => {
                                    setFieldValue('task_id', val.target.value)
                                  }}
                                  size="md"
                                  required
                                  value={values?.target_start}
                                  as={CFormInput}
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
                <CButton
                  color="primary"
                  variant="outline"
                  onClick={handleAddTextField}
                  disabled={textFields.length === 2}
                >
                  <div className="flex items-center">
                    <CIcon icon={cilPlus} className="me-2" />
                    <span>Add Tools</span>
                  </div>
                </CButton>
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
                <CButton color="primary" className="hover:text-white" type="submit">
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

export default ToolsForm
