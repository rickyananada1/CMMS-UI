import React, { Fragment } from 'react'
import { Form, Formik, Field } from 'formik'
import { CiPaperplane } from 'react-icons/ci'
import { CButton, CFormInput, CFormLabel, CFooter, CSpinner, CFormTextarea } from '@coreui/react'
import { Select, SelectPagination } from 'src/components/elements/select'
import { preventiveMaintenanceSchema } from './schema'
import UsePreventiveMaintenanceForm from './Hooks/usePreventiveMaintenanceForm'
import { DetailCard } from 'src/components/elements/cards'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'

const PreventiveMaintenanceForm = ({ mode, setAction, setTabIndex }) => {
  const {
    isModalOpen,
    setIsModalOpen,
    formValue,
    handleSubmit,
    getAssetDropdown,
    getLocationDropdown,
    getJobPlanDropdown,
    statusWorkType,
    uploadModalProps,
  } = UsePreventiveMaintenanceForm({ mode, setAction, setTabIndex })

  return (
    <div className="p-4 mb-5 bg-white rounded">
      <Formik
        enableReinitialize
        validationSchema={preventiveMaintenanceSchema}
        initialValues={formValue}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const {
            setFieldValue,
            isValid,
            dirty,
            isSubmitting,
            setFieldTouched,
            values,
            errors,
            touched,
          } = props

          return (
            <Form>
              <DetailCard isLoading={false}>
                <h4 className="font-semibold">
                  {mode === 'Update' ? 'Edit' : 'New'} Preventive Maintenance
                </h4>
                <div>
                  <p>
                    {mode === 'Update'
                      ? 'Update this column to edit preverntive maintenance'
                      : 'Fill this column to add new preventive maintenance'}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
                    Details
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="my-2">
                  <div className="row">
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Preventive Maintenance
                      </CFormLabel>
                      <Field
                        name="preventive_maintenance_name"
                        placeholder="Enter Preventive Maintenance"
                        value={values.preventive_maintenance_name}
                        onChange={(val) => {
                          setFieldValue('preventive_maintenance_name', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors &&
                      errors.preventive_maintenance_name &&
                      touched &&
                      touched.preventive_maintenance_name ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.preventive_maintenance_name}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Preventive Maintenance Description
                      </CFormLabel>
                      <Field
                        name="preventive_maintenance_description"
                        placeholder="Enter Preventive Maintenance Description"
                        value={values.preventive_maintenance_description}
                        onChange={(val) => {
                          setFieldValue('preventive_maintenance_description', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormTextarea}
                      />
                      {errors &&
                      errors.preventive_maintenance_description &&
                      touched &&
                      touched.preventive_maintenance_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.preventive_maintenance_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">Location</CFormLabel>
                      <Field
                        name="location_id"
                        placeholder="Choose Location"
                        value={values.location_id}
                        apiController={getLocationDropdown}
                        valueKey="location_id"
                        labelKey="location"
                        otherKey={{
                          description: 'location_description',
                        }}
                        onChange={(val) => {
                          setFieldValue('location_id', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('location_id')
                        }}
                        searchKey="qLocation"
                        disabled={isSubmitting}
                        as={SelectPagination}
                      />
                      {errors && errors.location_id && touched && touched.location_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.location_id}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Location Description
                      </CFormLabel>
                      <Field
                        name="location_description"
                        placeholder="Enter Location Description"
                        value={values.location_id?.description}
                        disabled
                        as={CFormTextarea}
                      />
                      {errors &&
                      errors.location_description &&
                      touched &&
                      touched.location_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">Asset</CFormLabel>
                      <Field
                        name="asset_id"
                        placeholder="Choose Asset"
                        value={values.asset_id}
                        apiController={getAssetDropdown}
                        valueKey="asset_id"
                        labelKey="asset_num"
                        otherKey={{
                          description: 'asset_description',
                        }}
                        onChange={(val) => {
                          setFieldValue('asset_id', val)
                        }}
                        onBlur={(va) => {
                          setFieldTouched('asset_id')
                        }}
                        disabled={isSubmitting}
                        as={SelectPagination}
                      />
                      {errors && errors.asset_id && touched && touched.asset_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.asset_id}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Asset Description
                      </CFormLabel>
                      <Field
                        name="asset_description"
                        placeholder="Enter Asset Description"
                        value={values.asset_id?.description}
                        disabled
                        as={CFormTextarea}
                      />
                      {errors &&
                      errors.asset_description &&
                      touched &&
                      touched.asset_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.asset_description}
                        </div>
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

                <div className="flex items-center justify-between mt-2">
                  <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
                    Work Order Information
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="my-2">
                  <div className="row">
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">Job Plan</CFormLabel>
                      <Field
                        name="job_plan_id"
                        placeholder="Choose Job Plan"
                        value={values.job_plan_id}
                        apiController={getJobPlanDropdown}
                        valueKey="job_plan_id"
                        labelKey="job_plan"
                        otherKey={{
                          description: 'plan_description',
                        }}
                        onChange={(val) => {
                          setFieldValue('job_plan_id', val)
                        }}
                        onBlur={(val) => {
                          setFieldTouched('job_plan_id')
                        }}
                        searchKey="search"
                        query={{ status: 'Active' }}
                        disabled={isSubmitting}
                        as={SelectPagination}
                      />
                      {errors && errors.job_plan_id && touched && touched.job_plan_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.job_plan_id}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Job Plan Description
                      </CFormLabel>
                      <Field
                        name="job_plan_description"
                        placeholder="Enter Job Plan Description"
                        value={values.job_plan_id?.description}
                        disabled
                        as={CFormTextarea}
                      />
                      {errors &&
                      errors.job_plan_description &&
                      touched &&
                      touched.job_plan_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.job_plan_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">Work Type</CFormLabel>
                      <Field
                        name="status"
                        placeholder="Choose Work Type"
                        value={values.status}
                        onChange={(val) => {
                          setFieldValue('status', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('status')
                        }}
                        options={statusWorkType}
                        isDisabled={isSubmitting}
                        as={Select}
                      />
                      {errors && errors.status && touched && touched.status ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.status}</div>
                      ) : null}
                    </div>
                    {mode === 'Update' && (
                      <Fragment>
                        <div className="mb-4 col-md-3">
                          <CFormLabel className="text-primary fw-semibold">
                            Work Order Status
                          </CFormLabel>
                          <Field
                            name="work_order_status"
                            value={values.work_order_status}
                            disabled
                            as={CFormInput}
                          />
                        </div>
                        <div className="mb-4 col-md-3">
                          <CFormLabel className="text-primary fw-semibold">
                            Last Start Date
                          </CFormLabel>
                          <Field
                            name="last_start_date"
                            value={values.last_start_date}
                            type="datetime-local"
                            disabled
                            as={CFormInput}
                          />
                        </div>
                      </Fragment>
                    )}
                    {mode === 'Update' && (
                      <Fragment>
                        <div className="mb-4 col-md-3">
                          <CFormLabel className="text-primary fw-semibold">
                            Last Completion Date
                          </CFormLabel>
                          <Field
                            name="last_completion_date"
                            placeholder="Choose Last Completion Date"
                            value={values.last_completion_date}
                            onChange={(val) => {
                              setFieldValue('last_completion_date', val.target.value)
                            }}
                            disabled={true}
                            type="datetime-local"
                            as={CFormInput}
                          />
                          {errors &&
                          errors.last_completion_date &&
                          touched &&
                          touched.last_completion_date ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.last_completion_date}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4 col-md-3">
                          <CFormLabel className="text-primary fw-semibold">
                            Earliest Next Date
                          </CFormLabel>
                          <Field
                            name="earliest_next_date"
                            placeholder="Choose Earlies Next Date"
                            value={values.earliest_next_date}
                            onChange={(val) => {
                              setFieldValue('earliest_next_date', val.target.value)
                            }}
                            disabled={true}
                            type="datetime-local"
                            as={CFormInput}
                          />
                          {errors &&
                          errors.earliest_next_date &&
                          touched &&
                          touched.earliest_next_date ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.earliest_next_date}
                            </div>
                          ) : null}
                        </div>
                      </Fragment>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
                    Resource Information
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="my-2">
                  <div className="row">
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">GL Account</CFormLabel>
                      <Field
                        name="gl_account"
                        placeholder="Choose GL Account"
                        value={values.gl_account}
                        onChange={(val) => {
                          setFieldValue('gl_account', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.gl_account && touched && touched.gl_account ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.gl_account}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        GL Account Description
                      </CFormLabel>
                      <Field
                        name="gl_account_desc"
                        placeholder="Enter Gl Description"
                        value={values.gl_account_desc}
                        onChange={(val) => {
                          setFieldValue('gl_account_desc', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormTextarea}
                      />
                      {errors && errors.gl_account_desc && touched && touched.gl_account_desc ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.gl_account_desc}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">Storeroom Site</CFormLabel>
                      <Field
                        name="storeroom_site"
                        placeholder="Enter Storeroom Site"
                        value={values.storeroom_site}
                        onChange={(val) => {
                          setFieldValue('storeroom_site', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.storeroom_site && touched && touched.storeroom_site ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.storeroom_site}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Storeroom Site Description
                      </CFormLabel>
                      <Field
                        name="storeroom_desc"
                        placeholder="Enter Storeroom Site Description"
                        value={values.storeroom_desc}
                        onChange={(val) => {
                          setFieldValue('storeroom_desc', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormTextarea}
                      />
                      {errors && errors.storeroom_desc && touched && touched.storeroom_desc ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.storeroom_desc}</div>
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
                    {process.env.REACT_APP_HIDE_FEATURE !== 'true' && (
                      <CButton
                        onClick={() => {
                          setTabIndex(2)
                          setAction('Read')
                          setTimeout(() => {
                            setAction('Create')
                          }, 1000)
                        }}
                        color="primary"
                        variant="outline"
                        className="mr-2 hover:text-white"
                        type="button"
                      >
                        <div className="flex items-center justify-center">
                          <>Next</>
                        </div>
                      </CButton>
                    )}
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

export default PreventiveMaintenanceForm
