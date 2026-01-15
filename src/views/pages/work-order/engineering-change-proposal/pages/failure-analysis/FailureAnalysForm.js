/* eslint-disable */
/* prettier-ignore-start */
import React from 'react'
import {
  CContainer,
  CFormLabel,
  CCol,
  CRow,
  CFooter,
  CButton,
  CSpinner,
  CFormInput,
} from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import { Field, Form, Formik } from 'formik'
import UploadSummaryModal from 'src/views/pages/upload-file/components/UploadSummaryModal'
import Editor from '../../../../../../../src/components/editor/EditorTiptap'
import InputFile from 'src/components/elements/input/InputFile'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'
import useFailureAnalys from './hooks/useFailureAnalys'
import { faTaskSchema } from './schema'

const FailureAnalysForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    hasExistingData,
    isLoading,
    handleSubmit,
    handleRetryUpload,
    handleOK,
    uploadFiles,
    isModalOpen,
    setIsModalOpen,
    isUploadSummaryModalOpen,
    setIsUploadSummaryModalOpen,
    uploadSummary,
    uploadModalProps,
    files,
    handleDownload,
    disableEdit,
  } = useFailureAnalys({
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
        validationSchema={faTaskSchema}
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
          const actualMode = hasExistingData ? 'Update' : mode

          return (
            <Form>
              <DetailCard isLoading={isLoading}>
                {actualMode === 'Update' ? (
                  <div>
                    <h4 className="w-font-semibold">Update Failure Analysis</h4>
                    <p>Update Failure Analysis</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="w-font-semibold">New Failure Analysis</h4>
                    <p>Fill this column to add new Failure Analysis</p>
                  </div>
                )}
                <CContainer fluid>
                  <div>
                    <div className='border rounded border-0 bg-[#E9F1FB] max-w-[65px] text-[#18488B] p-[8px] text-center mb-3'>
                      FMEA
                    </div>
                  </div>
                  <CRow>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Failure Mode Effect Analysis <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="fmea_summary"
                        placeholder="Enter Failure Mode Effect Analysis"
                        value={values?.fmea_summary}
                        invalid={touched.fmea_summary && errors.fmea_summary}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                        disabled={disableEdit}
                      />
                      {errors.fmea_summary && touched.fmea_summary ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.fmea_summary}</div>
                      ) : null}
                    </CCol>
                    <CCol md={3}>
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
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Failure Mode Effect Analysis Description <span className="text-red-main">*</span>
                      </CFormLabel>
                      <div>
                        <Editor
                          name="fmea_desc"
                          value={typeof values.fmea_desc === 'string'
                            ? values.fmea_desc
                            : ''}
                          valueKey="fmea_desc"
                          labelKey="fmea_desc"
                          otherKey={{
                            fmea_desc: 'fmea_desc',
                          }}
                          invalid={touched.fmea_desc && errors.fmea_desc}
                          onChange={(val) => setFieldValue('fmea_desc', val)}
                          onBlur={() => setFieldTouched('fmea_desc', true)}
                          size="md"
                        />
                        {errors.fmea_desc && touched.fmea_desc ? (
                          <div className="text-sm text-[#e55353] mt-1">{errors.fmea_desc}</div>
                        ) : null}
                      </div>
                    </CCol>
                  </CRow>
                  <div>
                    <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke mt-3"></hr>
                    <div className='border rounded border-0 bg-[#E9F1FB] max-w-[65px] text-[#18488B] p-[8px] text-center mb-3 mt-3'>
                      RCFA
                    </div>
                  </div>
                  <CRow>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Root Cause Failure Analysis <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="rcfa_summary"
                        placeholder="Enter Root Cause Failure Analysis"
                        value={values?.rcfa_summary}
                        invalid={touched.rcfa_summary && errors.rcfa_summary}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                        disabled={disableEdit}
                      />
                      {errors.rcfa_summary && touched.rcfa_summary ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.rcfa_summary}</div>
                      ) : null}
                    </CCol>
                    <CCol md={3}>
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
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Root Cause Failure Analysis Description<span className="text-red-main">*</span>
                      </CFormLabel>
                      <div>
                        <Editor
                          name="rcfa_desc"
                          value={typeof values.rcfa_desc === 'string'
                            ? values.rcfa_desc
                            : ''}
                          valueKey="rcfa_desc"
                          labelKey="rcfa_desc"
                          otherKey={{
                            rcfa_desc: 'rcfa_desc',
                          }}
                          invalid={touched.rcfa_desc && errors.rcfa_desc}
                          onChange={(val) => setFieldValue('rcfa_desc', val)}
                          onBlur={() => setFieldTouched('rcfa_desc', true)}
                          size="md"
                        />
                        {errors.rcfa_desc && touched.rcfa_desc ? (
                          <div className="text-sm text-[#e55353] mt-1">{errors.rcfa_desc}</div>
                        ) : null}
                      </div>
                    </CCol>
                  </CRow>
                  <div>
                    <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke mt-3"></hr>
                    <div className='border rounded border-0 bg-[#E9F1FB] max-w-[65px] text-[#18488B] p-[8px] text-center mb-3 mt-3'>
                      CBA
                    </div>
                  </div>
                  <CRow>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Cost Benefit Analysis <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="cba_summary"
                        placeholder="Enter Cost Benefit Analysis"
                        value={values?.cba_summary}
                        invalid={touched.cba_summary && errors.cba_summary}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                        disabled={disableEdit}
                      />
                      {errors.cba_summary && touched.cba_summary ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.cba_summary}</div>
                      ) : null}
                    </CCol>
                    <CCol md={3}>
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
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Cost Benefit Analysis Description <span className="text-red-main">*</span>
                      </CFormLabel>
                      <div>
                        <Editor
                          name="cba_desc"
                          value={typeof values.cba_desc === 'string'
                            ? values.cba_desc
                            : ''}
                          valueKey="cba_desc"
                          labelKey="cba_desc"
                          otherKey={{
                            cba_desc: 'cba_desc',
                          }}
                          invalid={touched.cba_desc && errors.cba_desc}
                          onChange={(val) => setFieldValue('cba_desc', val)}
                          onBlur={() => setFieldTouched('cba_desc', true)}
                          size="md"
                        />
                        {errors.cba_desc && touched.cba_desc ? (
                          <div className="text-sm text-[#e55353] mt-1">{errors.cba_desc}</div>
                        ) : null}
                      </div>
                    </CCol>
                  </CRow>

                  <div>
                    <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke mt-3"></hr>
                    <div className='border rounded border-0 bg-[#E9F1FB] max-w-[65px] text-[#18488B] p-[8px] text-center mb-3 mt-3'>
                      LCCA
                    </div>
                  </div>
                  <CRow>
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Life Cycle Cost Analysis <span className="text-red-main">*</span>
                      </CFormLabel>
                      <Field
                        name="lcca_summary"
                        placeholder="Enter Life Cycle Cost Analysiss"
                        value={values?.lcca_summary}
                        invalid={touched.lcca_summary && errors.lcca_summary}
                        onChange={handleChange}
                        size="md"
                        as={CFormInput}
                        disabled={disableEdit}
                      />
                      {errors.lcca_summary && touched.lcca_summary ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.lcca_summary}</div>
                      ) : null}
                    </CCol>
                    <CCol md={3}>
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
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol>
                      <CFormLabel className="text-primary fw-semibold">
                        Life Cycle Cost Analysis Description <span className="text-red-main">*</span>
                      </CFormLabel>
                      <div>
                        <Editor
                          name="lcca_desc"
                          value={typeof values.lcca_desc === 'string'
                            ? values.lcca_desc
                            : ''}
                          valueKey="lcca_desc"
                          labelKey="lcca_desc"
                          otherKey={{
                            lcca_desc: 'lcca_desc',
                          }}
                          invalid={touched.lcca_desc && errors.lcca_desc}
                          onChange={(val) => setFieldValue('lcca_desc', val)}
                          onBlur={() => setFieldTouched('lcca_desc', true)}
                          size="md"
                        />
                        {errors.lcca_desc && touched.lcca_desc ? (
                          <div className="text-sm text-[#e55353] mt-1">{errors.lcca_desc}</div>
                        ) : null}
                      </div>
                    </CCol>
                  </CRow>
                </CContainer>
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

export default FailureAnalysForm
