import {
  CButton,
  CFooter,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CSpinner,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import useGroups from './hooks/useGroups'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import { securityGroupSchema } from './schema'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'

// eslint-disable-next-line react/prop-types
const SecurityGroupGroupForm = ({ mode, setAction, setTabIndex }) => {
  const { formValue, isLoading, handleSubmit, uploadModalProps, isModalOpen, setIsModalOpen } =
    useGroups({ mode, setAction, setTabIndex })

  return (
    <Formik
      enableReinitialize
      initialValues={formValue}
      onSubmit={handleSubmit}
      validationSchema={securityGroupSchema}
    >
      {({ handleChange, isSubmitting, values, dirty, errors, touched, setFieldValue }) => {
        return (
          <Form>
            <DetailCard isLoading={isLoading}>
              {mode === 'Update' ? (
                <div>
                  <h4 className="w-font-semibold">Update Group</h4>
                  <p>Update Group Details</p>
                </div>
              ) : (
                <div>
                  <h4 className="w-font-semibold">New Group</h4>
                  <p>Fill this column to add new group</p>
                </div>
              )}

              <hr />
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-3 mb-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Group <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="security_group_code"
                      placeholder="Enter Group Code"
                      value={values?.security_group_code}
                      invalid={touched?.security_group_code && errors?.security_group_code}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                    />
                    {errors?.security_group_code && touched?.security_group_code ? (
                      <div className="text-sm text-[#e55353] mt-1">
                        {errors?.security_group_code}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-3 mb-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Group Description <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="security_group_desc"
                      placeholder="Enter Description"
                      value={values?.security_group_desc}
                      invalid={touched?.security_group_desc && errors?.security_group_desc}
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                    />
                    {errors?.security_group_desc && touched?.security_group_desc ? (
                      <div className="text-sm text-[#e55353] mt-1">
                        {errors?.security_group_desc}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-3 mb-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Start Center Template
                    </CFormLabel>
                    <Field
                      name="start_center_template"
                      placeholder="Enter Start Center Template"
                      value={values?.start_center_template}
                      invalid={touched?.start_center_template && errors?.start_center_template}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                    />
                    {errors?.start_center_template && touched?.start_center_template ? (
                      <div className="text-sm text-[#e55353] mt-1">
                        {errors?.start_center_template}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-3 mb-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Start Center Template Description
                    </CFormLabel>
                    <Field
                      name="start_center_template_desc"
                      placeholder="Enter Center Template Description"
                      value={values?.start_center_template_desc}
                      invalid={
                        touched?.start_center_template_desc && errors?.start_center_template_desc
                      }
                      onChange={handleChange}
                      size="md"
                      as={CFormTextarea}
                    />
                    {errors?.start_center_template_desc && touched?.start_center_template_desc ? (
                      <div className="text-sm text-[#e55353] mt-1">
                        {errors?.start_center_template_desc}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="flex-row">
                      <CFormLabel className="text-primary fw-semibold w-100">
                        Attachments
                      </CFormLabel>
                      <CButton
                        color="primary"
                        className="hover:text-white"
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Upload File
                      </CButton>
                    </div>
                    <UploadFileModal
                      visible={isModalOpen}
                      setVisible={setIsModalOpen}
                      setFieldValue={setFieldValue}
                      {...uploadModalProps}
                    />
                    {errors && errors.data?.attachment && touched && touched.data?.attachment ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.data.attachment}</div>
                    ) : null}
                  </div>
                  <div className="col-md-3 mb-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Independent of Other Groups?
                    </CFormLabel>
                    <div className="form-check">
                      <Field
                        name="independent_group"
                        id="independent_group"
                        value={true}
                        onChange={handleChange}
                        checked={true}
                        size="lg"
                        as={CFormCheck}
                        disabled
                      />
                      <label className="form-check-label" htmlFor="independent_group">
                        Yes
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <CFormLabel className="text-primary fw-semibold">
                      Authorize Group for All Sites?
                    </CFormLabel>
                    <div className="form-check">
                      <Field
                        name="authorized_all_sites"
                        id="authorized_all_sites"
                        value={false}
                        onChange={handleChange}
                        checked={false}
                        size="lg"
                        as={CFormCheck}
                        disabled
                      />
                      <label className="form-check-label" htmlFor="authorized_all_sites">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
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
                  disabled={isSubmitting || !dirty}
                  color="primary"
                  className="hover:text-white"
                  type="submit"
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

export default SecurityGroupGroupForm
