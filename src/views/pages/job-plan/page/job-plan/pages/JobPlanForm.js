import React from 'react'
import { CButton, CFooter, CFormInput, CFormLabel, CFormTextarea, CSpinner } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import { CiPaperplane } from 'react-icons/ci'
import { Select, SelectPagination } from 'src/components/elements/select'
import { DetailCard } from 'src/components/elements/cards'
import useJobPlan from '../hooks/useJobPlan'
import { jobPlanSchema } from '../schema'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'

const JobPlanForm = ({ mode, setAction, setTabIndex }) => {
  const {
    status,
    formValue,
    handleSubmit,
    getOrganizationDropdown,
    getSiteOrganizationDropdown,
    isModalOpen,
    setIsModalOpen,
    uploadModalProps,
  } = useJobPlan({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <div className="bg-white p-4 rounded">
      <Formik
        enableReinitialize
        validationSchema={jobPlanSchema}
        initialValues={formValue}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const {
            setFieldValue,
            isSubmitting,
            isValid,
            dirty,
            setFieldTouched,
            values,
            errors,
            touched,
          } = props

          return (
            <Form>
              <DetailCard isLoading={isSubmitting}>
                <h4 className="font-semibold">
                  {mode === 'Update' ? 'Edit' : mode === 'Duplicate' ? 'Duplicate' : 'New'} Job
                  Plans
                </h4>
                <div>
                  <p>
                    {mode === 'Update'
                      ? 'Fill this column to edit job plans'
                      : mode === 'Duplicate'
                      ? 'Fill this column to duplicate new job plans'
                      : 'Fill this column to add new job plans'}
                  </p>
                </div>
                <hr />
                <div className="my-2">
                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Job Plan</CFormLabel>
                      <Field
                        name="plan_name"
                        placeholder="Enter Job Plan"
                        value={values.plan_name}
                        onChange={(val) => {
                          setFieldValue('plan_name', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.job_plan && touched && touched.plan_name ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.plan_name}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Job Plan Description
                      </CFormLabel>
                      <Field
                        name="plan_description"
                        placeholder="Enter Description"
                        value={values.plan_description}
                        onChange={(val) => {
                          setFieldValue('plan_description', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormTextarea}
                      />
                      {errors && errors.plan_description && touched && touched.plan_description ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.plan_description}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Organization</CFormLabel>
                      <Field
                        name="organization_id"
                        placeholder="Select Organization"
                        value={values.organization_id}
                        apiController={getOrganizationDropdown}
                        valueKey="organization_id"
                        labelKey="organization_name"
                        onChange={(val) => {
                          setFieldValue('organization_id', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('site_id')
                        }}
                        isDisabled={true}
                        isAllData
                        as={SelectPagination}
                      />
                      {errors && errors.organization_id && touched && touched.organization_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.organization_id}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Site</CFormLabel>
                      <Field
                        name="site_id"
                        placeholder="Enter Site"
                        value={values.site_id}
                        apiController={getSiteOrganizationDropdown}
                        valueKey="site_id"
                        labelKey="site"
                        onChange={(val) => {
                          setFieldValue('site_id', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('site_id')
                        }}
                        isAllData
                        parentId={values.organization_id?.value}
                        isDisabled={true}
                        as={SelectPagination}
                      />
                      {errors && errors.site_id && touched && touched.site_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.site_id}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Status</CFormLabel>
                      <Field
                        name="status"
                        size="sm"
                        placeholder="Choose Status"
                        options={status}
                        onChange={(val) => {
                          setFieldValue('status', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('status')
                        }}
                        isDisabled={isSubmitting}
                        as={Select}
                      />
                      {errors && errors.status && touched && touched.status ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.status}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
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
                  <div>
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
                </div>
              </CFooter>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default JobPlanForm
