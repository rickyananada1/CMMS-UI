import React from 'react'
import { Field, Formik, Form } from 'formik'
import {
  CButton,
  CFooter,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CSpinner,
} from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import useAssetsWorkForm from './hooks/useAssetsWorkForm'
import { assetsWorkSchema } from './schema/assetsWorkSchema'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'
import InputFile from 'src/components/elements/input/InputFile'
import UploadSummaryModal from 'src/views/pages/upload-file/components/UploadSummaryModal'

const AssetsWorkForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    optionsStatus,
    optionsWorkPriority,
    handleSubmit,
    isModalOpen,
    setIsModalOpen,
    handleModalClose,
    uploadModalProps,
    uploadFiles,
    files,
    isUploadSummaryModalOpen,
    setIsUploadSummaryModalOpen,
    uploadSummary,
    handleRetryUpload,
    handleOK,
    isNewFiles,
  } = useAssetsWorkForm({
    mode,
    setAction,
    setTabIndex,
  })
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={formValue}
        validationSchema={assetsWorkSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched, isValid, dirty, isSubmitting, values }) => {
          return (
            <Form className="position-relative">
              <DetailCard className="p-0 mb-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="w-full text-body-bold">
                      {mode === 'Update' ? 'Edit' : 'Create'} Work Order
                    </h4>
                    <div className="flex">
                      <p>
                        <span className="text-neutral-text-disabled">
                          {mode === 'Update' ? 'Update' : 'Create'} this column to add Work Order
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="py-1" />

                <div className="my-4">
                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Work Order Code <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name={`work_order_code`}
                        placeholder="Enter Work Order Code"
                        value={values.work_order_code}
                        onChange={(event) => {
                          setFieldValue(`work_order_code`, event?.target?.value)
                        }}
                        as={CFormInput}
                      />
                      {errors?.work_order_code && touched?.work_order_code ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.work_order_code}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Description <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name={`description`}
                        placeholder="Enter Description"
                        value={values.description}
                        onChange={(event) => {
                          setFieldValue(`description`, event?.target?.value)
                        }}
                        as={CFormTextarea}
                      />
                      {errors?.description && touched?.description ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.description}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Work Priority <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name={`work_priority`}
                        placeholder="Enter Work Priority"
                        options={['Choose Work Priority', ...optionsWorkPriority]}
                        value={values.work_priority}
                        onChange={(event) => {
                          setFieldValue(`work_priority`, event?.target?.value)
                        }}
                        as={CFormSelect}
                      />
                      {errors?.work_priority && touched?.work_priority ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.work_priority}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Status <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name={`status`}
                        placeholder="Enter Status"
                        options={['Choose Work Priority', ...optionsStatus]}
                        value={values.status}
                        onChange={(event) => {
                          setFieldValue(`status`, event?.target?.value)
                        }}
                        disabled
                        as={CFormSelect}
                      />
                      {errors?.status && touched?.status ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.status}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Scheduled Start <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name={`scheduled_start`}
                        placeholder="Choose Scheduled Start"
                        type="datetime-local"
                        value={values.scheduled_start}
                        min={new Date().toISOString().slice(0, 16)}
                        onChange={(event) => {
                          setFieldValue(`scheduled_start`, event?.target?.value)
                        }}
                        as={CFormInput}
                      />
                      {errors?.scheduled_start && touched?.scheduled_start ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.scheduled_start}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Scheduled Finish <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name={`scheduled_finish`}
                        placeholder="Choose Scheduled Finish"
                        type="datetime-local"
                        min={values?.scheduled_start}
                        disabled={!values?.scheduled_start}
                        value={values.scheduled_finish}
                        onChange={(event) => {
                          setFieldValue(`scheduled_finish`, event?.target?.value)
                        }}
                        as={CFormInput}
                      />
                      {errors?.scheduled_finish && touched?.scheduled_finish ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.scheduled_finish}</div>
                      ) : null}
                    </div>
                    <div className="mb-4 col-md-3">
                      <div className="flex-row">
                        <CFormLabel className="text-primary fw-semibold w-100">
                          Attachments
                        </CFormLabel>
                        <InputFile setIsModalOpen={setIsModalOpen} files={files} />
                      </div>
                      <UploadFileModal
                        isModalOpen={isModalOpen}
                        handleModalClose={handleModalClose}
                        {...uploadModalProps}
                      />
                      {errors && errors.data?.attachment && touched && touched.data?.attachment ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.data.attachment}</div>
                      ) : null}
                    </div>
                  </div>
                  <hr />
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
                    color="primary"
                    className="hover:text-white"
                    type="submit"
                    disabled={(!(isValid && dirty) && !isNewFiles) || isSubmitting}
                  >
                    <div className="flex items-center">
                      {isSubmitting ? (
                        <>
                          {mode === 'Update' ? 'Update' : 'Submit'}{' '}
                          <CSpinner className="ms-2" color="light" size="sm" />
                        </>
                      ) : (
                        <>
                          {mode === 'Update' ? 'Update' : 'Submit'}{' '}
                          <CiPaperplane className="ms-2" />
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
    </div>
  )
}

export default AssetsWorkForm
