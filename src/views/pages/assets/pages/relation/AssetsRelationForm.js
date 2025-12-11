import React, { Fragment } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CFooter,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CSpinner,
} from '@coreui/react'
import { CiPaperplane } from 'react-icons/ci'
import { Form, Field, Formik } from 'formik'
import useAssetsRelationForm from './hooks/useAssetsRelationForm'
import { Select, SelectPagination } from 'src/components/elements/select'
import { relationSchema } from './schema'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'
import InputFile from 'src/components/elements/input/InputFile'
import UploadSummaryModal from 'src/views/pages/upload-file/components/UploadSummaryModal'

const AssetsRelationForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    handleSubmit,
    listRelationType,
    selectedRow,
    getAssetDropdown,
    getLocationDropdown,
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
  } = useAssetsRelationForm(mode, setAction, setTabIndex)
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-b-lg">
      <Formik
        enableReinitialize
        validationSchema={relationSchema}
        initialValues={formValue}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          isValid,
          dirty,
          isSubmitting,
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <CCard className="card-b-left">
                <CCardBody className="p-5">
                  <div className="w-full p-2">
                    <h5 className="font-semibold">
                      {mode === 'Create' ? 'New Relation' : 'Edit Relation'}{' '}
                    </h5>
                    <div>
                      <p className="text-sm">
                        {mode === 'Create'
                          ? 'Fill this column to add new Relation'
                          : 'Fill this column to edit Relation'}
                      </p>
                    </div>
                    <hr />
                    <div className="flex flex-col w-full">
                      <div className="grid grid-cols-4 gap-3">
                        <div className="w-full text-sm">
                          <div className="mb-2">
                            <CFormLabel className="text-primary fw-semibold" htmlFor="assets">
                              Assets <span className="text-red-main">*</span>
                            </CFormLabel>
                            <Field
                              id="related_asset_id"
                              placeholder="Choose values"
                              name={`related_asset_id`}
                              size="sm"
                              value={values.related_asset_id}
                              apiController={getAssetDropdown}
                              valueKey="asset_id"
                              labelKey="asset_num"
                              otherKey={{
                                description: 'asset_description',
                                location_id: 'location_id',
                                location: 'location',
                                location_description: 'location_description',
                              }}
                              parentId={selectedRow?.asset_id}
                              // onChange={(val) => {
                              //   setFieldValue(`related_asset_id`, val)
                              // }}
                              onChange={(val) => {
                                setFieldValue(`related_asset_id`, val)
                                setFieldValue(
                                  `isRelatedAssetFirst`,
                                  val ? !values.relatedLocationKey : false,
                                )
                                if (!values.relatedLocationKey) {
                                  if (val) {
                                    setFieldValue(`related_location_id`, {
                                      value: val?.location_id,
                                      label: val?.location,
                                      location_description: val?.location_description,
                                    })
                                  } else {
                                    setFieldValue(`related_location_id`, null)
                                  }
                                }
                              }}
                              key={`${values?.relatedAssetKey}-${values?.relatedLocationKey}`}
                              query={{
                                qLocation: values.related_location_id?.label || undefined,
                              }}
                              isClearable
                              as={SelectPagination}
                            />
                            {errors.assets && touched.assets ? (
                              <div className="text-sm text-[#b03434] mt-1">{errors.assets}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="w-full text-sm">
                          <div className="mb-2">
                            <CFormLabel className="text-primary fw-semibold" htmlFor="desc">
                              Description
                            </CFormLabel>
                            <Field
                              id="desc"
                              size="sm"
                              className="px-3 py-2"
                              name="desc"
                              value={values.related_asset_id?.description || ''}
                              placeholder="Enter Description"
                              as={CFormTextarea}
                              disabled
                            />
                            {errors.desc && touched.desc ? (
                              <div className="text-sm text-[#b03434] mt-1">{errors.desc}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="w-full text-sm">
                          <div className="mb-2">
                            <CFormLabel className="text-primary fw-semibold" htmlFor="location">
                              Location
                            </CFormLabel>
                            <Field
                              id="related_location_id"
                              placeholder="Choose values"
                              name="related_location_id"
                              size="sm"
                              value={values?.related_location_id}
                              apiController={getLocationDropdown}
                              valueKey="location_id"
                              labelKey="location"
                              otherKey={{
                                location_description: 'location_description',
                              }}
                              onChange={(val) => {
                                setFieldValue(`related_location_id`, val)
                                setFieldValue(`related_asset_id`, null)
                                setFieldValue(`relatedLocationKey`, val ? val.value : null)
                              }}
                              isClearable
                              disabled={values?.isRelatedAssetFirst}
                              as={SelectPagination}
                            />
                            {errors.location && touched.location ? (
                              <div className="text-sm text-[#b03434] mt-1">{errors.location}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="w-full text-sm">
                          <div className="mb-2">
                            <CFormLabel className="text-primary fw-semibold" htmlFor="locDesc">
                              Location Description
                            </CFormLabel>
                            <Field
                              id="locDesc"
                              size="sm"
                              className="px-3 py-2"
                              name="locDesc"
                              value={values?.related_asset_id?.location_description}
                              placeholder="Enter Location Desc"
                              onChange={handleChange}
                              disabled
                              as={CFormTextarea}
                            />
                            {errors.locDesc && touched.locDesc ? (
                              <div className="text-sm text-[#b03434] mt-1">{errors.locDesc}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-3 mt-2">
                        <div className="w-full text-sm">
                          <div className="mb-2">
                            <CFormLabel className="text-primary fw-semibold" htmlFor="relationName">
                              Relation Name <span className="text-red-main">*</span>
                            </CFormLabel>
                            <Field
                              id="desc"
                              size="sm"
                              className="px-3 py-2"
                              name={`relation_name`}
                              value={values.relation_name}
                              placeholder="Enter Relation Name"
                              onChange={handleChange}
                              as={CFormInput}
                            />
                            {errors.relationName && touched.relationName ? (
                              <div className="text-sm text-[#b03434] mt-1">
                                {errors.relationName}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="w-full text-sm">
                          <div className="mb-2">
                            <CFormLabel className="text-primary fw-semibold" htmlFor="relationType">
                              Relation Type <span className="text-red-main">*</span>
                            </CFormLabel>
                            <Field
                              id="relationType"
                              size="sm"
                              name={`relation_type`}
                              options={listRelationType}
                              placeholder="Choose values"
                              onChange={(val) => {
                                setFieldValue(`relation_type`, val)
                              }}
                              as={Select}
                            />
                            {errors.relationType && touched.relationType ? (
                              <div className="text-sm text-[#b03434] mt-1">
                                {errors.relationType}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="w-full text-sm">
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
                          {errors &&
                          errors.data?.attachment &&
                          touched &&
                          touched.data?.attachment ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.data.attachment}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-full text-sm"></div>
                      </div>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
              <CFooter className="form-footer">
                <div className="ml-[80px] w-full my-2 flex valuess-center justify-between">
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
                    {mode === 'Create' && process.env.REACT_APP_HIDE_FEATURE !== 'true' && (
                      <CButton
                        onClick={() => {
                          setTabIndex(6)
                          setAction('Read')
                          setTimeout(() => {
                            setAction('Create')
                          }, 500)
                        }}
                        color="primary"
                        variant="outline"
                        className="mr-2 hover:text-white"
                        type="button"
                      >
                        <div className="flex valuess-center justify-center">Next</div>
                      </CButton>
                    )}
                    <CButton
                      color="primary"
                      className="hover:text-white"
                      type="submit"
                      disabled={isSubmitting || (!(dirty && isValid) && !isNewFiles)}
                    >
                      <div className="flex valuess-center justify-center">
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

export default AssetsRelationForm
