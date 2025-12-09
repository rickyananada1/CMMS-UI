import { CButton, CFooter, CFormInput, CFormLabel, CFormTextarea, CSpinner } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import useMeters from './hooks/useMeters'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import { Select, SelectPagination } from 'src/components/elements/select'
import { metersSchema } from './schema'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'
import InputFile from 'src/components/elements/input/InputFile'
import UploadSummaryModal from 'src/views/pages/upload-file/components/UploadSummaryModal'

// eslint-disable-next-line react/prop-types
const MetersForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    isLoading,
    handleSubmit,
    getDomainsService,
    getReadingTypesService,
    getUomsService,
    meter_type_options,
    isModalOpen,
    setIsModalOpen,
    uploadModalProps,
    uploadFiles,
    files,
    isUploadSummaryModalOpen,
    setIsUploadSummaryModalOpen,
    uploadSummary,
    handleRetryUpload,
    handleOK,
    isNewFiles,
  } = useMeters({
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
        validationSchema={metersSchema}
      >
        {({
          handleChange,
          setFieldValue,
          errors,
          isValid,
          dirty,
          isSubmitting,
          values,
          touched,
        }) => {
          return (
            <Form>
              <DetailCard isLoading={isLoading}>
                {mode === 'Update' ? (
                  <div>
                    <h4 className="w-font-semibold">Edit Meter</h4>
                    <p>Update Meter Details</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="w-font-semibold">New Meter</h4>
                    <p>Fill this column to add new meter</p>
                  </div>
                )}
                <hr />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <CFormLabel className="text-primary fw-semibold">
                        Meter <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="meter_name"
                        placeholder="Enter Meter"
                        value={values?.meter_name}
                        invalid={touched.meter_name && errors.meter_name}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                      />
                      {errors.meter_name && touched.meter_name ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.meter_name}</div>
                      ) : null}
                    </div>
                    <div className="col">
                      <CFormLabel className="text-primary fw-semibold">
                        Meter Description <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="meter_description"
                        placeholder="Enter Meter Description"
                        value={values?.meter_description}
                        invalid={touched.meter_description && errors.meter_description}
                        onChange={handleChange}
                        size="md"
                        as={CFormTextarea}
                      />
                      {errors.meter_description && touched.meter_description ? (
                        <div className="text-sm text-[#e55353] mt-1">
                          {errors.meter_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="col">
                      <CFormLabel className="text-primary fw-semibold">
                        Meter Type <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="meter_type"
                        placeholder="Enter Meter Type"
                        value={values?.meter_type}
                        onChange={(val) => {
                          setFieldValue(`meter_type`, val)
                        }}
                        size="md"
                        options={meter_type_options}
                        as={Select}
                      />
                      {errors.meter_type && touched.meter_type ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.meter_type}</div>
                      ) : null}
                    </div>
                    <div className="col">
                      <CFormLabel className="text-primary fw-semibold">
                        Meter Type Description
                      </CFormLabel>
                      <Field
                        name="meter_type_description"
                        placeholder="No Description"
                        value={values?.meter_type?.description}
                        onChange={handleChange}
                        disabled
                        size="md"
                        as={CFormTextarea}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Reading Type{' '}
                        {values?.meter_type?.value === 'continuous' && (
                          <span className="text-red-main">*</span>
                        )}
                      </CFormLabel>
                      <Field
                        name="meter_reading_type_id"
                        placeholder="Select Reading Type"
                        apiController={getReadingTypesService}
                        value={values?.meter_reading_type_id}
                        valueKey="meter_reading_type_id"
                        labelKey="value"
                        isAllData
                        onChange={(val) => {
                          setFieldValue(`meter_reading_type_id`, val)
                        }}
                        size="md"
                        as={SelectPagination}
                      />
                      {errors.meter_reading_type_id && touched.meter_reading_type_id ? (
                        <div className="text-sm text-[#e55353] mt-1">
                          {errors.meter_reading_type_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-sm-3">
                      <CFormLabel className="text-primary fw-semibold">
                        Reading Type Description
                      </CFormLabel>
                      <Field
                        name="meter_reading_type_description"
                        placeholder="No Description"
                        value={values?.meter_reading_type_id?.description}
                        onChange={handleChange}
                        size="md"
                        disabled
                        as={CFormTextarea}
                      />
                    </div>
                    <div className="col-sm-3">
                      <div className="flex-row">
                        <CFormLabel className="text-primary fw-semibold w-100">
                          Attachments
                        </CFormLabel>
                        <InputFile setIsModalOpen={setIsModalOpen} files={files} />
                      </div>
                      <UploadFileModal
                        visible={isModalOpen}
                        setVisible={setIsModalOpen}
                        setFieldValue={setFieldValue}
                        uploadFiles={uploadFiles}
                        {...uploadModalProps}
                      />
                      {errors && errors.data?.attachment && touched && touched.data?.attachment ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.data.attachment}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <CFormLabel className="text-primary fw-semibold">Domain</CFormLabel>
                      <Field
                        name="meter_domain_id"
                        placeholder="Select Domain"
                        apiController={getDomainsService}
                        value={values?.meter_domain_id}
                        valueKey="meter_domain_id"
                        labelKey="domain"
                        isAllData
                        onChange={(val) => {
                          setFieldValue(`meter_domain_id`, val)
                        }}
                        size="md"
                        isLocalSearch
                        as={SelectPagination}
                      />
                      {errors.meter_domain_id && touched.meter_domain_id ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.meter_domain_id}</div>
                      ) : null}
                    </div>
                    <div className="col">
                      <CFormLabel className="text-primary fw-semibold">
                        Domain Description
                      </CFormLabel>
                      <Field
                        name="domain_description"
                        placeholder="No Description"
                        value={values?.meter_domain_id?.description}
                        disabled
                        size="md"
                        as={CFormTextarea}
                      />
                    </div>
                    <div className="col">
                      <CFormLabel className="text-primary fw-semibold">
                        Unit of Measure <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="uom_id"
                        placeholder="Select Unit of Measure"
                        apiController={getUomsService}
                        value={values?.uom_id}
                        valueKey="uom_id"
                        labelKey="uom_name"
                        isAllData
                        onChange={(val) => {
                          setFieldValue(`uom_id`, val)
                        }}
                        size="md"
                        isLocalSearch
                        as={SelectPagination}
                      />
                      {errors.uom_id && touched.uom_id ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.uom_id}</div>
                      ) : null}
                    </div>
                    <div className="col">
                      <CFormLabel className="text-primary fw-semibold">
                        Unit of Meassure Description
                      </CFormLabel>
                      <Field
                        name="uom_description"
                        placeholder="No Description"
                        value={values?.uom_id?.description}
                        onChange={handleChange}
                        size="md"
                        disabled
                        as={CFormTextarea}
                      />
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
                    disabled={isSubmitting || (!dirty && !isNewFiles)}
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
      <UploadSummaryModal
        visible={isUploadSummaryModalOpen}
        setVisible={setIsUploadSummaryModalOpen}
        successfulUploads={uploadSummary.successfulUploads}
        failedUploads={uploadSummary.failedUploads}
        uploadFiles={uploadFiles}
        onRetryUpload={handleRetryUpload}
        onOK={handleOK}
      />
    </>
  )
}

export default MetersForm
